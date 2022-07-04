import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const privateRoutes = ['/', '/playlist'];

export async function middleware(req) {
  const token = await getToken({
    req,
  });
  const { pathname } = req.nextUrl;

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL(process.env.URL));
  }

  if (
    privateRoutes.findIndex(
      (privateRoute) => pathname === '/' || (privateRoute !== '/' && pathname.startsWith(privateRoute))
    ) !== -1 &&
    !token
  ) {
    return NextResponse.redirect(new URL('/login', process.env.URL));
  }
}

export const config = {
  matcher: ['/login', ...privateRoutes],
};
