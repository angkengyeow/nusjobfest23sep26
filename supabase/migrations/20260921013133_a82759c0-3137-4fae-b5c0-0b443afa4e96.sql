create policy "Students can upload CVs"
on storage.objects for insert
to anon
with check (bucket_id = 'cvs');