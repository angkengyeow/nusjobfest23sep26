import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  year_of_study: string | null;
  availability: string;
  role_applied: string;
  message: string | null;
  cv_path: string | null;
  created_at: string;
};

async function isRecruiter(supabase: {
  rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }>;
}, userId: string) {
  const [recruiter, admin] = await Promise.all([
    supabase.rpc("has_role", { _user_id: userId, _role: "recruiter" }),
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }),
  ]);
  return recruiter.data === true || admin.data === true;
}

export const listApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const allowed = await isRecruiter(supabase as never, userId);
    if (!allowed) {
      return { allowed: false as const, applications: [] as ApplicationRow[] };
    }

    const { data, error } = await supabase
      .from("applications")
      .select(
        "id, full_name, email, phone, course, year_of_study, availability, role_applied, message, cv_path, created_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Could not load applications. Please try again.");
    }

    return { allowed: true as const, applications: (data ?? []) as ApplicationRow[] };
  });

export const getCvDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ path: z.string().min(1).max(500) }).parse(data))
  .handler(async ({ data, context }) => {
    const allowed = await isRecruiter(context.supabase as never, context.userId);
    if (!allowed) {
      throw new Error("You don't have access to candidate CVs.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("cvs")
      .createSignedUrl(data.path, 120, { download: true });

    if (error || !signed?.signedUrl) {
      throw new Error("Could not prepare that CV download.");
    }

    return { url: signed.signedUrl };
  });
