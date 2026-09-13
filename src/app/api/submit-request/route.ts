import { NextRequest, NextResponse } from 'next/server';
import { sendRequestNotification } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

const SUPABASE_URL      = process.env.SUPABASE_URL;
const SUPABASE_KEY      = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Sample and Catalogue requests now go to VIABooks (via-corporate), the
// business's own accounting system, instead of the old via-project
// Supabase table — matched by the org id VIABooks uses for CV. Varindo
// Forma Hutama. Price List download requests are unaffected and still go
// to Supabase.
const VIABOOKS_API_URL = process.env.VIABOOKS_API_URL || 'https://viabooks-601025884976.asia-southeast2.run.app';
const VIABOOKS_ORGANIZATION_ID = process.env.VIABOOKS_ORGANIZATION_ID || 'cmtn75jst0001w12y30bcrr6h';

type RequestBody = {
  type: 'catalogue' | 'price-list' | 'sample';
  name?: string;
  address?: string;
  phone?: string;
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

async function submitToViabooks(payload: {
  requestType: 'sample' | 'catalogue';
  customerName?: string;
  phone?: string;
  address?: string;
  itemCode?: string;
}) {
  const res = await fetch(`${VIABOOKS_API_URL}/api/public/requests/${VIABOOKS_ORGANIZATION_ID}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`VIABooks error ${res.status}: ${err}`);
  }
}

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { type, name, address, phone } = body;

  if (!type || !['catalogue', 'price-list', 'sample'].includes(type)) {
    return NextResponse.json({ success: false, error: 'Invalid request type.' }, { status: 400 });
  }

  if (!name?.trim() || !address?.trim() || !phone?.trim()) {
    return NextResponse.json({ success: false, error: 'Name, address, and phone are required.' }, { status: 400 });
  }

  if (type === 'price-list' && (!SUPABASE_URL || !SUPABASE_KEY)) {
    console.error('[submit-request] Supabase env vars not set');
    return NextResponse.json(
      { success: false, error: 'Submission service is not configured.' },
      { status: 503 }
    );
  }

  try {
    if (type === 'catalogue') {
      await submitToViabooks({ requestType: 'catalogue', customerName: name.trim(), phone: phone.trim(), address: address.trim() });

    } else if (type === 'price-list') {
      // Unaffected by the VIABooks move — still a Supabase "catalogue" row,
      // just tagged with a different source so it can be told apart.
      await insertRows([{
        request_type:  'catalogue',
        status:        'new',
        customer_name: name.trim(),
        address:       address.trim(),
        phone:         phone.trim(),
        source:        'website-price-list',
        raw_data:      { type, name, address, phone },
      }]);

    } else if (type === 'sample') {
      const samples = (body.samples || []).map((code) => code.trim()).filter(Boolean);
      if (samples.length === 0) {
        return NextResponse.json({ success: false, error: 'No samples provided.' }, { status: 400 });
      }

      // One request per sample code, matching VIABooks' one-row-per-request
      // contract — run together so one failure doesn't silently drop the rest.
      await Promise.all(
        samples.map((code) =>
          submitToViabooks({ requestType: 'sample', customerName: name.trim(), phone: phone.trim(), address: address.trim(), itemCode: code })
        )
      );
    }

    // Wait for SMTP acceptance so a successful response means the request
    // notification was accepted by the configured mail server.
    await sendRequestNotification({ type, name, phone, address, samples: body.samples });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[submit-request] Request submission failed:', err);
    return NextResponse.json(
      { success: false, error: 'Could not complete request submission. Please try again.' },
      { status: 500 }
    );
  }
}
