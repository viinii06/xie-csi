import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseKey, supabaseUrl } from "./config";

// Supabase client bound to the current request's cookies. Use in Server Components,
// Server Actions and Route Handlers. Server Components can't write cookies, so session
// refreshes there are ignored; the proxy refreshes them before the page renders.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component: cookies are read-only there.
        }
      },
    },
  });
}
