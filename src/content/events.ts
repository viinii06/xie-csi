// Event details shown on the homepage. Edit these values; the layout reads them as-is.
// Leave `registrationUrl` as null until a real registration link exists.
// An event disappears from the page on its own once its last session ends
// (from `calendar`), so add the next one here and nothing else needs changing.

export type UpcomingEvent = {
  slug: string;
  title: string;
  summary: string;
  dateLabel: string;
  /** Compact form used in the hero's "Next up" line. */
  shortDateLabel: string;
  dayLabel: string;
  timeLabel: string;
  venue: string;
  ledBy: string;
  capacity: number;
  registrationUrl: string | null;
  // Used for the downloadable calendar file (times are Asia/Kolkata).
  calendar: {
    firstDay: string; // YYYY-MM-DD
    days: number;
    start: string; // HH:MM, 24h
    end: string; // HH:MM, 24h
  };
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    slug: "dsa-workshop",
    title: "DSA Workshop",
    summary: "Five morning sessions on data structures and algorithms.",
    dateLabel: "23–27 November 2026",
    shortDateLabel: "23–27 Nov",
    dayLabel: "Monday to Friday",
    timeLabel: "10 AM – 12 PM",
    venue: "IPL Lab",
    ledBy: "Saad Ansari",
    capacity: 45,
    registrationUrl: "https://forms.gle/r2P8XxJkwWZxG7A48",
    calendar: {
      firstDay: "2026-11-23",
      days: 5,
      start: "10:00",
      end: "12:00",
    },
  },
];

export const repoForge = {
  name: "RepoForge",
  year: "2026",
  summary: "Our flagship hackathon, run by students for students at XIE.",
  // Set to true once the photos in `site.ts` > images.repoforge are real event coverage.
  // The photo layout adapts to however many photos are listed there (1 or more).
  photosAreReal: false,
};
