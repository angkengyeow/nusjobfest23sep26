import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { submitApplication } from "@/lib/applications.functions";
import { internships } from "@/lib/internships";

const searchSchema = z.object({
  role: z.string().optional(),
});

export const Route = createFileRoute("/apply")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Apply — Skyworks Internships at NUS Career Fest 2026" },
      {
        name: "description",
        content:
          "Submit your internship application to Skyworks: your details, course, availability and CV. Takes under five minutes.",
      },
      { property: "og:title", content: "Apply for a Skyworks Internship" },
      {
        property: "og:description",
        content: "Share your details, availability and CV with the Skyworks recruiting team.",
      },
    ],
  }),
  component: ApplyPage,
});

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-ring/25";
const labelClass = "text-sm font-medium text-foreground";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.readAsDataURL(file);
  });
}

function ApplyPage() {
  const { role } = Route.useSearch();
  const send = useServerFn(submitApplication);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    if (!cvFile) {
      toast.error("Please attach your CV before submitting.");
      return;
    }
    if (cvFile.size > 5 * 1024 * 1024) {
      toast.error("Your CV must be 5MB or smaller.");
      return;
    }

    setSubmitting(true);
    try {
      const cvBase64 = await fileToBase64(cvFile);
      await send({
        data: {
          fullName: String(values.get("fullName") ?? ""),
          email: String(values.get("email") ?? ""),
          phone: String(values.get("phone") ?? ""),
          course: String(values.get("course") ?? ""),
          yearOfStudy: String(values.get("yearOfStudy") ?? ""),
          availability: String(values.get("availability") ?? ""),
          roleApplied: String(values.get("roleApplied") ?? ""),
          message: String(values.get("message") ?? ""),
          cvName: cvFile.name,
          cvType: cvFile.type,
          cvBase64,
        },
      });
      setDone(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="text-3xl sm:text-4xl">Application received</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thank you — your details and CV are with our recruiting team. We'll be in touch by email
          after the career fest.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
        Internship application
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Apply for an internship</h1>
      <p className="mt-4 max-w-[58ch] text-lg text-muted-foreground">
        Fill in your details and attach your CV. One submission is all we need — you can mention a
        second role of interest in the message box.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Full name</span>
            <input name="fullName" required maxLength={100} className={fieldClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              name="email"
              type="email"
              required
              maxLength={255}
              placeholder="you@u.nus.edu"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Contact number</span>
            <input
              name="phone"
              type="tel"
              required
              maxLength={30}
              placeholder="+65 9123 4567"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Course / major</span>
            <input
              name="course"
              required
              maxLength={150}
              placeholder="BEng Electrical Engineering"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Year of study</span>
            <select name="yearOfStudy" className={fieldClass} defaultValue="Year 3">
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
              <option>Postgraduate</option>
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Availability / earliest start</span>
            <input
              name="availability"
              required
              maxLength={150}
              placeholder="From May 2026, 6 months"
              className={fieldClass}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>Role of interest</span>
            <select name="roleApplied" className={fieldClass} defaultValue={role ?? internships[0]!.title}>
              {internships.map((item) => (
                <option key={item.slug}>{item.title}</option>
              ))}
              <option>Open to any internship</option>
            </select>
          </label>
        </div>

        <div className="mt-5">
          <span className={labelClass}>Upload CV</span>
          <label className="mt-2 flex cursor-pointer flex-col items-center justify-center border border-dashed border-input bg-secondary px-4 py-8 text-center transition-colors hover:border-brand-blue">
            <span className="text-sm font-semibold text-brand-blue">
              {cvFile ? cvFile.name : "Choose a file"}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              PDF, DOC or DOCX · up to 5MB
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span className={labelClass}>Anything else? (optional)</span>
          <textarea
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="Relevant projects, other roles you're interested in, or questions for us."
            className={`${fieldClass} resize-none`}
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-7 w-full rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit application"}
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Your details and CV are used only for Skyworks internship recruitment.
        </p>
      </form>
    </div>
  );
}
