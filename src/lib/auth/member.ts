import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isAuthConfigured } from "../supabase/config";
import { createSupabaseServerClient } from "../supabase/server";

export type Member = { id: string; email: string; role: string };

// Looks up the signed-in user and their membership row. The user is verified with
// Supabase Auth (getUser), not read from the cookie alone, and the members table is
// protected by Row Level Security so a user can only ever read their own row.
export async function getActiveMember(): Promise<{ member: Member | null; signedIn: boolean }> {
  // Always decide per request, never at build time.
  await connection();
  if (!isAuthConfigured) return { member: null, signedIn: false };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { member: null, signedIn: false };

  const { data: row } = await supabase
    .from("members")
    .select("email, role, status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!row || row.status !== "active") return { member: null, signedIn: true };
  return { member: { id: user.id, email: row.email, role: row.role }, signedIn: true };
}

// Gate for member-only pages and actions. Signed-out visitors go to /login; a signed-in
// account without an active membership is signed out and told it has no access.
export async function requireMember(): Promise<Member> {
  const { member, signedIn } = await getActiveMember();
  if (member) return member;
  if (signedIn) redirect("/auth/no-access");
  redirect("/login");
}
