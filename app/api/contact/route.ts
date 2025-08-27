import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, category = 'general' } = body;

    // Basit validasyon
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      );
    }

    // Mesajı kaydet
    const newMessage = await addMessage({
      clientId: `contact-${Date.now()}`, // Geçici ID
      clientName: name,
      clientEmail: email,
      subject,
      message,
      category,
      priority: category === 'complaint' ? 'high' : 
                category === 'quote' ? 'medium' : 'low'
    });

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      id: newMessage.id
    });

  } catch (error) {
    console.error('Contact form hatası:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi. Lütfen tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}
