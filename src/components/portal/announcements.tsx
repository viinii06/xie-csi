import Link from "next/link";
import type { Announcement } from "@/content/preview";
import { ArrowRight } from "../icons";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// Page heading plus a meta line. On phones the "Upcoming events" link sits here,
// because the header only has room for Sign out.
export function AnnouncementsHeading({ meta }: { meta: string }) {
  return (
    <>
      <h1 id="ann-title" className="text-[2.25rem] font-semibold leading-none tracking-[-0.035em] md:text-[3.25rem]">
        Chapter announcements
      </h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 border-b border-ink pb-2 text-[0.875rem] text-ink-soft">
        <p className="py-2.5">{meta}</p>
        <Link
          href="/#events"
          className="nudge link inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-ink md:hidden"
        >
          Upcoming events <ArrowRight />
        </Link>
      </div>
    </>
  );
}

// Newest post leads at a larger size; older posts follow as a compact dated list.
export function AnnouncementList({ items }: { items: Announcement[] }) {
  const [latest, ...earlier] = [...items].sort((a, b) => b.date.localeCompare(a.date));
  if (!latest) return <AnnouncementsEmpty />;

  return (
    <>
      <article aria-labelledby={`a-${latest.id}`} className="border-b border-rule py-6 md:py-8">
        <p className="text-[0.9375rem] font-semibold text-accent">
          Latest <span className="font-normal text-ink-soft">·</span>{" "}
          <time dateTime={latest.date} className="font-normal tabular-nums text-ink-soft">
            {formatDate(latest.date)}
          </time>
        </p>
        <h2
          id={`a-${latest.id}`}
          className="mt-2 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] [overflow-wrap:anywhere] [text-wrap:pretty] md:text-[2.25rem]"
        >
          {latest.title}
        </h2>
        <p className="mt-3 max-w-[58ch] text-lg leading-relaxed text-ink-soft">{latest.summary}</p>
      </article>

      {earlier.length > 0 && (
        <>
          <h2 className="pt-8 text-[0.9375rem] font-semibold">Earlier</h2>
          <ol className="mt-2 border-t border-rule">
            {earlier.map((a) => (
              <li
                key={a.id}
                className="grid grid-cols-1 gap-y-1 border-b border-rule py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-x-6"
              >
                <time dateTime={a.date} className="text-[0.9375rem] tabular-nums text-ink-soft sm:pt-0.5">
                  {formatDate(a.date)}
                </time>
                <div>
                  <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] [overflow-wrap:anywhere] [text-wrap:pretty]">
                    {a.title}
                  </h3>
                  <p className="mt-1 max-w-[62ch] leading-relaxed text-ink-soft">{a.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}

export function AnnouncementsEmpty() {
  return (
    <div className="py-8 md:py-10">
      <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em]">Nothing posted yet</h2>
      <p className="mt-2 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
        When the committee shares an update, it will appear here first.
      </p>
      <Link
        href="/#events"
        className="nudge mt-6 inline-flex min-h-12 items-center gap-3 border border-ink px-5 font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper"
      >
        See upcoming events
        <ArrowRight />
      </Link>
    </div>
  );
}
