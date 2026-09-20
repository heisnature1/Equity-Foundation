import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Confirms whether the signed-in user can read protected admin data.
 *
 * Admin read access is enforced by RLS through public.is_admin(). When a user
 * is not registered, every admin query returns an empty result set with HTTP
 * 200 — indistinguishable from "no data" — which makes a membership problem
 * look like an empty inbox. This helper tries to tell the two apart so the
 * dashboard can explain what is happening instead of showing nothing.
 *
 * The caller passes the user it has already fetched. Every `auth.getUser()`
 * call is a round-trip to the Supabase auth server, and fetching it a second
 * time here tripled the auth traffic for a single page load — enough to trip
 * Supabase's auth rate limit and leave an admin stuck on a blank dashboard.
 */
export async function getAdminAccess(user: User | null) {
  if (!user) return { user: null, isRegisteredAdmin: false, checked: false };

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  // A read error (e.g. the table is not reachable) means we cannot confirm
  // membership; treat that as "not confirmed" so we do not claim success.
  return {
    user,
    isRegisteredAdmin: Boolean(data) && !error,
    checked: !error,
  };
}
