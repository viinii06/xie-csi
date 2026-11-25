// Site-wide copy, links, logos, and image slots.
// To swap a photo: replace the file at `src` (or point `src` at a new file) and update `alt`.
// Crops stay stable because each slot has a fixed aspect ratio and a focal point.

export type ImageSlot = {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "50% 40%". Moves the crop without changing the frame. */
  focus: string;
  /** Attribution for licensed placeholder photos. Set to null for your own photos. */
  credit: { author: string; license: string; source: string } | null;
};

export const brand = {
  // Drop the official files into public/brand/ using these base names.
  // Any of .svg, .png, or .webp is picked up automatically; until then a text lockup shows.
  // `className` sets each logo's rendered height. The CSI seal sits a little taller so
  // its round outline balances the heavier XIE mark.
  logos: [
    { base: "xie-logo", alt: "Xavier Institute of Engineering", fallback: "XIE", className: "h-9 md:h-11" },
    { base: "csi-logo", alt: "Computer Society of India", fallback: "CSI", className: "h-10 md:h-12" },
  ],
  name: "XIE-CSI",
  shortName: "Computer Society of India Student Chapter",
  longName: "CSI Student Chapter, Xavier Institute of Engineering",
};

export const nav = [
  { label: "Events", href: "#events" },
  { label: "RepoForge", href: "#repoforge" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

// Member Login in the header and mobile menu. Set to null to show "Coming soon" instead.
export const memberLoginHref: string | null = "/login";

export const hero = {
  headline: "Build together at XIE.",
  // Names the chapter on the first screen, where the header lockup is compact on phones.
  supporting:
    "The Computer Society of India student chapter at Xavier Institute of Engineering, Mumbai. Hackathons, hands-on workshops, and tech talks, run by students.",
  primaryAction: { label: "Explore Events", href: "#events" },
  // Says where it goes: the past-events highlight, not a vague "highlights".
  secondaryAction: { label: "See RepoForge 2026", href: "#repoforge" },
  // Set to true once images.hero is a real XIE-CSI photo.
  photoIsReal: false,
};

export const images = {
  hero: {
    src: "/events/placeholders/hero-students-laptop.jpg",
    alt: "Two students smiling while working together at a laptop",
    focus: "58% 35%",
    credit: {
      author: "ragesoss",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Pratyush_and_Ujjwal,_Wikimedia_Hackathon_2019.jpg",
    },
  },
  repoforge: [
    {
      src: "/events/placeholders/repoforge-lead.jpg",
      alt: "Students gathered around laptops at a long table during a coding session",
      focus: "50% 55%",
      credit: {
        author: "Jnanaranjan sahu",
        license: "CC BY 4.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Indic_Wikimedia_Hackathon_Hyderabad_2026_Hacking_%26_Presentations_05.jpg",
      },
    },
    {
      src: "/events/placeholders/repoforge-support-1.jpg",
      alt: "A small team leaning in to look at one laptop screen",
      focus: "50% 45%",
      credit: {
        author: "DERDAKI ILIAS",
        license: "CC BY-SA 4.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Wikimedia_Morocco_Mini-Hackathon_2026_day_1_-_Group_collaborating_on_laptops_in_a_meeting_room_-_0021.jpg",
      },
    },
    {
      src: "/events/placeholders/repoforge-support-2.jpg",
      alt: "Students discussing work on a laptop while a teammate looks on",
      focus: "40% 50%",
      credit: {
        author: "Jnanaranjan sahu",
        license: "CC BY 4.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Indic_Wikimedia_Hackathon_Hyderabad_2026_Hacking_%26_Presentations_16.jpg",
      },
    },
  ],
} satisfies { hero: ImageSlot; repoforge: ImageSlot[] };

export const whatWeDo = [
  {
    title: "Hackathons",
    line: "Team builds like RepoForge: pick a problem, make something that works, and present it.",
  },
  {
    title: "Workshops",
    line: "Hands-on lab sessions, like the five-day DSA Workshop in the IPL Lab.",
  },
  {
    title: "Tech talks",
    line: "Short talks and live demos on the tools and ideas shaping computing.",
  },
];

export const about = {
  mission:
    "XIE-CSI is the Computer Society of India student chapter at Xavier Institute of Engineering. We run the events where students learn by building.",
  detail:
    "The chapter is student-led and part of the Computer Society of India, the national body for computing professionals founded in 1965.",
};

export const contact = {
  address: ["Xavier Institute of Engineering", "Mahim Causeway, Mahim (West)", "Mumbai 400016"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Xavier+Institute+of+Engineering+Mahim+Mumbai",
  // Empty values are hidden on the page.
  email: null as string | null,
  instagram: "https://www.instagram.com/xie.csi/" as string | null,
  linkedin: "https://www.linkedin.com/company/xie-csi/home/" as string | null,
  csiNational: "https://www.csi-india.org/",
};
