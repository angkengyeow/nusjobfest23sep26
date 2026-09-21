import { Link } from "@tanstack/react-router";
import skyworksLogo from "@/assets/skyworks-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-9 sm:flex-row sm:items-center sm:justify-between">
        <img
          src={skyworksLogo.url}
          alt="Skyworks"
          className="h-6 w-auto self-start sm:self-center"
        />
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
