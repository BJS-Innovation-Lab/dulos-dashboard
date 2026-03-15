import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' as any });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventName, zoneName, quantity, unitPrice, total, tickets } = body;

    // tickets = [{ phone, name, lastName, email }, ...]
    if (!eventName || !zoneName || !quantity || !total || !tickets?.length) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const leader = tickets[0];

    // 1. Upsert customer (leader)
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id, total_purchases, total_spent')
      .eq('phone', leader.phone)
      .single();

    let customerId: string;
    if (existingCustomer) {
      customerId = existingCustomer.id;
      await supabase.from('customers').update({
        name: leader.name,
        last_name: leader.lastName,
        email: leader.email,
        last_purchase_at: new Date().toISOString(),
        total_purchases: (existingCustomer.total_purchases || 0) + 1,
        total_spent: (existingCustomer.total_spent || 0) + total,
        updated_at: new Date().toISOString(),
      }).eq('id', customerId);
    } else {
      const { data: newCustomer } = await supabase.from('customers').insert({
        phone: leader.phone,
        name: leader.name,
        last_name: leader.lastName,
        email: leader.email,
        first_purchase_at: new Date().toISOString(),
        last_purchase_at: new Date().toISOString(),
        total_purchases: 1,
        total_spent: total,
      }).select('id').single();
      customerId = newCustomer!.id;
    }

    // 2. Find event_id
    const { data: eventRow } = await supabase
      .from('events')
      .select('id')
      .eq('name', eventName)
      .single();

    // 3. Create order
    const { data: order } = await supabase.from('orders').insert({
      event_id: eventRow?.id || null,
      event_name: eventName,
      zone_name: zoneName,
      quantity,
      total,
      status: 'pending',
      customer_id: customerId,
    }).select('id').single();

    const orderId = order!.id;

    // 4. Create guests + tickets
    for (const ticket of tickets) {
      // Upsert guest
      const { data: existingGuest } = await supabase
        .from('guests')
        .select('id')
        .eq('phone', ticket.phone)
        .eq('email', ticket.email)
        .single();

      let guestId: string;
      if (existingGuest) {
        guestId = existingGuest.id;
      } else {
        const { data: newGuest } = await supabase.from('guests').insert({
          phone: ticket.phone,
          name: ticket.name,
          last_name: ticket.lastName,
          email: ticket.email,
          customer_id: customerId,
        }).select('id').single();
        guestId = newGuest!.id;
      }

      await supabase.from('order_tickets').insert({
        order_id: orderId,
        phone: ticket.phone,
        name: ticket.name,
        last_name: ticket.lastName,
        email: ticket.email,
        guest_id: guestId,
      });
    }

    // 5. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // centavos
      currency: 'mxn',
      metadata: {
        order_id: orderId,
        event_name: eventName,
        zone: zoneName,
        quantity: String(quantity),
        customer_phone: leader.phone,
      },
    });

    // 6. Update order with stripe ID
    await supabase.from('orders').update({
      stripe_payment_id: paymentIntent.id,
    }).eq('id', orderId);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (err: any) {
    console.error('Payment error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
