import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const ipHits = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.reset) {
    ipHits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    if (ipHits.size > 1000) {
      for (const [key, val] of ipHits) {
        if (now > val.reset) ipHits.delete(key);
      }
    }
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function stripCRLF(s: string): string {
  return s.replace(/[\r\n]+/g, ' ').slice(0, 200);
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Try again in a minute.' },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Partial<{
      name: string;
      email: string;
      phone: string;
      message: string;
      website: string; // honeypot
    }>;

    // honeypot — if filled, silently 200 (don't reveal it's spam)
    if (body.website && body.website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const message = (body.message || '').trim();

    if (!name || name.length > 200) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (!email || !isEmail(email) || email.length > 200) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (phone && phone.length > 50) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
    }
    if (!message || message.length < 5 || message.length > 5000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/maqvbrpr';

    try {
      const formspreeRes = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || '',
          message,
          _replyto: email,
        }),
      });

      if (!formspreeRes.ok) {
        console.error('[contact] Formspree error:', formspreeRes.status, await formspreeRes.text());
        return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
      }
    } catch (err) {
      console.error('[contact] Formspree fetch error:', err);
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
