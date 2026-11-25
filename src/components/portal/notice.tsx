import { loginNotices, type NoticeKey } from "@/content/portal";

// Notice above the login field. Errors (expired link, no access) carry the danger colour
// and an icon, so they never read like the neutral "signed out" confirmation.
export function LoginNotice({ kind }: { kind: NoticeKey }) {
  const { tone, text } = loginNotices[kind];
  return (
    <p role={tone === "error" ? "alert" : "status"} className={`flex gap-2 ${tone === "error" ? "field-error" : ""}`}>
      {tone === "error" && (
        <svg viewBox="0 0 16 16" aria-hidden className="mt-[0.2em] size-4 shrink-0" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 4.5v4.2M8 10.6v.9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
      <span>{text}</span>
    </p>
  );
}

export const isNoticeKey = (v: unknown): v is NoticeKey => typeof v === "string" && v in loginNotices;
