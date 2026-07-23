import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isValidDemoEmail } from '@/lib/demo-accounts'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_anon_key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Validate demo cookie value (not just existence) against allowed demo emails
  const demoCookieValue = request.cookies.get("demo_access")?.value;
  const hasValidDemoCookie =
    String(process.env.NODE_ENV) !== 'production' && isValidDemoEmail(demoCookieValue);

  let role = user?.user_metadata?.role || 'doctor';
  if (hasValidDemoCookie) {
    role = demoCookieValue === "admin@demodental.com" ? "admin" : "doctor";
  }

  // Protect /dashboard routes
  if (
    !user && 
    !hasValidDemoCookie &&
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // RBAC: Block non-admins from /dashboard/admin
  if (request.nextUrl.pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/doctor'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from /login
  if (
    (user || hasValidDemoCookie) &&
    request.nextUrl.pathname.startsWith('/login')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = role === 'admin' ? '/dashboard/admin' : '/dashboard/doctor'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

