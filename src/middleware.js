import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const path = request.nextUrl.pathname 

    const PublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token') ;

    if (PublicPath && token) {
        return NextResponse.redirect(new URL ('/' , request.nextUrl));
    } else if (!PublicPath &&!token) {
        return NextResponse.redirect(new URL ('/login' , request.nextUrl)) ;
    }
}
 
 export const config = {
  matcher: [
    '/',
    '/home',
    '/signup',
    '/login',
    '/profile',
  ]
}