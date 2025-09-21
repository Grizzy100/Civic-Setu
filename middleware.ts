import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/admin/sign-in(.*)',
  '/district-head/sign-in(.*)',
  '/district-head/sign-up(.*)',
  '/api/webhooks(.*)',
])

// Define role-specific routes
const isAdminRoute = createRouteMatcher([
  '/admin/dashboard(.*)',
  '/admin/users(.*)',
])

const isDistrictHeadRoute = createRouteMatcher([
  '/district-head/dashboard(.*)',
  '/district-head/reports(.*)',
])

const isUserRoute = createRouteMatcher([
  '/user/dashboard(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Protect all other routes
  if (!userId) {
    await auth.protect()
  }

  // Get user role from session claims (set via Clerk dashboard or API)
  const userRole = sessionClaims?.metadata?.role as string || 'user'

  // Role-based route protection
  if (isAdminRoute(req) && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  if (isDistrictHeadRoute(req) && userRole !== 'district_head') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  if (isUserRoute(req) && userRole !== 'user') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}