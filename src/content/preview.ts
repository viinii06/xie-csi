// Sample data for the member portal previews (/preview/login, /preview/dashboard).
// None of this is real chapter content. Replace it when announcements come from the committee.

export type Announcement = {
  id: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  summary: string;
};

export const sampleAnnouncements: Announcement[] = [
  {
    id: "dsa-reminder",
    title: "DSA Workshop starts Monday",
    date: "2026-11-18",
    summary: "Sessions run 10 AM to 12 PM in the IPL Lab, 23–27 November. Bring a charged laptop.",
  },
  {
    id: "volunteers",
    title: "Volunteers needed for event setup",
    date: "2026-11-14",
    summary: "Reply in the members group if you can help arrange the lab before the first\u00a0session.",
  },
  {
    id: "repoforge-recap",
    title: "RepoForge 2026 recap coming soon",
    date: "2026-11-06",
    summary: "The documentation team is collecting photos and project links from participants.",
  },
];

// Stress test for the dashboard layout: long titles, long words, long summaries.
export const longSampleAnnouncements: Announcement[] = [
  {
    id: "long-latest",
    title: "Reminder for everyone attending the DSA Workshop next week: bring a charged laptop, your college ID card, and a notebook",
    date: "2026-11-18",
    summary:
      "Sample long announcement. Each session runs 10 AM to 12 PM in the IPL Lab from 23 to 27 November. A longer summary like this one checks that the text keeps a comfortable line length and that nothing overlaps on small phones.",
  },
  {
    id: "long-word",
    title: "Practice folder: DSA-Workshop-2026-Practice-Problems-and-Worked-Solutions",
    date: "2026-11-12",
    summary: "Sample entry with one very long unbroken word, to check wrapping.",
  },
  ...sampleAnnouncements.slice(1),
];

export const sampleMember = {
  name: "Sample Member",
  email: "sample.member@student.xavier.ac.in",
};
