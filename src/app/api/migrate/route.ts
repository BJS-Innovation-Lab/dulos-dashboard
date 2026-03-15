import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (body.secret !== process.env.MIGRATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    // Use supabase.from to test connection
    const { error: testError } = await supabase.from('dulos_events').select('id').limit(1)
    
    // If table doesn't exist, error code will be 42P01
    if (!testError || testError.code === '42P01') {
      // Tables need to be created - use raw fetch to Supabase SQL endpoint
      const sqlStatements = [
        `CREATE TABLE IF NOT EXISTS dulos_events (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          venue TEXT, city TEXT, address TEXT, dates TEXT,
          start_date DATE, end_date DATE,
          image_url TEXT, buy_url TEXT, dashboard_url TEXT,
          status TEXT DEFAULT 'active',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )`,
        `CREATE TABLE IF NOT EXISTS dulos_ticket_zones (
          id SERIAL PRIMARY KEY,
          event_id TEXT REFERENCES dulos_events(id) ON DELETE CASCADE,
          zone_name TEXT NOT NULL, price INTEGER NOT NULL,
          original_price INTEGER, available INTEGER DEFAULT 0,
          sold INTEGER DEFAULT 0, color TEXT,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )`,
        `CREATE TABLE IF NOT EXISTS dulos_ticket_recovery (
          id SERIAL PRIMARY KEY, client_id TEXT, phone TEXT,
          email TEXT, event_mentioned TEXT,
          status TEXT DEFAULT 'pending', verified BOOLEAN DEFAULT FALSE,
          notes TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
        )`,
        `CREATE TABLE IF NOT EXISTS dulos_escalations (
          id SERIAL PRIMARY KEY, client_id TEXT, reason TEXT,
          event_mentioned TEXT, situation TEXT, action_required TEXT,
          resolved BOOLEAN DEFAULT FALSE, resolved_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )`,
      ]

      const results = []
      for (const sql of sqlStatements) {
        // Execute via Supabase REST SQL endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sql })
        })
        const data = await res.json()
        const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] || 'unknown'
        results.push({ table: tableName, status: res.status, response: data })
      }

      return NextResponse.json({ ok: true, tableStatus: testError?.code, results })
    }

    return NextResponse.json({ ok: true, message: 'Tables already exist', testError })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
