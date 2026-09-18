import { createSupabasePublicServerClient } from "@/lib/supabase-public-server";

export type HomeContent = {
  heroTitle?: string;
  heroDescription?: string;
  heroEyebrow?: string;
  missionTitle?: string;
  missionDescription?: string;
};

export async function getPublishedPageContent<T>(slug: string) {
  const supabase = createSupabasePublicServerClient();
  if (!supabase) return {} as T;

  const { data } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  return (data?.content ?? {}) as T;
}

export async function getPublicSiteSettings() {
  const supabase = createSupabasePublicServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", true)
    .maybeSingle();
  return data;
}

export async function getPublishedCollection<T>(
  table: string,
  columns: string,
  orderColumn = "published_at",
) {
  const supabase = createSupabasePublicServerClient();
  if (!supabase) return [] as T[];

  const { data } = await supabase
    .from(table)
    .select(columns)
    .eq("status", "published")
    .order(orderColumn, { ascending: false, nullsFirst: false });
  return (data ?? []) as T[];
}
