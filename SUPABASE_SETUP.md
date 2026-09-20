# Connecting Equity Bridge Foundation to Supabase

This project is already wired to Supabase in code. What remains is applying the
database schema and creating your admin login. Follow these steps once.

---

## 1. Environment variables

Create `.env.local` in the project root (already present in this workspace):

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
```

Find both in Supabase → **Project Settings → API**.

These power: the public forms, the public content reads, and the admin
workspace (sign-in, inboxes, publishing).

---

## 2. Create the database schema + policies

Supabase → **SQL Editor** → paste the entire contents of
[`supabase/schema.sql`](./schema.sql) → **Run**.

This creates the tables, the `is_admin()` function, and every RLS policy:
- **Public can submit** contact enquiries and legal-help requests.
- **Public can read** anything with `status = 'published'`.
- **Admins can manage** all content and read the inboxes.

> If the public forms ever say *"could not be submitted"*, the insert policies
> are the usual cause. Re-running `schema.sql` is safe — it is idempotent.

---

## 3. Create your admin user

Supabase → **Authentication → Users → Add user** → enter the email you want to
sign in with and a password (tick "Auto Confirm User").

Then register that account as an admin — in the SQL Editor, run:

```sql
insert into public.admin_users (user_id, email, role)
select id, email, 'admin' from auth.users
where lower(email) = 'your-admin@email.com'
on conflict (user_id) do update set role = 'admin', email = excluded.email;
```

Replace the email with the one you created. (If you are unsure which email you
used, the bottom of `schema.sql` includes a fallback that registers every Auth
user as an admin. This project has no public sign-up, so every Auth account is
staff.)

---

## 4. Allow the auth callback URL

Supabase → **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:3000` (later, your real domain).
- **Redirect URLs**: add
  - `http://localhost:3000/auth/callback`
  - `https://<your-domain>/auth/callback`

This is used after email confirmation / magic-link sign-in.

---

## 5. Sign in

Go to `/admin/login`, sign in with your admin email and password.
You land on `/admin`.

- **If the dashboard is empty**, your account is not in `admin_users` — rerun
  step 3. The dashboard shows a red banner telling you this rather than showing
  a falsely empty inbox.
- **If it says "sign-in not configured"**, `.env.local` is missing the two keys.

---

## How the pieces fit together

| Concern | File |
| --- | --- |
| Session refresh + admin route guard | `proxy.ts` |
| Server-side Supabase client | `lib/supabase-server.ts` |
| Browser Supabase client (sign-in) | `components/admin-login-form.tsx` |
| Public (anonymous) read client | `lib/supabase-public-server.ts` |
| Auth callback (email links) | `app/auth/callback/route.ts` |
| Sign out | `app/auth/signout/route.ts` |
| Admin membership check | `lib/admin-access.ts` |
| Database schema + RLS | `supabase/schema.sql` |

## What is connected, and what still needs the steps above

- **Connected in code:** auth (login/logout/session), public reads of published
  content, admin data access.
- **Requires step 2–3 (database):** public submissions saving, the admin
  inboxes showing data, admin publishing. These are enforced by database
  policies, so they only work once the schema is applied.
- **Requires step 4 (Supabase config):** email-link / magic-link sign-in.
