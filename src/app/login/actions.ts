"use server";

import { loginCopy } from "@/content/portal";
import { isAuthConfigured, siteUrl } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SignInState =
  | { status: "idle" }
  | { status: "sent"; email: string }
  | { status: "error"; email: string; message: string };

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Sends a one-time sign-in link to an invited member. Accounts are never created here
// (shouldCreateUser: false), so only people the committee has added can sign in.
// To avoid revealing who is on the invite list, an unknown address gets the same
// "check your email" response as an invited one.
export async function sendSignInLink(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!looksLikeEmail(email)) {
    return { status: "error", email, message: loginCopy.invalidEmail };
  }
  if (!isAuthConfigured) {
    return { status: "error", email, message: loginCopy.notConfigured };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false, emailRedirectTo: `${siteUrl}/auth/confirm` },
  });

  if (!error) return { status: "sent", email };

  // Unknown or uninvited addresses: answer exactly as for invited ones.
  if (["otp_disabled", "signup_disabled", "user_not_found"].includes(error.code ?? "")) {
    return { status: "sent", email };
  }
  if (error.status === 429 || error.code === "over_email_send_rate_limit" || error.code === "over_request_rate_limit") {
    return { status: "error", email, message: "Too many sign-in attempts. Wait a minute, then try again." };
  }
  console.error("sendSignInLink failed", error.code, error.status);
  return { status: "error", email, message: "We couldn’t send the link right now. Try again in a minute." };
}
