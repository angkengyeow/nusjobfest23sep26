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
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl font-bold tracking-[0.14em] text-brand-blue-deep">
            SKYWORKS
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Internship Programme
          </span>
        </Link>

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

        <Link
          to="/apply"
          className="ml-auto inline-flex items-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep sm:ml-0"
        >
          Submit CV
        </Link>
      </div>
    </header>
  );
}
