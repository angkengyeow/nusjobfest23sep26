import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { STATUS_LABELS, STATUS_NOTES, statusBadgeClass, type ApplicationStatus } from "@/lib/status";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Check your application status — Skyworks Internships" },
      {
        name: "description",
        content:
          "Enter your email and the reference code from your Skyworks internship application to see your current stage.",
      },
      { property: "og:title", content: "Check your Skyworks internship application status" },
      {
        property: "og:description",
        content: "Look up your application stage with your email and reference code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StatusPage,
});

type StatusResult = {
  role_applied: string;
  status: ApplicationStatus;
  submitted_at: string;
  status_updated_at: string;
};

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-ring/25";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setNotFound(false);
    setFailed(false);

    const { data, error } = await supabase.rpc("get_application_status", {
      _email: email.trim(),
      _reference_code: code.trim(),
    });

    setLoading(false);

    if (error) {
      setFailed(true);
      return;
    }

    const row = (data as StatusResult[] | null)?.[0];
    if (!row) {
      setNotFound(true);
      return;
    }
    setResult(row);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
        Application status
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Check your application</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Enter the email you applied with and the reference code shown when you submitted. Both are
        needed, so no one else can look up your application.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@u.nus.edu"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Reference code</span>
            <input
              required
              minLength={6}
              maxLength={16}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="SKY-XXXXXX"
              className={`${fieldClass} font-mono tracking-widest`}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep disabled:opacity-60"
        >
          {loading ? "Checking…" : "Check status"}
        </button>
      </form>

      {notFound ? (
        <p className="mt-6 border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          We couldn't find an application with that email and reference code. Check both and try
          again.
        </p>
      ) : null}

      {failed ? (
        <p className="mt-6 text-sm text-destructive">
          Something went wrong looking that up. Please try again in a moment.
        </p>
      ) : null}

      {result ? (
        <div className="mt-8 border border-border bg-card p-6 sm:p-8">
          <span className={statusBadgeClass(result.status)}>{STATUS_LABELS[result.status]}</span>
          <h2 className="mt-4 font-display text-2xl font-semibold">{result.role_applied}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{STATUS_NOTES[result.status]}</p>
          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Submitted</dt>
              <dd className="mt-1">{formatDate(result.submitted_at)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Status updated
              </dt>
              <dd className="mt-1">{formatDate(result.status_updated_at)}</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </div>
  );
}
