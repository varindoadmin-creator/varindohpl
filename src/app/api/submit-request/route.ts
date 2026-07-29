import { NextRequest, NextResponse } from 'next/server';
import { sendRequestNotification } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

const SUPABASE_URL      = process.env.SUPABASE_URL;
const SUPABASE_KEY      = process.env.SUPABASE_SERVICE_ROLE_KEY;

type RequestBody = {
  type: 'catalogue' | 'price-list' | 'quote' | 'sample';
  name?: string;
  address?: string;
  phone?: string;
  // Quote: array of { code, qty }
  items?: { code: string; qty: string }[];
  // Sample: array of codes
  samples?: string[];
};

async function insertRows(rows: Record<string, unknown>[]) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/requests`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_KEY!,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error ${res.status}: ${err}`);
  }
}

export async function POST(req: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('[submit-request] Supabase env vars not set');
    return NextResponse.json(
      { success: false, error: 'Submission service is not configured.' },
      { status: 503 }
    );
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { type, name, address, phone } = body;

  if (!type || !['catalogue', 'price-list', 'quote', 'sample'].includes(type)) {
    return NextResponse.json({ success: false, error: 'Invalid request type.' }, { status: 400 });
  }

  if (!name?.trim() || !address?.trim() || !phone?.trim()) {
    return NextResponse.json({ success: false, error: 'Name, address, and phone are required.' }, { status: 400 });
  }

  try {
    let rows: Record<string, unknown>[];

    if (type === 'catalogue' || type === 'price-list') {
      rows = [{
        request_type:  'catalogue',
        status:        'new',
        customer_name: name.trim(),
        address:       address.trim(),
        phone:         phone.trim(),
        source:        type === 'price-list' ? 'website-price-list' : 'website',
        raw_data:      { type, name, address, phone },
      }];

    } else if (type === 'quote') {
      const items = body.items || [];
      if (items.length === 0) {
        return NextResponse.json({ success: false, error: 'No items provided.' }, { status: 400 });
      }

      const invalidItem = items.some((item) => {
        const quantity = Number(item.qty);
        return !item.code?.trim() || !Number.isFinite(quantity) || quantity <= 0;
      });
      if (invalidItem) {
        return NextResponse.json({ success: false, error: 'Each item requires a code and a positive quantity.' }, { status: 400 });
      }

      rows = items.map((item) => ({
          request_type:  'quote',
          status:        'new',
          customer_name: name.trim(),
          address:       address.trim(),
          phone:         phone.trim(),
          item_code:     item.code.trim(),
          quantity:      Number(item.qty),
          unit:          'lembar',
          source:        'website',
          raw_data:      { name, address, phone, item },
      }));

    } else if (type === 'sample') {
      const samples = (body.samples || []).map((code) => code.trim()).filter(Boolean);
      if (samples.length === 0) {
        return NextResponse.json({ success: false, error: 'No samples provided.' }, { status: 400 });
      }

      rows = samples.map((code) => ({
          request_type:  'sample',
          status:        'new',
          customer_name: name.trim(),
          address:       address.trim(),
          phone:         phone.trim(),
          item_code:     code,
          unit:          'pcs',
          source:        'website',
          raw_data:      { name, address, phone, code },
      }));
    } else {
      return NextResponse.json({ success: false, error: 'Invalid request type.' }, { status: 400 });
    }

    // PostgREST handles a JSON array as one transaction, preventing partial
    // quote/sample requests if one row fails.
    await insertRows(rows);

    // Send email notification (non-blocking — don't fail the response if email errors)
    sendRequestNotification({ type, name, phone, address, items: body.items, samples: body.samples })
      .catch((e) => console.error('[submit-request] Email notification failed:', e));

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[submit-request] Supabase insert failed:', err);
    return NextResponse.json(
      { success: false, error: 'Could not save request. Please try again.' },
      { status: 500 }
    );
  }
}
