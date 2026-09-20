import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Handles the redirect back from Supabase after email confirmation, magic-link,
 * or password-reset sign-in. Supabase appends a `code` that must be exchanged
 * for a session; without this route those links land on a dead page.
 *
 * Add this URL to Supabase → Authentication → URL Configuration → Redirect URLs:
 *   http://localhost:3000/auth/callback
 *   https://<your-domain>/auth/callback
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";
  const errorDescription = searchParams.get("error_description");

  if (errorDescription) {
    const url = new URL("/admin/login", origin);
    url.searchParams.set("error", errorDescription);
    return NextResponse.redirect(url);
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
    const url = new URL("/admin/login", origin);
    url.searchParams.set("error", error.message);
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(new URL("/admin/login", origin));
}
