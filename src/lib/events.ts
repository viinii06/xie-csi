import { cacheLife } from "next/cache";
import { upcomingEvents, type UpcomingEvent } from "@/content/events";

const IST_OFFSET_MIN = 5 * 60 + 30;

/** UTC instant for a wall-clock date and time in Asia/Kolkata. */
export function istToUtc(date: string, time: string, addDays = 0) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d + addDays, hh, mm) - IST_OFFSET_MIN * 60_000);
}

export type EventStatus = "upcoming" | "running";
export type ScheduledEvent = UpcomingEvent & { status: EventStatus; startsLabel: string };

// Events whose last session has ended drop off automatically, so the homepage never
// lists a past event as upcoming. Re-evaluated hourly; no layout edits needed.
export async function getScheduledEvents(): Promise<ScheduledEvent[]> {
  "use cache";
  cacheLife("hours");

  const now = new Date();
  return upcomingEvents
    .map((event) => {
      const { firstDay, days, start, end } = event.calendar;
      const startsAt = istToUtc(firstDay, start);
      const endsAt = istToUtc(firstDay, end, days - 1);
      const status: EventStatus | "past" = now >= endsAt ? "past" : now >= startsAt ? "running" : "upcoming";
      const weekday = startsAt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
      return { ...event, status, startsLabel: status === "running" ? "On now" : `Starts ${weekday}` };
    })
    .filter((e): e is ScheduledEvent => e.status !== "past")
    .sort((a, b) => a.calendar.firstDay.localeCompare(b.calendar.firstDay));
}
