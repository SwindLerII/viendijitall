import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin route'larını koru
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('adminToken')?.value;
    
    // Login sayfasına erişim kontrolü
    if (request.nextUrl.pathname === '/admin/login') {
      if (adminToken) {
        // Token varsa dashboard'a yönlendir (client-side'da doğrulanacak)
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }
    
    // Diğer admin sayfaları için token kontrolü
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Token varsa devam et (client-side'da doğrulanacak)
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
