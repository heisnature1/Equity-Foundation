-- Run this once in the Supabase SQL editor for already-deployed sites.
-- It keeps the CMS-managed contact page aligned with the public details.
insert into public.site_settings (id, organization_name, phone, email)
values (true, 'Equity Bridge Foundation', '0505652308', 'equitybridgefoundation@gmail.com')
on conflict (id) do update
set
  phone = excluded.phone,
  email = excluded.email,
  updated_at = now();
