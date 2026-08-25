import { NextResponse } from 'next/server';
import { search } from '@/lib/content';

export const dynamic = 'force-static';

export function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q') ?? '';
  return NextResponse.json({ hits: search(q, 8) });
}
