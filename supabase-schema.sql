-- SYRUEN: estructura inicial de persistencia en Supabase
-- Ejecutar UNA sola vez en SQL Editor.
create table if not exists public.syruen_data (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.syruen_users (
  id text primary key,
  payload jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.syruen_data enable row level security;
alter table public.syruen_users enable row level security;

drop policy if exists "syruen_data_public_access" on public.syruen_data;
drop policy if exists "syruen_users_public_access" on public.syruen_users;
create policy "syruen_data_public_access" on public.syruen_data for all to anon, authenticated using (true) with check (true);
create policy "syruen_users_public_access" on public.syruen_users for all to anon, authenticated using (true) with check (true);

grant select, insert, update, delete on public.syruen_data to anon, authenticated;
grant select, insert, update, delete on public.syruen_users to anon, authenticated;

insert into public.syruen_data(id,payload)
values ('main','{"offices":[],"tickets":[],"comments":[],"implementations":[],"dismantles":[],"inventory":[],"resolved":[],"visitors":[],"gestiones":[],"crypto":[],"cctvReports":[],"userNotifications":[]}'::jsonb)
on conflict (id) do nothing;
insert into public.syruen_users(id,payload)
values ('main','[{"username":"admin","password":"admin123","name":"Administrador principal","role":"omt","email":"","status":"active","mainAdmin":true}]'::jsonb)
on conflict (id) do nothing;
