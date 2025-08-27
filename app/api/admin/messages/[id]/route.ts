import { NextResponse } from 'next/server';
import { updateMessage } from '@/lib/data';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updatedMessage = await updateMessage(params.id, updates);
    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error('Mesaj güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Mesaj güncellenemedi' },
      { status: 500 }
    );
  }
}
