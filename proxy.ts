import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on every request and guards the admin
 * workspace. Without this, access tokens silently expire and a signed-in admin
 * gets bounced to the login page — the classic cause of "I'm logged in but the
 * dashboard won't load".
 *
 * NOTE: In this Next.js version the file convention is `proxy.ts` (the old
 * `middleware.ts` was renamed). The function is exported as `proxy`.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // If Supabase is not configured, let the app handle it (it shows a clear
  // "not configured" screen rather than crashing here).
  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: keep this call — it refreshes the session and writes fresh
  // cookies to `response`. Use getUser(), never getSession(), for trust.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect the admin workspace (but never the sign-in screen itself).
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  // A signed-in user should never see the login screen again.
  if (pathname === "/admin/login" && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const config = {
  // Scope the proxy to the admin workspace only.
  //
  // It previously ran on every route, so every public page view made a
  // round-trip to the Supabase auth server to refresh a session those pages
  // never use — they read with the anonymous client. On a small Supabase plan
  // that traffic exhausts the auth rate limit and a real admin then cannot
  // sign in ("Request rate limit reached"). Only /admin needs a session, so
  // only /admin is matched; an admin still gets a refreshed session the moment
  // they return to the workspace.
  matcher: ["/admin/:path*"],
};
