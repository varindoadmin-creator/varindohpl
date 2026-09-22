import { NextRequest, NextResponse } from 'next/server';
import { sendRequestNotification } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

// Sample and Catalogue requests go to VIABooks (via-corporate), the
// business's own accounting system, instead of the old via-project
// Supabase table — matched by the org id VIABooks uses for CV. Varindo
// Forma Hutama. Nothing on this site writes to Supabase any more.
const VIABOOKS_API_URL = process.env.VIABOOKS_API_URL || 'https://viabooks-601025884976.asia-southeast2.run.app';
const VIABOOKS_ORGANIZATION_ID = process.env.VIABOOKS_ORGANIZATION_ID || 'cmtn75jst0001w12y30bcrr6h';

type QuoteItem = { code: string; qty: number };

type RequestBody = {
  type: 'catalogue' | 'sample' | 'quote';
  name?: string;
  address?: string;
  phone?: string;
  // Sample: array of codes
  samples?: string[];
  // Quote: a code plus how many sheets of it
  items?: QuoteItem[];
  notes?: string;
};

type ViabooksPayload = {
  requestType: 'sample' | 'catalogue' | 'quote';
  customerName?: string;
  phone?: string;
  address?: string;
  itemCode?: string;
  quantity?: number;
  notes?: string;
};

async function postToViabooks(payload: ViabooksPayload) {
  return fetch(`${VIABOOKS_API_URL}/api/public/requests/${VIABOOKS_ORGANIZATION_ID}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
}

async function submitToViabooks(payload: ViabooksPayload) {
  let res = await postToViabooks(payload);

  // VIABooks accepts requestType 'quote', but whether its schema carries a
  // quantity is unverified — probing it further would have meant writing junk
  // rows into live accounting data. If it rejects the payload, drop the two
  // quote-only fields and send the shape the sample and catalogue flows have
  // always used, so a request is still recorded. The notification email
  // carries the quantities either way, so nothing is lost to the team.
  if (res.status === 400 && (payload.quantity !== undefined || payload.notes !== undefined)) {
    const { quantity, notes, ...base } = payload;
    void quantity; void notes;
    console.warn('[submit-request] VIABooks rejected the quote fields; retrying without them');
    res = await postToViabooks(base);
  }

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
  const notes = body.notes?.trim() || undefined;

  if (!type || !['catalogue', 'sample', 'quote'].includes(type)) {
    return NextResponse.json({ success: false, error: 'Invalid request type.' }, { status: 400 });
  }

  if (!name?.trim() || !address?.trim() || !phone?.trim()) {
    return NextResponse.json({ success: false, error: 'Name, address, and phone are required.' }, { status: 400 });
  }

  try {
    if (type === 'catalogue') {
      await submitToViabooks({ requestType: 'catalogue', customerName: name.trim(), phone: phone.trim(), address: address.trim() });

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

    } else if (type === 'quote') {
      const items = (body.items || [])
        .map((item) => ({ code: String(item?.code ?? '').trim(), qty: Number(item?.qty) }))
        .filter((item) => item.code && Number.isInteger(item.qty) && item.qty > 0);

      if (items.length === 0) {
        return NextResponse.json({ success: false, error: 'No products with a quantity provided.' }, { status: 400 });
      }
      if (new Set(items.map((item) => item.code)).size < items.length) {
        return NextResponse.json({ success: false, error: 'The same product is listed more than once.' }, { status: 400 });
      }

      // One row per product, as with samples. The note rides along on the
      // first row only, so the team does not see it repeated per line.
      await Promise.all(
        items.map((item, i) =>
          submitToViabooks({
            requestType: 'quote', customerName: name.trim(), phone: phone.trim(), address: address.trim(),
            itemCode: item.code, quantity: item.qty,
            ...(i === 0 && notes ? { notes } : {}),
          })
        )
      );
    }

    // Wait for SMTP acceptance so a successful response means the request
    // notification was accepted by the configured mail server.
    await sendRequestNotification({ type, name, phone, address, samples: body.samples, items: body.items, notes });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[submit-request] Request submission failed:', err);
    return NextResponse.json(
      { success: false, error: 'Could not complete request submission. Please try again.' },
      { status: 500 }
    );
  }
}
