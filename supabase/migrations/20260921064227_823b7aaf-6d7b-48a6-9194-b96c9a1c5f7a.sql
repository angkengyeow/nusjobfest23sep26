CREATE TYPE public.application_status AS ENUM ('new','shortlisted','interviewed','rejected','hired');

ALTER TABLE public.applications
  ADD COLUMN status public.application_status NOT NULL DEFAULT 'new',
  ADD COLUMN status_updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN reference_code text;

CREATE UNIQUE INDEX applications_reference_code_key ON public.applications (upper(reference_code)) WHERE reference_code IS NOT NULL;

CREATE OR REPLACE FUNCTION public.touch_application_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER applications_status_touch
BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE FUNCTION public.touch_application_status();

CREATE POLICY "Recruiters can update application status"
ON public.applications
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'recruiter'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'recruiter'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.get_application_status(_email text, _reference_code text)
RETURNS TABLE (role_applied text, status public.application_status, submitted_at timestamptz, status_updated_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT a.role_applied, a.status, a.created_at, a.status_updated_at
  FROM public.applications a
  WHERE a.reference_code IS NOT NULL
    AND upper(a.reference_code) = upper(btrim(_reference_code))
    AND lower(a.email) = lower(btrim(_email))
    AND length(btrim(_reference_code)) >= 6
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.get_application_status(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_application_status(text, text) TO anon, authenticated, service_role;