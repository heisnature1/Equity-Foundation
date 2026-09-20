-- ============================================================================
-- Equity Bridge Foundation — REPAIR: make the site work end to end.
--
-- Run this ONCE in the Supabase dashboard → SQL Editor.
-- It is idempotent: safe to run again, it will not duplicate anything.
--
-- It fixes two problems found in the live project:
--   1. The public forms could not save — anon INSERT was blocked by RLS
--      ("new row violates row-level security policy"). That is why a legal-help
--      or contact submission showed "could not be submitted" and never reached
--      the admin inbox.
--   2. The admin `region` column for legal-help requests was missing.
--
-- What this guarantees afterwards:
--   • Anything the public submits (contact + legal help) is saved and appears
--     in the admin inbox.
--   • Anything the admin publishes appears on the public site.
-- ============================================================================

-- 1. Missing columns on legal-help requests (safe if they already exist) -----
-- The app writes and reads both of these. When they are absent the admin
-- legal-help inbox breaks and every request looks like it vanished.
alter table public.legal_help_requests add column if not exists internal_notes text;
alter table public.legal_help_requests add column if not exists region text;

-- 2. Ensure RLS is enabled on every table ------------------------------------
alter table public.admin_users          enable row level security;
alter table public.site_settings        enable row level security;
alter table public.pages                enable row level security;
alter table public.articles             enable row level security;
alter table public.justice_bridge_editions enable row level security;
alter table public.rights_resources     enable row level security;
alter table public.campaigns            enable row level security;
alter table public.media                enable row level security;
alter table public.contact_submissions  enable row level security;
alter table public.legal_help_requests  enable row level security;
alter table public.audit_logs           enable row level security;

-- 3. PUBLIC SUBMIT — anyone may insert a contact enquiry or legal-help request.
drop policy if exists "Public can submit contact enquiries" on public.contact_submissions;
create policy "Public can submit contact enquiries"
  on public.contact_submissions for insert to anon, authenticated with check (true);

drop policy if exists "Public can submit legal help requests" on public.legal_help_requests;
create policy "Public can submit legal help requests"
  on public.legal_help_requests for insert to anon, authenticated with check (true);

-- 4. ADMIN READ + MANAGE — signed-in admins see and manage the inboxes.
drop policy if exists "Admins manage contact enquiries" on public.contact_submissions;
create policy "Admins manage contact enquiries"
  on public.contact_submissions for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage legal help requests" on public.legal_help_requests;
create policy "Admins manage legal help requests"
  on public.legal_help_requests for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 5. PUBLIC READ — anything published is visible to the public site.
drop policy if exists "Public can read published editions" on public.justice_bridge_editions;
create policy "Public can read published editions"
  on public.justice_bridge_editions for select to anon, authenticated using (status = 'published');

drop policy if exists "Public can read published rights resources" on public.rights_resources;
create policy "Public can read published rights resources"
  on public.rights_resources for select to anon, authenticated using (status = 'published');

drop policy if exists "Public can read published campaigns" on public.campaigns;
create policy "Public can read published campaigns"
  on public.campaigns for select to anon, authenticated using (status = 'published');

drop policy if exists "Public can read published pages" on public.pages;
create policy "Public can read published pages"
  on public.pages for select to anon, authenticated using (status = 'published');

drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
  on public.articles for select to anon, authenticated using (status = 'published');

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select to anon, authenticated using (true);

-- 6. ADMIN MANAGE — publishing content from the admin workspace.
drop policy if exists "Admins manage editions" on public.justice_bridge_editions;
create policy "Admins manage editions" on public.justice_bridge_editions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage rights resources" on public.rights_resources;
create policy "Admins manage rights resources" on public.rights_resources
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage campaigns" on public.campaigns;
create policy "Admins manage campaigns" on public.campaigns
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage CMS pages" on public.pages;
create policy "Admins manage CMS pages" on public.pages
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage articles" on public.articles;
create policy "Admins manage articles" on public.articles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage media" on public.media;
create policy "Admins manage media" on public.media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins view audit logs" on public.audit_logs;
create policy "Admins view audit logs" on public.audit_logs
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins create audit logs" on public.audit_logs;
create policy "Admins create audit logs" on public.audit_logs
  for insert to authenticated with check (public.is_admin());

-- 7. Register your admin account so you can read the inboxes ----------------
-- Replace the email with the address you sign in with, then run just this part.
insert into public.admin_users (user_id, email, role)
select id, email, 'admin' from auth.users
where lower(email) = 'equitybridgefoundation@gmail.com'
on conflict (user_id) do update set role = 'admin', email = excluded.email;

-- If you are not sure which email you used, this registers EVERY existing
-- Auth user as an admin (this project has no public sign-up):
insert into public.admin_users (user_id, email, role)
select id, email, 'admin' from auth.users
on conflict (user_id) do nothing;

-- 8. Status constraints ------------------------------------------------------
-- The "archive" action in the admin inbox writes status = 'archived'. A table
-- created from the original schema rejects that value, so archiving silently
-- failed on those records.
alter table public.contact_submissions drop constraint if exists contact_submissions_status_check;
alter table public.contact_submissions add constraint contact_submissions_status_check
  check (status in ('new', 'read', 'reviewing', 'resolved', 'archived'));

alter table public.legal_help_requests drop constraint if exists legal_help_requests_status_check;
alter table public.legal_help_requests add constraint legal_help_requests_status_check
  check (status in ('new', 'under_review', 'contacted', 'referred', 'closed', 'archived'));
