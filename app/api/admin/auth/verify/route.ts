import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const adminToken = request.cookies.get('adminToken')?.value;

    if (!adminToken) {
      return NextResponse.json(
        { valid: false, error: 'Token bulunamadı' },
        { status: 401 }
      );
    }

    try {
      // Token'ı doğrula
      const decoded = verifyToken(adminToken);
      
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
