import { Link } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/roles", label: "Internships" },
  { to: "/apply", label: "Apply" },

] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <svg
            viewBox="0 0 40 40"
            aria-hidden="true"
            className="h-9 w-9 shrink-0"
            fill="none"
            strokeLinecap="round"
          >
            <defs>
              <linearGradient id="skyworks-mark" x1="0" y1="40" x2="40" y2="0">
                <stop offset="0%" stopColor="oklch(0.52 0.116 248)" />
                <stop offset="100%" stopColor="oklch(0.72 0.168 132)" />
              </linearGradient>
            </defs>
            <circle cx="9" cy="31" r="3.2" fill="url(#skyworks-mark)" />
            <path d="M9 22.5a8.5 8.5 0 0 1 8.5 8.5" stroke="url(#skyworks-mark)" strokeWidth="2.6" />
            <path d="M9 15a16 16 0 0 1 16 16" stroke="url(#skyworks-mark)" strokeWidth="2.6" />
            <path d="M9 7.5a23.5 23.5 0 0 1 23.5 23.5" stroke="url(#skyworks-mark)" strokeWidth="2.6" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-[0.18em] text-brand-blue-deep">
              SKYWORKS
            </span>
            <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Internship Programme
            </span>
          </span>
        </Link>

        <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
        <span className="hidden flex-col leading-none sm:flex">
          <span className="font-display text-sm font-bold tracking-[0.18em] text-foreground/80">
            NUS
          </span>
          <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Career Fest 2026
          </span>
        </span>

        <nav className="ml-auto hidden items-center gap-7 text-sm font-medium text-foreground/75 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-brand-blue" }}
              className="transition-colors hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
