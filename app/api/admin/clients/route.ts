import { NextResponse } from 'next/server';
import { getClients, addClient } from '@/lib/data';

export async function GET() {
  try {
    const clients = await getClients();
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Müşteriler alınamadı:', error);
    return NextResponse.json(
      { error: 'Müşteriler alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await request.json();
    const newClient = await addClient(client);
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('Müşteri eklenemedi:', error);
    return NextResponse.json(
      { error: 'Müşteri eklenemedi' },
      { status: 500 }
    );
  }
}
