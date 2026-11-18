import Link from "next/link";
import { memberLoginHref } from "@/content/site";

// Links to the login route once `memberLoginHref` is set; until then it shows a
// clear "Coming soon" state that stays focusable so screen readers announce it.
export function MemberLogin({ block = false }: { block?: boolean }) {
  const base = block
    ? "flex h-14 w-full items-center justify-between border border-ink/25 px-4 text-base"
    : "inline-flex h-11 items-center gap-3 border border-ink/25 pl-4 pr-3.5 text-[0.9375rem]";

  if (memberLoginHref) {
    return (
      <Link
        href={memberLoginHref}
        className={`${base} font-medium transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper`}
      >
        Member Login
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-disabled="true"
      title="Member login is coming soon"
      className={`${base} cursor-not-allowed font-medium text-ink-soft`}
    >
      <span>Member Login</span>
      <span className="flex items-center gap-3 text-[0.8125rem] font-normal">
        <span aria-hidden className="h-4 w-px bg-rule" />
        Coming soon
      </span>
    </button>
  );
}
