import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(6, "Please enter a contact number").max(30),
  course: z.string().trim().min(2, "Please enter your course or major").max(150),
  yearOfStudy: z.string().trim().max(50).optional().default(""),
  availability: z.string().trim().min(2, "Please tell us when you can start").max(150),
  roleApplied: z.string().trim().min(2).max(150),
  message: z.string().trim().max(1000).optional().default(""),
  cvName: z.string().trim().max(200).optional().default(""),
  cvType: z.string().trim().max(100).optional().default(""),
  cvBase64: z.string().max(9_000_000).optional().default(""),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let cvPath: string | null = null;

    if (data.cvBase64 && data.cvName) {
      const binary = Uint8Array.from(atob(data.cvBase64), (c) => c.charCodeAt(0));
      if (binary.byteLength > 5 * 1024 * 1024) {
        throw new Error("Your CV is larger than 5MB. Please upload a smaller file.");
      }
      const safeName = data.cvName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
      cvPath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("cvs")
        .upload(cvPath, binary, {
          contentType: data.cvType || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        throw new Error("We couldn't upload your CV. Please try again.");
      }
    }

    const { error } = await supabaseAdmin.from("applications").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      course: data.course,
      year_of_study: data.yearOfStudy || null,
      availability: data.availability,
      role_applied: data.roleApplied,
      message: data.message || null,
      cv_path: cvPath,
    });

    if (error) {
      throw new Error("We couldn't save your application. Please try again.");
    }

    return { ok: true as const };
  });
