"use server";

import { redirect } from "next/navigation";
import { isAuthConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signOut() {
  if (isAuthConfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/login?signed-out=1");
}
