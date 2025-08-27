import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/data';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Ayarlar alınamadı:', error);
    return NextResponse.json(
      { error: 'Ayarlar alınamadı' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedSettings = await updateSettings(body);
    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Ayarlar güncellenemedi:', error);
    return NextResponse.json(
      { error: 'Ayarlar güncellenemedi' },
      { status: 500 }
    );
  }
}
