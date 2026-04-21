import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get('offset') || '0';

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  if (!TOKEN) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const res = await fetch(
    `https://api.telegram.org/bot${TOKEN}/getUpdates?offset=${offset}`
  );

  const data = await res.json();

  return NextResponse.json(data);
}