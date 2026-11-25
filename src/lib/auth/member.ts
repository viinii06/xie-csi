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

  return { member: await findActiveMember(supabase, user.id), signedIn: true };
}

// Reads the user's own membership row through a client that already holds their
// session (RLS only returns that row). Returns null unless the membership is active.
export async function findActiveMember(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string,
): Promise<Member | null> {
  const { data: row } = await supabase
    .from("members")
    .select("email, role, status")
    .eq("user_id", userId)
    .maybeSingle();

  if (!row || row.status !== "active") return null;
  return { id: userId, email: row.email, role: row.role };
}

// Gate for member-only pages and actions. Signed-out visitors go to /login; a signed-in
// account without an active membership is signed out and told it has no access.
export async function requireMember(): Promise<Member> {
  const { member, signedIn } = await getActiveMember();
  if (member) return member;
  if (signedIn) redirect("/auth/no-access");
  redirect("/login");
}
