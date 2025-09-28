-- Schema: tables

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key,
  full_name text,
  contact_id uuid references contacts(id),
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references contacts(id),
  title text not null,
  description text,
  budget numeric,
  status text default 'draft',
  start_date date,
  due_date date,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists progress_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  contact_id uuid references contacts(id),
  title text,
  description text,
  files text[],
  visibility text default 'client',
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  project_id uuid references projects(id),
  uploaded_by uuid references profiles(id),
  uploaded_at timestamptz default now()
);

-- RLS enable
alter table if exists projects enable row level security;
alter table if exists progress_updates enable row level security;

-- Policies: projects
drop policy if exists clients_select_own_projects on projects;
create policy clients_select_own_projects on projects for select using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
      and profiles.contact_id = projects.contact_id
  )
);

drop policy if exists admins_full_access_projects on projects;
create policy admins_full_access_projects on projects for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin)
) with check (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin)
);

-- Policies: progress_updates
drop policy if exists clients_select_own_updates on progress_updates;
create policy clients_select_own_updates on progress_updates for select using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
      and profiles.contact_id = progress_updates.contact_id
  ) and progress_updates.visibility = 'client'
);

drop policy if exists admins_manage_updates on progress_updates;
create policy admins_manage_updates on progress_updates for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin)
) with check (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.is_admin)
);


