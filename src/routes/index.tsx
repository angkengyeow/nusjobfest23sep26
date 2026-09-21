import { createFileRoute, Link } from "@tanstack/react-router";

import heroLines from "@/assets/hero-lines.png";
import { internships } from "@/lib/internships";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skyworks Internships — NUS Career Fest 2026" },
      {
        name: "description",
        content:
          "Skyworks internship opportunities for NUS students. Meet us at NUS Career Fest 2026, Suntec, and submit your CV online.",
      },
      { property: "og:title", content: "Skyworks Internships — NUS Career Fest 2026" },
      {
        property: "og:description",
        content:
          "Engineering internships in RF design, manufacturing, test and firmware. Apply online with your CV.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-brand">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/85">
              NUS Career Fest 2026
            </p>
            <h1 className="mt-5 max-w-[22ch] text-4xl leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              Start your engineering career in wireless.
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg text-primary-foreground/90">
              Skyworks is hiring interns across RF design, manufacturing, test and firmware. Come
              speak with our engineers at Suntec, then submit your CV here.
            </p>

            <dl className="mt-8 grid max-w-md grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="text-primary-foreground/70">Date</dt>
                <dd className="mt-1 font-semibold">23 September 2026</dd>
              </div>
              <div>
                <dt className="text-primary-foreground/70">Venue</dt>
                <dd className="mt-1 font-semibold">Suntec Convention Centre</dd>
              </div>
            </dl>

            <div className="mt-9">
              <Link
                to="/apply"
                className="inline-flex items-center rounded-sm border border-primary-foreground/70 px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/15"
              >
                Apply now
              </Link>
            </div>
          </div>

          <img
            src={heroLines}
            alt=""
            width={1920}
            height={1440}
            className="mx-auto w-full max-w-md opacity-80 invert lg:max-w-full"
          />
        </div>
      </section>

      {/* Leading the way style intro */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <h2 className="text-3xl sm:text-4xl">Why intern with us</h2>
        <p className="mt-3 max-w-[60ch] text-lg text-muted-foreground">
          Real projects, real silicon. Interns sit with the engineering teams building connectivity
          products used around the world.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div className="rule-accent">
            <h3 className="text-lg">Hands-on from week one</h3>
            <p className="mt-2 text-muted-foreground">
              You own a scoped project with a named engineering mentor.
            </p>
          </div>
          <div className="rule-accent">
            <h3 className="text-lg">Paid, six-month placements</h3>
            <p className="mt-2 text-muted-foreground">
              Aligned to NUS internship and industrial attachment requirements.
            </p>
          </div>
          <div className="rule-accent">
            <h3 className="text-lg">A route to graduate roles</h3>
            <p className="mt-2 text-muted-foreground">
              Strong interns are considered first for graduate openings.
            </p>
          </div>
        </div>
      </section>

      {/* Roles preview */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl">Open internships</h2>
            <Link
              to="/roles"
              className="text-sm font-semibold text-brand-blue hover:text-brand-blue-deep"
            >
              See full details →
            </Link>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {internships.map((role) => (
              <article key={role.slug} className="border border-border bg-card p-6 shadow-panel">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                  {role.category}
                </p>
                <h3 className="mt-3 text-xl">{role.title}</h3>
                <p className="mt-2 text-muted-foreground">{role.blurb}</p>
                <p className="mt-5 text-sm text-muted-foreground">
                  {role.duration} · {role.location} · Start date {role.start.toLowerCase()}
                </p>
                <Link
                  to="/apply"
                  search={{ role: role.title }}
                  className="mt-5 inline-flex text-sm font-semibold text-brand-blue hover:text-brand-blue-deep"
                >
                  Apply for this role →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="border border-border bg-card p-8 shadow-panel sm:p-12">
          <h2 className="text-2xl sm:text-3xl">Visiting the fest?</h2>
          <p className="mt-3 max-w-[58ch] text-lg text-muted-foreground">
            Drop by our booth for a chat with the engineering team, then submit your CV here so we
            have everything on file.
          </p>
          <Link
            to="/apply"
            className="mt-7 inline-flex items-center rounded-sm bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep"
          >
            Submit your application
          </Link>
        </div>
      </section>
    </div>
  );
}
