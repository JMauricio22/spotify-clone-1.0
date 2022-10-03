import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const privateRoutes = ['/', '/playlist', '/artist', '/search', '/album'];

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('', process.env.APP_URL));
  }
  if (
    privateRoutes.findIndex(
      (privateRoute) => pathname === '/' || (privateRoute !== '/' && pathname.startsWith(privateRoute))
    ) !== -1 &&
    !token
  ) {
    return NextResponse.redirect(new URL('/login', process.env.APP_URL));
  }
}

export const config = {
  matcher: ['/login', '/', '/playlist', '/artist', '/search', '/album'],
};
