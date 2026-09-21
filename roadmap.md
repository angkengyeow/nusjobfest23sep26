# Skyworks NUS Career Fest 2026 microsite

- [x] Adopt visual design from skyworksinc.com (blue-to-green gradient, geometric type)
- [x] Home page: event context + internship listings
- [x] Internships page with role details
- [x] Application form: name, contact, course, year, availability, CV upload
- [x] Store applications + CV files (Lovable Cloud)
- [x] Head metadata per route
- [x] Recruiter dashboard: filter by course/availability/role, download CVs
- [x] Recruiter sign in (@skyworksinc.com emails auto-approved)
- [x] GitHub Pages export: static build (vite.config.ts, .github/workflows/deploy-pages.yml, .env.production, build:gh script)
- [x] Browser-to-database CV upload so submissions work without a server
- [x] Direct anonymous CV upload rule applied to storage
- [x] Static build verified in browser (home, /roles with 18 roles, /apply deep links)
- [ ] User: connect GitHub repo in Lovable (+ menu → GitHub → Create repository) — workflow deploys on push
- [ ] After repo exists: add the GitHub Pages URL to allowed auth redirect URLs (recruiter sign-in)

