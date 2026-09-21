import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
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

function ApplyPage() {
  const { role } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

    const fullName = String(values.get("fullName") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const phone = String(values.get("phone") ?? "").trim();
    const course = String(values.get("course") ?? "").trim();
    const yearOfStudy = String(values.get("yearOfStudy") ?? "").trim();
    const availability = String(values.get("availability") ?? "").trim();
    const earliestStartDate = String(values.get("earliestStartDate") ?? "").trim();
    const roleApplied = String(values.get("roleApplied") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();

    if (fullName.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (phone.length < 6) {
      toast.error("Please enter your contact number.");
      return;
    }
    if (course.length < 2) {
      toast.error("Please enter your course or major.");
      return;
    }
    if (availability.length < 2) {
      toast.error("Please tell us your availability.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(earliestStartDate)) {
      toast.error("Please pick your earliest start date.");
      return;
    }
    if (roleApplied.length < 2) {
      toast.error("Please choose the role you're applying for.");
      return;
    }

    setSubmitting(true);
    try {
      const safeName = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
      const cvPath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabase.storage.from("cvs").upload(cvPath, cvFile, {
        contentType: cvFile.type || "application/octet-stream",
        upsert: false,
      });
      if (uploadError) {
        console.error(uploadError);
        throw new Error("We couldn't upload your CV. Please try again.");
      }

      const { error: insertError } = await supabase.from("applications").insert({
        full_name: fullName,
        email,
        phone,
        course,
        year_of_study: yearOfStudy || null,
        availability,
        earliest_start_date: earliestStartDate || null,
        role_applied: roleApplied,
        message: message || null,
        cv_path: cvPath,
      });
      if (insertError) {
        console.error(insertError);
        throw new Error("We couldn't save your application. Please try again.");
      }

      setSubmitted(true);
      window.scrollTo(0, 0);

    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="text-3xl sm:text-4xl">Thank you for visiting our booth!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your details and CV are safely with our recruiting team. It was great to meet you at NUS
          Career Fest — if your profile fits one of our openings, we'll email you directly with the
          next steps.
        </p>
        <p className="mt-6 text-muted-foreground">
          In the meantime, feel free to browse the other internships on offer.
        </p>
        <Link
          to="/roles"
          className="mt-6 inline-flex items-center rounded-sm bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep"
        >
          See all internships
        </Link>
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
            <span className={labelClass}>Earliest start date</span>
            <input name="earliestStartDate" type="date" required className={fieldClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Availability</span>
            <input
              name="availability"
              required
              maxLength={150}
              placeholder="6 months, full-time"
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
