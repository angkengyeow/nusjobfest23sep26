import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy notice — Skyworks Internships at NUS Career Fest 2026" },
      {
        name: "description",
        content:
          "How Skyworks collects, uses, stores and deletes the details and CVs submitted by students at NUS Career Fest 2026.",
      },
      { property: "og:title", content: "Privacy notice — Skyworks internship applications" },
      {
        property: "og:description",
        content:
          "Purpose, access, retention period and your rights under Singapore's Personal Data Protection Act.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const h2 = "mt-10 text-xl font-semibold";
const p = "mt-3 text-muted-foreground";

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
        Personal Data Protection Act
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Privacy notice</h1>
      <div className="section-bar mt-4" aria-hidden="true" />
      <p className="mt-5 max-w-[62ch] text-lg text-muted-foreground">
        This notice explains what Skyworks collects when you apply for an internship through this
        site, why we collect it, who can see it and how long we keep it.
      </p>

      <h2 className={h2}>What we collect</h2>
      <p className={p}>
        Your name, email address, contact number, course or major, year of study, availability,
        earliest start date, the role you are interested in, your CV, and any message you choose to
        add.
      </p>

      <h2 className={h2}>Why we collect it</h2>
      <p className={p}>
        Only to assess your suitability for a Skyworks internship and to contact you about internship
        opportunities. We do not use your details for marketing and we do not sell or share them with
        third parties.
      </p>

      <h2 className={h2}>Who can see it</h2>
      <p className={p}>
        Only members of the Skyworks recruiting team signed in with a Skyworks work email account.
        Submissions are stored privately and are not visible to other students or to the public.
      </p>

      <h2 className={h2}>How long we keep it</h2>
      <p className={p}>
        We keep your application and CV for up to 12 months after NUS Career Fest 2026, after which
        they are deleted. If you are invited into a formal hiring process, your details are
        transferred to our recruitment system and retained under that system's policy.
      </p>

      <h2 className={h2}>Your choices</h2>
      <p className={p}>
        You may ask us to access, correct or delete your application at any time, or withdraw your
        consent. Email us and we will act on your request and delete your CV from our storage.
      </p>

      <h2 className={h2}>Contact</h2>
      <p className={p}>
        Skyworks Solutions recruiting team, Singapore — reach us at the email address on the business
        card you received at our booth, or speak to any of our booth ambassadors.
      </p>

      <Link
        to="/apply"
        className="mt-10 inline-flex items-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-ink hover:shadow-xl"
      >
        Back to the application form
      </Link>
    </div>
  );
}
