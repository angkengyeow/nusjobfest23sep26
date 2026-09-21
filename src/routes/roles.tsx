import { createFileRoute, Link } from "@tanstack/react-router";

import { internships } from "@/lib/internships";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Internship Openings — Skyworks at NUS Career Fest 2026" },
      {
        name: "description",
        content:
          "Eighteen Skyworks internships open to NUS students across equipment, facilities, yield, automation, industrial and NPI engineering, IC layout design, manufacturing, planning, supply chain, sourcing, software, HR and data science.",
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
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-blue">
        Internships only
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Open internships</h1>
      <div className="section-bar mt-4" aria-hidden="true" />
      <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
        All placements are based in Singapore and run for six months. One application form covers
        every role — tell us which one interests you.
      </p>


      <div className="mt-12 space-y-6">
        {internships.map((role) => (
          <article
            key={role.slug}
            className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-panel transition-all hover:border-brand-blue hover:shadow-xl sm:p-8 lg:grid-cols-[1.4fr_1fr]"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                {role.category}
              </p>
              <h2 className="mt-2 text-2xl">{role.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{role.blurb}</p>

              <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
                Responsibilities
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {role.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
                Requirements
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
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
                className="mt-6 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-ink hover:shadow-lg"
              >
                Apply for this role
              </Link>

            </div>

            <dl className="space-y-4 self-start rounded-xl bg-secondary p-5 text-sm lg:mt-1">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Duration</dt>
                <dd className="mt-1 font-semibold">{role.duration}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Location</dt>
                <dd className="mt-1 font-semibold">{role.location}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Start date</dt>
                <dd className="mt-1 font-semibold">{role.start}</dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">We look for</dt>
                <dd className="mt-1 font-semibold">{role.looking.join(" · ")}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
