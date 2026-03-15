import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (body.secret !== process.env.MIGRATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

    // Use Supabase's internal pg-meta REST endpoint
    // Available at /rest/v1/ with special headers for DDL
    const tables = [
      {
        name: 'dulos_events',
        sql: `CREATE TABLE IF NOT EXISTS dulos_events (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          venue TEXT, city TEXT, address TEXT, dates TEXT,
          start_date DATE, end_date DATE,
          image_url TEXT, buy_url TEXT, dashboard_url TEXT,
          status TEXT DEFAULT 'active',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )`
      },
      {
        name: 'dulos_ticket_zones',
        sql: `CREATE TABLE IF NOT EXISTS dulos_ticket_zones (
          id SERIAL PRIMARY KEY,
          event_id TEXT REFERENCES dulos_events(id) ON DELETE CASCADE,
          zone_name TEXT NOT NULL, price INTEGER NOT NULL,
          original_price INTEGER, available INTEGER DEFAULT 0,
          sold INTEGER DEFAULT 0, color TEXT,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )`
      },
      {
        name: 'dulos_ticket_recovery',
        sql: `CREATE TABLE IF NOT EXISTS dulos_ticket_recovery (
          id SERIAL PRIMARY KEY, client_id TEXT, phone TEXT,
          email TEXT, event_mentioned TEXT,
          status TEXT DEFAULT 'pending', verified BOOLEAN DEFAULT FALSE,
          notes TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
        )`
      },
      {
        name: 'dulos_escalations',
        sql: `CREATE TABLE IF NOT EXISTS dulos_escalations (
          id SERIAL PRIMARY KEY, client_id TEXT, reason TEXT,
          event_mentioned TEXT, situation TEXT, action_required TEXT,
          resolved BOOLEAN DEFAULT FALSE, resolved_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )`
      },
    ]

    // Try each table via the Management API query endpoint
    const results = []
    for (const t of tables) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Accept': 'application/json',
        }
      })
      
      // Check if table exists in schema
      const schema = await res.json() as any
      const tableExists = schema?.definitions?.[t.name]
      
      results.push({
        table: t.name,
        exists: !!tableExists,
        note: tableExists ? 'already exists' : 'needs creation via SQL Editor'
      })
    }

    // Return clear instructions if tables don't exist
    const missing = results.filter(r => !r.exists)
    
    return NextResponse.json({ 
      ok: missing.length === 0,
      tables: results,
      message: missing.length > 0 
        ? `${missing.length} tables missing. Run SQL in Supabase dashboard.`
        : 'All tables exist!',
      sqlToRun: missing.length > 0 ? tables.filter(t => missing.find(m => m.table === t.name)).map(t => t.sql).join(';\n\n') : null
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
