"use server";

import { redirect } from "next/navigation";
import { codeCopy, loginCopy, loginNotices } from "@/content/portal";
import { findActiveMember } from "@/lib/auth/member";
import { isAuthConfigured, siteUrl } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginState =
  | { step: "email"; email?: string; error?: string }
  | { step: "code"; email: string; error?: string; resent?: boolean };

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
// Supabase codes are 6 digits by default (configurable up to 10). Kept as text so
// leading zeroes survive.
const looksLikeCode = (v: string) => /^\d{6,10}$/.test(v);

// The member login form posts here. `intent` picks the step:
//   send / resend → email a one-time code   verify → check the code and sign in
export async function submitLogin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const intent = String(formData.get("intent") ?? "send");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!looksLikeEmail(email)) return { step: "email", email, error: loginCopy.invalidEmail };
  if (!isAuthConfigured) return { step: "email", email, error: loginCopy.notConfigured };

  if (intent === "verify") return verifyCode(email, String(formData.get("token") ?? ""));
  return requestCode(email, intent === "resend");
}

// Emails a sign-in code to an invited member. Accounts are never created here
// (shouldCreateUser: false), so only people the committee has added can sign in.
// To avoid revealing who is on the invite list, an unknown address gets the same
// "enter your code" step as an invited one.
async function requestCode(email: string, resend: boolean): Promise<LoginState> {
  const fail = (error: string): LoginState => (resend ? { step: "code", email, error } : { step: "email", email, error });

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    // The redirect keeps the emailed link working while the template still contains one.
    options: { shouldCreateUser: false, emailRedirectTo: `${siteUrl}/auth/confirm` },
  });

  // Unknown or uninvited addresses: answer exactly as for invited ones.
  if (!error || ["otp_disabled", "signup_disabled", "user_not_found"].includes(error.code ?? "")) {
    return { step: "code", email, resent: resend };
  }
  if (error.status === 429 || error.code === "over_email_send_rate_limit" || error.code === "over_request_rate_limit") {
    return fail(codeCopy.tooManyRequests);
  }
  console.error("requestCode failed", error.code, error.status);
  return fail(codeCopy.sendFailed);
}

// Checks the code, which creates the session cookies, then lets only active members in.
// A valid account without an active membership is signed straight out again, so it
// never holds a session the dashboard would bounce (no redirect loop).
async function verifyCode(email: string, rawToken: string): Promise<LoginState> {
  const token = rawToken.replace(/\D/g, "");
  if (!looksLikeCode(token)) return { step: "code", email, error: codeCopy.invalidFormat };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });

  if (error || !data.user) {
    if (error?.status === 429 || error?.code === "over_request_rate_limit") {
      return { step: "code", email, error: codeCopy.tooManyAttempts };
    }
    if (!error || error.code === "otp_expired" || [400, 401, 403].includes(error.status ?? 0)) {
      return { step: "code", email, error: codeCopy.wrongOrExpired };
    }
    // Never log the code itself.
    console.error("verifyCode failed", error.code, error.status);
    return { step: "code", email, error: codeCopy.verifyFailed };
  }

  const member = await findActiveMember(supabase, data.user.id);
  if (!member) {
    await supabase.auth.signOut();
    return { step: "email", email, error: loginNotices["no-access"].text };
  }
  redirect("/dashboard");
}
