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

Members sign in with a one-time code emailed to them (typed into `/login`). Access is invite-only: the app never creates
accounts, and only people with an `active` row in `public.members` can open `/dashboard`.

| Route | What it does |
| --- | --- |
| `/login` | Emails a one-time code, then verifies it and sends active members to `/dashboard` |
| `/auth/confirm` | Fallback for emailed sign-in links (only used if the email template contains a link) |
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
5. **Authentication → Email Templates → Magic Link:** make the email show the code:
   ```html
   <h2>Your XIE-CSI sign-in code</h2>
   <p>Enter this code on the member login page:</p>
   <p style="font-size:28px;font-weight:700;letter-spacing:6px">{{ .Token }}</p>
   <p>It works once and expires soon. If you didn’t ask for it, ignore this email.</p>
   ```
   Switch the template only once the code form is deployed; until then, keep the link
   template (or include both the code and the link during the changeover).
   College mail servers often filter Supabase’s built-in sender, which is also limited to a
   few emails an hour: set up **Authentication → Emails → SMTP Settings** for real use.
6. Restart `npm run dev` so the new environment variables load.

### Inviting a member

```bash
node --env-file=.env.local scripts/invite-member.mjs <college-email>
```

This creates the account and an active membership row. No email is sent; the member then
signs in at `/login` with an emailed code. To remove access, set their `status` to `inactive` in the
`members` table (Table editor).
