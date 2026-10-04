import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. Bloquear /admin y subrutas con 404 ────────────────────────────────
  if (pathname.startsWith('/admin')) {
    return new NextResponse('404 Not Found', { status: 404 })
  }

  // ── 2. Rutas /control-sicovel — gestión de sesión ────────────────────────
  if (pathname.startsWith('/control-sicovel')) {
    // Preparar response base para propagar cookies actualizadas (refresh de token)
    const response = NextResponse.next({ request: { headers: request.headers } })

    // Crear cliente Supabase apto para middleware (lee/escribe cookies)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Obtener sesión actual (refresca token si es necesario)
    const { data: { user } } = await supabase.auth.getUser()

    const isLoginPage = pathname === '/control-sicovel/login'

    // ── 2a. /control-sicovel/login con sesión válida → redirigir a /inicio ─
    if (isLoginPage && user) {
      const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? '')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean)

      if (allowedEmails.includes(user.email?.toLowerCase() ?? '')) {
        return NextResponse.redirect(new URL('/control-sicovel/inicio', request.url))
      }
      // Sesión existe pero email no autorizado → dejar pasar a login (no loop)
      return response
    }

    // ── 2b. Rutas protegidas sin sesión → redirigir a login ─────────────────
    if (!isLoginPage && !user) {
      return NextResponse.redirect(new URL('/control-sicovel/login', request.url))
    }

    // ── 2c. Rutas protegidas con sesión → validar email autorizado ───────────
    if (!isLoginPage && user) {
      const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? '')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean)

      if (!allowedEmails.includes(user.email?.toLowerCase() ?? '')) {
        // Email no autorizado: cerrar sesión y redirigir con error
        await supabase.auth.signOut()
        return NextResponse.redirect(
          new URL('/control-sicovel/login?error=unauthorized', request.url)
        )
      }
    }

    return response
  }

  // ── 3. Todo lo demás: pasar sin modificar ────────────────────────────────
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/control-sicovel/:path*',
    '/control-sicovel',
  ],
}
