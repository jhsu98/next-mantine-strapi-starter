import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticatedServer } from 'utils/strapi';

export async function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Check if the user is authenticated server-side using the token
    const isAuthenticated = await isAuthenticatedServer(token);

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Allow the request to continue if the user is authenticated
    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Apply the middleware to all routes within the (protected) group
export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
