import { NextResponse } from 'next/server';
import { replyToMessage } from '@/lib/data';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { reply } = await request.json();
    const result = await replyToMessage(params.id, reply);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Yanıt gönderilemedi:', error);
    return NextResponse.json(
      { error: 'Yanıt gönderilemedi' },
      { status: 500 }
    );
  }
}
