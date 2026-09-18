-- Run this file in Supabase SQL Editor.
-- After creating the first Auth user, run the admin_users seed at the bottom.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
    and role in ('admin', 'editor')
  );
$$;

create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  organization_name text not null default 'Equity Bridge Foundation',
  tagline text,
  mission text,
  phone text,
  whatsapp text,
  email text,
  address text,
  social_links jsonb not null default '{}'::jsonb,
  support_details jsonb not null default '{}'::jsonb,
  logo_path text,
  homepage_featured_content jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null default '',
  category text,
  tags text[] not null default '{}',
  featured_image_id uuid,
  sources jsonb not null default '[]'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled', 'archived')),
  scheduled_for timestamptz,
  published_at timestamptz,
  created_by uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.article_revisions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  snapshot jsonb not null,
  changed_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.justice_bridge_editions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  quarter text,
  web_content text not null default '',
  pdf_path text,
  seo jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_featured boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.rights_resources (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  content text not null default '',
  category text,
  sources jsonb not null default '[]'::jsonb,
  related_resource_ids uuid[] not null default '{}',
  last_reviewed date,
  last_updated date,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  content text not null default '',
  image_id uuid,
  resource_ids uuid[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  path text unique not null,
  filename text not null,
  mime_type text not null,
  alt_text text,
  bucket text not null default 'public-media',
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'reviewing', 'resolved', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.legal_help_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  contact_method text not null,
  issue text not null,
  details text not null,
  language text not null,
  status text not null default 'new' check (status in ('new', 'under_review', 'contacted', 'referred', 'closed')),
  internal_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.pages enable row level security;
alter table public.articles enable row level security;
alter table public.article_revisions enable row level security;
alter table public.justice_bridge_editions enable row level security;
alter table public.rights_resources enable row level security;
alter table public.campaigns enable row level security;
alter table public.media enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.legal_help_requests enable row level security;
alter table public.audit_logs enable row level security;

alter table public.contact_submissions drop constraint if exists contact_submissions_status_check;
alter table public.contact_submissions add constraint contact_submissions_status_check check (status in ('new', 'read', 'reviewing', 'resolved', 'archived'));
alter table public.legal_help_requests drop constraint if exists legal_help_requests_status_check;
alter table public.legal_help_requests add constraint legal_help_requests_status_check check (status in ('new', 'under_review', 'contacted', 'referred', 'closed'));
alter table public.legal_help_requests add column if not exists internal_notes text;

drop policy if exists "Admins can read contact enquiries" on public.contact_submissions;
drop policy if exists "Admins can update contact enquiries" on public.contact_submissions;
drop policy if exists "Admins can read legal help requests" on public.legal_help_requests;
drop policy if exists "Admins can update legal help requests" on public.legal_help_requests;
drop policy if exists "Public can submit contact enquiries" on public.contact_submissions;
drop policy if exists "Public can submit legal help requests" on public.legal_help_requests;
drop policy if exists "Public can read published pages" on public.pages;
drop policy if exists "Public can read published articles" on public.articles;
drop policy if exists "Public can read published editions" on public.justice_bridge_editions;
drop policy if exists "Public can read published rights resources" on public.rights_resources;
drop policy if exists "Public can read published campaigns" on public.campaigns;
drop policy if exists "Public can read site settings" on public.site_settings;
drop policy if exists "Admins manage CMS pages" on public.pages;
drop policy if exists "Admins manage site settings" on public.site_settings;
drop policy if exists "Admins manage articles" on public.articles;
drop policy if exists "Admins manage revisions" on public.article_revisions;
drop policy if exists "Admins manage editions" on public.justice_bridge_editions;
drop policy if exists "Admins manage rights resources" on public.rights_resources;
drop policy if exists "Admins manage campaigns" on public.campaigns;
drop policy if exists "Admins manage media" on public.media;
drop policy if exists "Admins manage admin users" on public.admin_users;
drop policy if exists "Admins view audit logs" on public.audit_logs;
drop policy if exists "Admins create audit logs" on public.audit_logs;
drop policy if exists "Admins manage contact enquiries" on public.contact_submissions;
drop policy if exists "Admins manage legal help requests" on public.legal_help_requests;

create policy "Public can read published pages" on public.pages for select to anon, authenticated using (status = 'published');
create policy "Public can read published articles" on public.articles for select to anon, authenticated using (status = 'published');
create policy "Public can read published editions" on public.justice_bridge_editions for select to anon, authenticated using (status = 'published');
create policy "Public can read published rights resources" on public.rights_resources for select to anon, authenticated using (status = 'published');
create policy "Public can read published campaigns" on public.campaigns for select to anon, authenticated using (status = 'published');
create policy "Public can read site settings" on public.site_settings for select to anon, authenticated using (true);

create policy "Admins manage CMS pages" on public.pages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage site settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage articles" on public.articles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage revisions" on public.article_revisions for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage editions" on public.justice_bridge_editions for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage rights resources" on public.rights_resources for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage campaigns" on public.campaigns for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage media" on public.media for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage admin users" on public.admin_users for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins view audit logs" on public.audit_logs for select to authenticated using (public.is_admin());
create policy "Admins create audit logs" on public.audit_logs for insert to authenticated with check (public.is_admin());

create policy "Public can submit contact enquiries" on public.contact_submissions for insert to anon, authenticated with check (true);
create policy "Admins manage contact enquiries" on public.contact_submissions for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can submit legal help requests" on public.legal_help_requests for insert to anon, authenticated with check (true);
create policy "Admins manage legal help requests" on public.legal_help_requests for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Run after creating the first Auth user. Replace the email if needed.
insert into public.admin_users (user_id, email, role)
select id, email, 'admin' from auth.users
where email = 'equitybridgefoundation@gmail.com'
on conflict (user_id) do update set role = 'admin', email = excluded.email;
