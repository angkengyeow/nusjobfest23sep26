import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Recruiter sign in — Skyworks NUS Career Fest 2026" },
      {
        name: "description",
        content:
          "Skyworks recruiting team sign in to review internship applications submitted at NUS Career Fest 2026.",
      },
      { property: "og:title", content: "Skyworks recruiter sign in" },
      {
        property: "og:description",
        content: "Internal sign in for the Skyworks internship recruiting team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-secondary px-3.5 py-2.5 text-sm outline-none transition-all focus:border-brand-blue focus:bg-card focus:ring-2 focus:ring-brand-blue/20";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}dashboard`,
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your inbox to confirm your email, then sign in.");
          setMode("signin");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
        Recruiting team
      </p>
      <h1 className="mt-4 text-3xl sm:text-4xl">
        {mode === "signin" ? "Sign in" : "Create your account"}
      </h1>
      <div className="section-bar mt-4" aria-hidden="true" />
      <p className="mt-3 text-muted-foreground">
        For Skyworks staff only. Use your @skyworks.com work email to get access to candidate
        submissions.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-border bg-card p-7 shadow-panel">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Work email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@skyworks.com"
            className={fieldClass}
          />
        </label>
        <label className="mt-5 block">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Password</span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="mt-7 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue-deep disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-5 text-sm font-medium text-brand-blue hover:underline"
      >
        {mode === "signin" ? "No account yet? Create one" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
