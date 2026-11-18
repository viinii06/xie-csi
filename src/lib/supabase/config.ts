// Supabase settings read from the environment. See .env.example.
// The publishable (anon) key is safe in the browser; access is enforced by Row Level Security.

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isAuthConfigured = Boolean(supabaseUrl && supabaseKey);

/** Absolute origin used in sign-in emails, e.g. http://localhost:3000 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
