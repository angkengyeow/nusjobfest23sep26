import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-9 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-sm font-bold tracking-[0.14em] text-brand-blue-deep">
          SKYWORKS
        </p>
        <p className="text-sm text-muted-foreground">
          NUS Career Fest 2026 · 23 September, 10am–5pm · Suntec Convention Centre, Level 4, Hall
          401 &amp; 402 · Internships only
        </p>
        <Link
          to="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-blue"
        >
          Recruiter login
        </Link>
      </div>
    </footer>
  );
}
