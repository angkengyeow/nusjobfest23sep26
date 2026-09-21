import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  statusBadgeClass,
  type ApplicationStatus,
} from "@/lib/status";


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

type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  year_of_study: string | null;
  availability: string;
  earliest_start_date: string | null;
  role_applied: string;
  message: string | null;
  cv_path: string | null;
  created_at: string;
  status: ApplicationStatus;
};


const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-ring/25";

async function fetchApplications(): Promise<{
  allowed: boolean;
  applications: ApplicationRow[];
}> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { allowed: false, applications: [] };

  const [recruiter, admin] = await Promise.all([
    supabase.rpc("has_role", { _user_id: user.id, _role: "recruiter" }),
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
  ]);
  const allowed = recruiter.data === true || admin.data === true;
  if (!allowed) return { allowed: false, applications: [] };

  const { data, error } = await supabase
    .from("applications")
    .select(
      "id, full_name, email, phone, course, year_of_study, availability, earliest_start_date, role_applied, message, cv_path, created_at, status",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Could not load applications. Please try again.");
  }

  return { allowed: true, applications: (data ?? []) as ApplicationRow[] };
}

function DashboardPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [role, setRole] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
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

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      if (course !== "all" && a.course.trim() !== course) return false;
      if (availability !== "all" && a.availability.trim() !== availability) return false;
      if (role !== "all" && a.role_applied.trim() !== role) return false;
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const haystack = `${a.full_name} ${a.email} ${a.phone} ${a.course} ${a.availability} ${a.role_applied}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [applications, course, availability, role, search, statusFilter]);


  const roles = useMemo(
    () => [...new Set(applications.map((a) => a.role_applied.trim()))].sort(),
    [applications],
  );
  const grouped = useMemo(() => {
    const map = new Map<string, ApplicationRow[]>();
    for (const a of filtered) {
      const key = a.role_applied.trim() || "Unspecified role";
      const list = map.get(key);
      if (list) list.push(a);
      else map.set(key, [a]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  async function downloadCv(path: string) {
    try {
      const { data: signed, error } = await supabase.storage
        .from("cvs")
        .createSignedUrl(path, 120, { download: true });
      if (error || !signed?.signedUrl) {
        throw new Error("Could not prepare that CV download.");
      }
      window.open(signed.signedUrl, "_blank", "noopener");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not download that CV.");
    }
  }

  async function updateStatus(id: string, next: ApplicationStatus) {
    setSavingId(id);
    const { error } = await supabase.from("applications").update({ status: next }).eq("id", id);
    setSavingId(null);
    if (error) {
      toast.error("Could not update that status. Please try again.");
      return;
    }
    toast.success(`Marked as ${STATUS_LABELS[next].toLowerCase()}.`);
    await queryClient.invalidateQueries({ queryKey: ["applications"] });
  }


  async function deleteApplication(a: ApplicationRow) {
    const ok = window.confirm(
      `Delete ${a.full_name}'s application${a.cv_path ? " and their CV" : ""}? This cannot be undone.`,
    );
    if (!ok) return;
    setSavingId(a.id);
    if (a.cv_path) {
      await supabase.storage.from("cvs").remove([a.cv_path]);
    }
    const { error } = await supabase.from("applications").delete().eq("id", a.id);
    setSavingId(null);
    if (error) {
      toast.error("Could not delete that application. Please try again.");
      return;
    }
    toast.success("Application deleted.");
    await queryClient.invalidateQueries({ queryKey: ["applications"] });
  }

  function exportCsv() {
    if (filtered.length === 0) {
      toast.error("There is nothing to export with these filters.");
      return;
    }
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Course",
      "Year of study",
      "Availability",
      "Earliest start",
      "Role",
      "Status",
      "Submitted",
      "Message",
    ];
    const cell = (value: string | null) => `"${(value ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((a) =>
      [
        a.full_name,
        a.email,
        a.phone,
        a.course,
        a.year_of_study,
        a.availability,
        a.earliest_start_date,
        a.role_applied,
        STATUS_LABELS[a.status],
        new Date(a.created_at).toISOString().slice(0, 10),
        a.message,
      ]
        .map(cell)
        .join(","),
    );
    const csv = `\uFEFF${[headers.map(cell).join(","), ...rows].join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `skyworks-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} candidates.`);
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
          @skyworks.com work email to review applications.
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
        <div className="flex items-center gap-4">
          <button
            onClick={exportCsv}
            className="rounded-sm border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue/10"
          >
            Export list (CSV)
          </button>
          <button onClick={signOut} className="text-sm font-medium text-brand-blue hover:underline">
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-5">
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
        <label className="block">
          <span className="text-sm font-medium">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={fieldClass}
          >
            <option value="all">All statuses</option>
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
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

      {grouped.map(([roleName, rows]) => (
        <section key={roleName} className="mt-10">
          <div className="flex items-baseline gap-3 border-b border-border pb-3">
            <h2 className="font-display text-2xl font-semibold">{roleName}</h2>
            <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
              {rows.length} {rows.length === 1 ? "candidate" : "candidates"}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {rows.map((a) => (
              <article key={a.id} className="border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{a.full_name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {a.email} · {a.phone}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(a.created_at).toLocaleDateString("en-SG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className={statusBadgeClass(a.status)}>{STATUS_LABELS[a.status]}</span>
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value as ApplicationStatus)}
                      disabled={savingId === a.id}
                      className="rounded-sm border border-input bg-background px-2 py-2 text-xs outline-none focus:border-brand-blue focus:ring-2 focus:ring-ring/25 disabled:opacity-60"
                      aria-label={`Status for ${a.full_name}`}
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
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
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Earliest start
                    </dt>
                    <dd className="mt-1">
                      {a.earliest_start_date
                        ? new Date(`${a.earliest_start_date}T00:00:00`).toLocaleDateString("en-SG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </dd>
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
        </section>
      ))}
    </div>
  );
}
