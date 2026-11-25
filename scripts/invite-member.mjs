// Adds an invited member: creates their Supabase Auth account (if needed) and an active
// row in public.members. The email is passed on the command line, never stored in code.
//
//   node --env-file=.env.local scripts/invite-member.mjs <email> [--role=member]
//
// Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
// No email is sent here: the member signs in at /login, which emails them a code.

import { createClient } from "@supabase/supabase-js";

const email = process.argv[2]?.trim().toLowerCase();
const role = process.argv.find((a) => a.startsWith("--role="))?.split("=")[1] ?? "member";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Usage: node --env-file=.env.local scripts/invite-member.mjs <email> [--role=member]");
  process.exit(1);
}
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

async function findUserId(address) {
  for (let page = 1; page < 50; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const match = data.users.find((u) => u.email?.toLowerCase() === address);
    if (match) return match.id;
    if (data.users.length < 200) return null;
  }
  return null;
}

let userId = await findUserId(email);
if (!userId) {
  const { data, error } = await admin.auth.admin.createUser({ email, email_confirm: true });
  if (error) {
    console.error("Could not create the account:", error.message);
    process.exit(1);
  }
  userId = data.user.id;
  console.log("Created auth account.");
} else {
  console.log("Auth account already exists.");
}

const { error: memberError } = await admin
  .from("members")
  .upsert({ user_id: userId, email, role, status: "active" }, { onConflict: "user_id" });
if (memberError) {
  console.error("Could not add the member row:", memberError.message);
  console.error("Did you run supabase/migrations/0001_members.sql?");
  process.exit(1);
}

console.log(`Active member added (${role}). They can now sign in at /login.`);
