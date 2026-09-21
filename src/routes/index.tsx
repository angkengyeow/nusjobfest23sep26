import { createFileRoute, Link } from "@tanstack/react-router";

import heroLines from "@/assets/hero-lines.png";
import boothQr from "@/assets/booth-qr.png";
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

const whyCards = [
  {
    title: "Hands-on from week one",
    body: "You own a scoped project with a named engineering mentor.",
    border: "border-l-brand-blue",
  },
  {
    title: "Paid, six-month placements",
    body: "Aligned to NUS internship and industrial attachment requirements.",
    border: "border-l-brand-green",
  },
  {
    title: "A route to graduate roles",
    body: "Strong interns are considered first for graduate openings.",
    border: "border-l-ink",
  },
] as const;

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-ink via-brand-blue/40 to-brand-green/30 opacity-80"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur-sm">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-brand-green" />
              Thank you for visiting our booth!
            </p>
            <h1 className="mt-6 max-w-[22ch] text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              Powering the wireless world starts{" "}
              <span className="bg-gradient-to-r from-brand-green to-white bg-clip-text text-transparent">
                with you.
              </span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/85">
              It's great to meet you. Skyworks is hiring interns across RF design, manufacturing,
              test and firmware — have a chat with our friend ambassadors at our booth, then leave
              your CV with us here.
            </p>

            <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Date
                </dt>
                <dd className="mt-1 font-semibold">23 September 2026</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Time
                </dt>
                <dd className="mt-1 font-semibold">10am – 5pm</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Venue
                </dt>
                <dd className="mt-1 font-semibold">
                  Suntec Convention Centre
                  <span className="block font-normal text-white/75">
                    Level 4, Hall 401 &amp; 402
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Fair info
                </dt>
                <dd className="mt-1">
                  <a
                    href="https://nus.edu.sg/cfg/nuscareerfest"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold underline underline-offset-4 transition-colors hover:text-brand-green"
                  >
                    NUS Career Fest page
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/apply"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-green px-7 py-3.5 text-sm font-bold text-ink transition-all hover:scale-[1.03] hover:shadow-xl"
              >
                Apply now
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                to="/roles"
                className="inline-flex items-center rounded-xl border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                View open roles
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

      {/* Why intern */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <h2 className="text-3xl sm:text-4xl">Why intern with us</h2>
        <div className="section-bar mt-3" aria-hidden="true" />
        <p className="mt-5 max-w-[60ch] text-lg text-muted-foreground">
          Real projects, real silicon. Interns sit with the engineering teams building connectivity
          products used around the world.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {whyCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border border-border border-l-4 bg-card p-8 shadow-panel transition-all hover:-translate-y-1 hover:shadow-xl ${card.border}`}
            >
              <h3 className="text-xl">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles preview */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl">Open internships</h2>
              <div className="section-bar mt-3" aria-hidden="true" />
            </div>
            <Link
              to="/roles"
              className="text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-deep"
            >
              See full details →
            </Link>
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internships.map((role) => (
              <article
                key={role.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand-blue hover:shadow-xl"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
                  {role.category}
                </p>
                <h3 className="mt-2 text-lg leading-snug">{role.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {role.blurb}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    {role.duration} · {role.location}
                  </span>
                  <Link
                    to="/apply"
                    search={{ role: role.title }}
                    className="text-sm font-bold text-brand-blue hover:underline"
                  >
                    Apply →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-panel sm:p-12">
          <h2 className="text-2xl sm:text-3xl">Thank you for visiting our booth!</h2>
          <p className="mt-3 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
            We loved meeting you at NUS Career Fest. Not sure which role fits you best? Apply anyway
            and tell us what you enjoy — our team reads every application and will point you to the
            right one.
          </p>
          <Link
            to="/apply"
            className="mt-7 inline-flex items-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-ink hover:shadow-xl"
          >
            Submit your application
          </Link>
        </div>
      </section>
    </div>
  );
}
