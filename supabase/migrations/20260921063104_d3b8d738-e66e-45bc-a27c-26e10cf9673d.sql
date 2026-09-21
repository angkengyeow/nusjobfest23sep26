CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
begin
  if lower(coalesce(new.email, '')) like '%@skyworks.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'recruiter')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$function$;