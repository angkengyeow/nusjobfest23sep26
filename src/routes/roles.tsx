import { createFileRoute, Link } from "@tanstack/react-router";

import { internships } from "@/lib/internships";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Internship Openings — Skyworks at NUS Career Fest 2026" },
      {
        name: "description",
        content:
          "Five Skyworks internships open to NUS students: equipment engineering, facilities engineering, automation (Camline), CAPEX sourcing and data science.",
      },
      { property: "og:title", content: "Internship Openings — Skyworks" },
      {
        property: "og:description",
        content:
          "Six-month paid internships in Singapore. See responsibilities, requirements and apply with your CV.",
      },
    ],
  }),
  component: RolesPage,
});

function RolesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
        Internships only
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Open internships</h1>
      <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
        All placements are based in Singapore and run for six months. One application form covers
        every role — tell us which one interests you.
      </p>


      <div className="mt-12 space-y-6">
        {internships.map((role) => (
          <article
            key={role.slug}
            className="grid gap-6 border border-border bg-card p-6 shadow-panel sm:p-8 lg:grid-cols-[1.4fr_1fr]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                {role.category}
              </p>
              <h2 className="mt-3 text-2xl">{role.title}</h2>
              <p className="mt-3 text-muted-foreground">{role.blurb}</p>

              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Responsibilities
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {role.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Requirements
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {role.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/apply"
                search={{ role: role.title }}
                className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep"
              >
                Apply for this role
              </Link>

            </div>

            <dl className="space-y-4 border-t border-border pt-6 text-sm lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div>
                <dt className="text-muted-foreground">Duration</dt>
                <dd className="mt-1 font-semibold">{role.duration}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd className="mt-1 font-semibold">{role.location}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Start</dt>
                <dd className="mt-1 font-semibold">{role.start}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">We look for</dt>
                <dd className="mt-1 font-semibold">{role.looking.join(" · ")}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
