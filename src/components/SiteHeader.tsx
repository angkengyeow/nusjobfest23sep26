import { Link } from "@tanstack/react-router";
import skyworksLogo from "@/assets/skyworks-logo.png.asset.json";
import nusLogo from "@/assets/nus-cfg-logo.png.asset.json";

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
          <img
            src={skyworksLogo.url}
            alt="Skyworks"
            className="h-9 w-auto shrink-0"
          />
          <span className="hidden flex-col leading-none min-[420px]:flex">
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Internship Programme
            </span>
          </span>
        </Link>

        <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
        <img
          src={nusLogo.url}
          alt="NUS · Centre for Future-ready Graduates"
          className="hidden h-9 w-auto sm:block"
        />

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
