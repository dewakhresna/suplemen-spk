import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const token = request.cookies.get('token')?.value;

  const isLoginPage = pathname.startsWith('/auth/login');
  const isAdminPage = pathname.startsWith('/admin');
  const isUserPage = pathname.startsWith('/profile'); 

  if (!token) {
    if (isAdminPage || isUserPage) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString('ascii');
    const decoded = JSON.parse(decodedJson);

    if (isLoginPage) {
      if (decoded.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/suplemen', request.url));
      }
      return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (isAdminPage && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

  } catch (error) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/auth/login', 
    '/admin/:path*', 
    '/profile/:path*'
  ],
};