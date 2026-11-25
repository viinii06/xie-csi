import { contact } from "@/content/site";
import { getScheduledEvents, type ScheduledEvent } from "@/lib/events";
import { ArrowUpRight, CalendarIcon } from "./icons";

export async function UpcomingEvents() {
  const events = await getScheduledEvents();

  return (
    <section id="events" aria-labelledby="events-title" className="px-gutter pt-16 md:pt-24 lg:pt-28 -scroll-mt-16 md:-scroll-mt-24 lg:-scroll-mt-28">
      <div className="grid grid-cols-1 gap-y-6 border-t border-ink pt-5 lg:grid-cols-12 md:gap-x-6">
        <h2
          id="events-title"
          className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] lg:col-span-4 md:text-[2.5rem]"
        >
          Upcoming events
        </h2>

        <div className="space-y-16 lg:col-span-8 md:space-y-20">
          {events.length > 0 ? (
            events.map((event) => <EventRow key={event.slug} event={event} />)
          ) : (
            <NoEvents />
          )}
        </div>
      </div>
    </section>
  );
}

// Shown automatically once every listed event has ended.
function NoEvents() {
  return (
    <div>
      <p className="max-w-[36ch] text-[1.375rem] font-medium leading-snug tracking-[-0.02em] md:text-[1.625rem]">
        The next event hasn’t been announced yet.
      </p>
      {contact.instagram && (
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="nudge link mt-4 inline-flex min-h-11 items-center gap-2 text-lg font-medium"
        >
          Follow @xie.csi for announcements <ArrowUpRight />
          <span className="sr-only">(opens Instagram in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function EventRow({ event }: { event: ScheduledEvent }) {
  const details = [
    { label: "Dates", value: event.dateLabel, note: event.dayLabel },
    { label: "Time", value: event.timeLabel, note: "Daily" },
    { label: "Venue", value: event.venue, note: "XIE campus" },
    { label: "Instructor", value: event.ledBy },
    { label: "Capacity", value: `${event.capacity} seats` },
  ];

  return (
    <article aria-labelledby={`${event.slug}-title`}>
      <h3
        id={`${event.slug}-title`}
        className="text-[clamp(2.75rem,9vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em] [overflow-wrap:anywhere] [text-wrap:balance]"
      >
        {event.title}
      </h3>
      <p className="mt-3 max-w-[48ch] text-lg text-ink-soft">{event.summary}</p>

      {/* Desktop: details on the left, registration beside them. Mobile: details, then a full-width button. */}
      <div className="mt-8 grid grid-cols-1 gap-y-6 border-t border-rule md:grid-cols-[minmax(0,1fr)_17rem] md:gap-x-6">
        <dl className="grid grid-cols-2 sm:grid-cols-3">
          {details.map((d, i) => (
            <div
              key={d.label}
              className={`border-b border-rule py-4 pr-4 ${i === 0 ? "col-span-2 sm:col-span-1" : ""} ${
                i === details.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <dt className="text-[0.8125rem] font-medium text-ink-soft">{d.label}</dt>
              <dd className="mt-1 text-lg font-semibold leading-tight tracking-[-0.01em] tabular-nums md:text-xl">
                {d.value}
                {d.note && <span className="block text-[0.9375rem] font-normal text-ink-soft">{d.note}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-3 md:pt-4">
          {event.registrationUrl ? (
            <>
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary nudge inline-flex min-h-14 w-full items-center justify-between gap-3 bg-ink px-5 py-3 text-base font-semibold leading-tight text-paper"
              >
                Register for the workshop
                <ArrowUpRight />
                <span className="sr-only">(opens a Google Form in a new tab)</span>
              </a>
              <p className="text-[0.875rem] leading-snug text-ink-soft">
                <span className="font-semibold text-accent">{event.startsLabel}.</span> Registration opens a
                Google Form. {event.capacity} seats.
              </p>
            </>
          ) : (
            <p className="text-[0.9375rem] text-ink-soft">Registration link coming soon.</p>
          )}
          <a
            href={`/events/${event.slug}.ics`}
            download
            className="link inline-flex min-h-11 items-center gap-2 self-start font-medium text-accent-ink"
          >
            <CalendarIcon />
            Add to calendar
            <span className="sr-only">(downloads a calendar file)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
