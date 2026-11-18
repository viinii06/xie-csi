import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { getActiveMember } from "@/lib/auth/member";
import { isAuthConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Landing point for the sign-in link in the email. Supports both link formats:
//   ?token_hash=…&type=email  (recommended email template, works on any device)
//   ?code=…                   (Supabase's default PKCE link, same browser only)
// After the session is created, only active members continue to /dashboard.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const to = (path: string) => NextResponse.redirect(new URL(path, request.url));
  if (!isAuthConfigured) return to("/login");

  const supabase = await createSupabaseServerClient();

  let failed = true;
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    failed = Boolean(error);
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    failed = Boolean(error);
  }
  if (failed) return to("/login?error=link");

  const { member } = await getActiveMember();
  if (!member) {
    await supabase.auth.signOut();
    return to("/login?error=no-access");
  }
  return to("/dashboard");
}
