import { upcomingEvents } from "@/content/events";

// Serves /events/<slug>.ics so students can add an event to their calendar.

export function generateStaticParams() {
  return upcomingEvents.map((e) => ({ file: `${e.slug}.ics` }));
}

const stamp = (date: string, time: string) => `${date.replaceAll("-", "")}T${time.replace(":", "")}00`;

export async function GET(_req: Request, ctx: RouteContext<"/events/[file]">) {
  const { file } = await ctx.params;
  const event = upcomingEvents.find((e) => `${e.slug}.ics` === file);
  if (!event) return new Response("Not found", { status: 404 });

  const { firstDay, days, start, end } = event.calendar;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//XIE-CSI//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@xie-csi`,
    `DTSTAMP:${stamp(firstDay, "00:00")}Z`,
    `DTSTART;TZID=Asia/Kolkata:${stamp(firstDay, start)}`,
    `DTEND;TZID=Asia/Kolkata:${stamp(firstDay, end)}`,
    `RRULE:FREQ=DAILY;COUNT=${days}`,
    `SUMMARY:${event.title} (XIE-CSI)`,
    `LOCATION:${event.venue}\\, Xavier Institute of Engineering\\, Mumbai`,
    `DESCRIPTION:${event.summary} Led by ${event.ledBy}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
}
