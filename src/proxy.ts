import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthConfigured, supabaseKey, supabaseUrl } from "./lib/supabase/config";

// Runs only on member routes. It refreshes the Supabase session cookies and turns away
// visitors with no session before /dashboard renders. This is an early check only: the
// dashboard verifies the user and their membership again on the server.
export async function proxy(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (!isAuthConfigured) {
    return isDashboard ? NextResponse.redirect(new URL("/login", request.url)) : NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet, headers) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isDashboard && !user) {
    const redirect = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/auth/:path*"],
};
