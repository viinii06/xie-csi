# XIE-CSI website

The public homepage for the CSI Student Chapter at Xavier Institute of Engineering, Mumbai.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # production build
```

## Where things live

| What | File |
| --- | --- |
| Upcoming events (DSA Workshop), RepoForge copy | `src/content/events.ts` |
| Committee 2026–27 | `src/content/team.ts` |
| Hero copy, nav, photo slots and alt text, About, Contact, Member Login link | `src/content/site.ts` |
| Logos | `public/brand/xie-logo.(svg/png/webp)` and `public/brand/csi-logo.(svg/png/webp)` |
| Placeholder photos | `public/events/placeholders/` |
| Colours, type, motion | `src/app/globals.css` |

### Common edits

- **Logos:** drop the official files into `public/brand/` with the names above. They show up automatically at their original proportions. Until then the header shows a text lockup.
- **Registration:** set `registrationUrl` in `src/content/events.ts`. A Register button appears.
- **Member Login:** the header and mobile menu link to `/login` (`memberLoginHref` in `src/content/site.ts`; set it to `null` to show "Coming soon").
- **Real photos:** replace the files in `public/events/placeholders/` (or point `src` somewhere new), update `alt`, set `credit` to `null`, and set `photosAreReal: true` in `events.ts`. Frames keep a fixed aspect ratio, and `focus` moves the crop.
- **Contact:** fill in `email`, `instagram` and `linkedin` in `site.ts`. Empty values stay hidden.

Calendar files are generated at `/events/<slug>.ics` from the event data.

## Member sign-in (Supabase)

Members sign in with a one-time email link. Access is invite-only: the app never creates
accounts, and only people with an `active` row in `public.members` can open `/dashboard`.

| Route | What it does |
| --- | --- |
| `/login` | Sends a sign-in link to invited members |
| `/auth/confirm` | Email link callback: creates the session, then sends active members to `/dashboard` |
| `/dashboard` | Member dashboard; checks session and membership on the server |
| `/preview/login`, `/preview/dashboard` | Design previews with simulated states (no real sign-in) |

### One-time setup

1. Create a Supabase project. In **Project Settings → API**, copy the project URL, the
   publishable (anon) key and the secret (service_role) key into `.env.local`, using the
   names in [.env.example](.env.example).
2. **SQL editor:** run [supabase/migrations/0001_members.sql](supabase/migrations/0001_members.sql).
3. **Authentication → Sign In / Providers → Email:** keep Email enabled and turn **off**
   "Allow new users to sign up".
4. **Authentication → URL Configuration:**
   - Site URL: `http://localhost:3000` (your real domain in production)
   - Redirect URLs: add `http://localhost:3000/auth/confirm`
5. **Authentication → Email Templates → Magic Link:** replace the link with
   ```html
   <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Sign in to XIE-CSI</a>
   ```
   This lets members open the link on any device. (The default template also works, but
   only in the same browser that requested the link.)
6. Restart `npm run dev` so the new environment variables load.

### Inviting a member

```bash
node --env-file=.env.local scripts/invite-member.mjs <college-email>
```

This creates the account and an active membership row. No email is sent; the member then
signs in at `/login`. To remove access, set their `status` to `inactive` in the
`members` table (Table editor).
