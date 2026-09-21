import { Link } from "@tanstack/react-router";
import skyworksLogo from "@/assets/skyworks-logo.png";
import nusLogo from "@/assets/nus-cfg-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-9 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={skyworksLogo}
            alt="Skyworks"
            className="h-7 w-auto"
          />
          <span className="h-6 w-px bg-border" aria-hidden="true" />
          <img
            src={nusLogo}
            alt="NUS · Centre for Future-ready Graduates"
            className="h-8 w-auto"
          />
        </div>
        <p className="text-sm text-muted-foreground md:max-w-xs md:text-center">
          23 September, 10am–5pm · Suntec Convention Centre, Level 4, Hall
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
