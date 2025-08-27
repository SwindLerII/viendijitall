import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    console.log('🔐 Login isteği:', { username, password: password ? '***' : 'boş' });

    // Giriş verilerini doğrula
    if (!username || !password) {
      console.log('❌ Eksik bilgiler');
      return NextResponse.json(
        { error: 'Kullanıcı adı ve şifre gerekli' },
        { status: 400 }
      );
    }

    // Kimlik doğrulama
    console.log('🔍 Kimlik doğrulama başlatılıyor...');
    const result = await authenticateAdmin(username, password);
    console.log('📡 Kimlik doğrulama sonucu:', { success: result.success, error: result.error });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    // Başarılı giriş - JWT token ile cookie oluştur
    console.log('✅ Login başarılı, cookie oluşturuluyor...');
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Giriş başarılı',
        user: {
          username,
          role: 'admin'
        }
      },
      { status: 200 }
    );

    // Güvenli HTTP-only cookie oluştur
    response.cookies.set('adminToken', result.token!, {
      httpOnly: true, // Güvenlik için HTTP-only
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 saat
      path: '/'
    });

    console.log('🍪 Cookie oluşturuldu');
    return response;

  } catch (error) {
    console.error('❌ Login hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
