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
    date: "2026-11-20",
    summary: "Sessions run 10 AM to 12 PM in the IPL Lab, 23–27 November. Bring a charged laptop.",
  },
  {
    id: "volunteers",
    title: "Volunteers needed for event setup",
    date: "2026-11-14",
    summary: "Reply in the members group if you can help arrange the lab before the first session.",
  },
  {
    id: "repoforge-recap",
    title: "RepoForge 2026 recap coming soon",
    date: "2026-11-06",
    summary: "The documentation team is collecting photos and project links from participants.",
  },
];

export const sampleMember = {
  name: "Sample Member",
  email: "sample.member@college.edu",
};
