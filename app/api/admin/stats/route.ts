import { NextResponse } from 'next/server';
import { getStats } from '@/lib/data';

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('İstatistikler alınamadı:', error);
    return NextResponse.json(
      { error: 'İstatistikler alınamadı' },
      { status: 500 }
    );
  }
}
