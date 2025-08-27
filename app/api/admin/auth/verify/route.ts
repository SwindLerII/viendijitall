import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'Token gerekli' },
        { status: 400 }
      );
    }

    try {
      // Token'ı doğrula
      const decoded = verifyToken(token);
      
      return NextResponse.json({
        valid: true,
        user: {
          username: decoded.username,
          email: decoded.email,
          role: decoded.role
        }
      });
    } catch (error) {
      return NextResponse.json(
        { valid: false, error: 'Geçersiz token' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return NextResponse.json(
      { valid: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
