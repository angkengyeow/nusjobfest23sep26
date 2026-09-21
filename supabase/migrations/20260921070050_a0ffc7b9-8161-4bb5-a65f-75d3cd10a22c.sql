GRANT DELETE ON public.applications TO authenticated;

CREATE POLICY "Recruiters can delete applications"
ON public.applications FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'recruiter'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Recruiters can delete cvs"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'cvs' AND (has_role(auth.uid(), 'recruiter'::app_role) OR has_role(auth.uid(), 'admin'::app_role)));