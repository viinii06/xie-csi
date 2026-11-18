-- XIE-CSI member access.
-- Run once in the Supabase SQL editor (or with `supabase db push`).
--
-- Only people with an 'active' row here can open the member dashboard.
-- Rows are added by the committee with scripts/invite-member.mjs (service role key);
-- the app itself can only read the signed-in user's own row.

create table if not exists public.members (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null unique,
  role       text not null default 'member',
  status     text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;

-- Signed-in users can read their own membership row, nothing else.
drop policy if exists "Members can read their own row" on public.members;
create policy "Members can read their own row"
  on public.members for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- No insert, update or delete policies: only the service role (admin script or
-- dashboard SQL editor) can change who is a member.
