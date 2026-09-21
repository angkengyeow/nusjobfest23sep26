export const APPLICATION_STATUSES = [
  "new",
  "shortlisted",
  "interviewed",
  "rejected",
  "hired",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "New",
  shortlisted: "Shortlisted",
  interviewed: "Interviewed",
  rejected: "Not selected",
  hired: "Hired",
};

export const STATUS_NOTES: Record<ApplicationStatus, string> = {
  new: "Your application has been received and is waiting to be reviewed by our recruiting team.",
  shortlisted: "You've been shortlisted. Our team will reach out about next steps.",
  interviewed: "Your interview is recorded. We're finalising decisions and will update you soon.",
  rejected:
    "We won't be moving forward with this application. Thank you for your interest in Skyworks — do apply again for future intakes.",
  hired: "Congratulations — you've been selected. Our team will contact you with the details.",
};

const badgeStyles: Record<ApplicationStatus, string> = {
  new: "bg-secondary text-muted-foreground",
  shortlisted: "bg-brand-blue/10 text-brand-blue",
  interviewed: "bg-brand-blue/15 text-brand-blue-deep",
  rejected: "bg-destructive/10 text-destructive",
  hired: "bg-brand-green/15 text-brand-green-deep",
};

export function statusBadgeClass(status: ApplicationStatus) {
  return `inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`;
}

const CODE_ALPHABET = "ACDEFGHJKLMNPQRTUVWXY34679";

export function generateReferenceCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return `SKY-${out}`;
}
