// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/profile','/league','/team','/homepage','/vip'] // možeš dodati više ruta ovdje

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const cookie = request.cookies.get('access_token')
    console.log("NULLLL JE")
    console.log(cookie)
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile','/league','/team','/homepage','/vip'], // Možeš staviti i '/(.*)' za sve rute
}