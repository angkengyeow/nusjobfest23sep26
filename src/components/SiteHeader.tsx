import { Link } from "@tanstack/react-router";
import skyworksLogo from "@/assets/skyworks-logo.png";


const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/roles", label: "Internships" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={skyworksLogo}
            alt="Skyworks"
            className="h-11 w-auto shrink-0"
          />
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
          className="ml-auto inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-ink hover:shadow-lg sm:ml-4"
        >
          Apply now
        </Link>
      </div>
    </header>
  );
}
