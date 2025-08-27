import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/data';

export async function GET() {
  try {
    const messages = await getMessages();
    
    const response = NextResponse.json(messages);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Mesajlar alınamadı:', error);
    return NextResponse.json(
      { error: 'Mesajlar alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const message = await request.json();
    const newMessage = await addMessage(message);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Mesaj eklenemedi:', error);
    return NextResponse.json(
      { error: 'Mesaj eklenemedi' },
      { status: 500 }
    );
  }
}
