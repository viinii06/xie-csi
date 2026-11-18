import { NextResponse, type NextRequest } from "next/server";
import { isAuthConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// A signed-in account without an active membership ends up here: sign it out, then
// show the login screen with an explanation.
export async function GET(request: NextRequest) {
  if (isAuthConfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/login?error=no-access", request.url));
}
