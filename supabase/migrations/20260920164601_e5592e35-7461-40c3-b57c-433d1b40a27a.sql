-- Roles
create type public.app_role as enum ('admin', 'recruiter');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can read own roles"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Auto-grant recruiter role to Skyworks staff emails
create or replace function public.handle_new_user_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(coalesce(new.email, '')) like '%@skyworksinc.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'recruiter')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_grant_role
after insert on auth.users
for each row execute function public.handle_new_user_role();

-- Recruiters can read applications
create policy "Recruiters can view applications"
on public.applications for select
to authenticated
using (public.has_role(auth.uid(), 'recruiter') or public.has_role(auth.uid(), 'admin'));

-- Recruiters can read CVs in the private bucket
create policy "Recruiters can read cvs"
on storage.objects for select
to authenticated
using (
  bucket_id = 'cvs'
  and (public.has_role(auth.uid(), 'recruiter') or public.has_role(auth.uid(), 'admin'))
);