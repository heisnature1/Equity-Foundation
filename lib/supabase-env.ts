export function getSupabaseEnvConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  return {
    url,
    key,
    isConfigured: Boolean(url && key),
  };
}

export function hasSupabaseConfig() {
  return getSupabaseEnvConfig().isConfigured;
}
