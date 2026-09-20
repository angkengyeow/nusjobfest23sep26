import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { getCvDownloadUrl, listApplications } from "@/lib/dashboard.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Applications dashboard — Skyworks Internships" },
      {
        name: "description",
        content:
          "Review internship applications from NUS Career Fest 2026: filter by course and availability and download candidate CVs.",
      },
      { property: "og:title", content: "Skyworks applications dashboard" },
      {
        property: "og:description",
        content: "Internal review of internship applications and candidate CVs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-ring/25";

function DashboardPage() {
  const navigate = useNavigate();
  const fetchApplications = useServerFn(listApplications);
  const fetchCvUrl = useServerFn(getCvDownloadUrl);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [role, setRole] = useState("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchApplications({}),
  });

  const applications = data?.applications ?? [];

  const courses = useMemo(
    () => [...new Set(applications.map((a) => a.course.trim()))].sort(),
    [applications],
  );
  const availabilities = useMemo(
    () => [...new Set(applications.map((a) => a.availability.trim()))].sort(),
    [applications],
  );
  const roles = useMemo(
    () => [...new Set(applications.map((a) => a.role_applied.trim()))].sort(),
    [applications],
  );

  const filtered = applications.filter((a) => {
    if (course !== "all" && a.course.trim() !== course) return false;
    if (availability !== "all" && a.availability.trim() !== availability) return false;
    if (role !== "all" && a.role_applied.trim() !== role) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const haystack = `${a.full_name} ${a.email} ${a.phone} ${a.course} ${a.availability} ${a.role_applied}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  async function downloadCv(path: string) {
    try {
      const { url } = await fetchCvUrl({ data: { path } });
      window.open(url, "_blank", "noopener");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not download that CV.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (data && !data.allowed) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="text-3xl">No access yet</h1>
        <p className="mt-4 text-muted-foreground">
          Your account isn't marked as part of the recruiting team. Sign in with your
          @skyworksinc.com work email to review applications.
        </p>
        <button onClick={signOut} className="mt-6 text-sm font-medium text-brand-blue hover:underline">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
            Recruiting dashboard
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl">Internship applications</h1>
          <p className="mt-2 text-muted-foreground">
            {isLoading ? "Loading…" : `${filtered.length} of ${applications.length} candidates`}
          </p>
        </div>
        <button onClick={signOut} className="text-sm font-medium text-brand-blue hover:underline">
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-4 border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="text-sm font-medium">Search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, email, phone"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Course</span>
          <select value={course} onChange={(e) => setCourse(e.target.value)} className={fieldClass}>
            <option value="all">All courses</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium">Availability</span>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className={fieldClass}
          >
            <option value="all">Any availability</option>
            {availabilities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium">Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={fieldClass}>
            <option value="all">All roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <p className="mt-8 text-sm text-destructive">
          {error instanceof Error ? error.message : "Could not load applications."}
        </p>
      ) : null}

      {!isLoading && filtered.length === 0 ? (
        <p className="mt-10 border border-dashed border-border p-10 text-center text-muted-foreground">
          No applications match these filters yet.
        </p>
      ) : null}

      <div className="mt-8 space-y-4">
        {filtered.map((a) => (
          <article key={a.id} className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-semibold">{a.full_name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {a.email} · {a.phone}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {new Date(a.created_at).toLocaleDateString("en-SG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {a.cv_path ? (
                  <button
                    onClick={() => downloadCv(a.cv_path!)}
                    className="rounded-sm bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep"
                  >
                    Download CV
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">No CV</span>
                )}
              </div>
            </div>

            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Course</dt>
                <dd className="mt-1">{a.course}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Year</dt>
                <dd className="mt-1">{a.year_of_study ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Availability
                </dt>
                <dd className="mt-1">{a.availability}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Role</dt>
                <dd className="mt-1">{a.role_applied}</dd>
              </div>
            </dl>

            {a.message ? (
              <p className="mt-4 border-l-2 border-brand-green pl-4 text-sm text-muted-foreground">
                {a.message}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
