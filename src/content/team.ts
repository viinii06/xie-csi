// XIE-CSI Committee 2026–27. Source: the official committee poster (four pages:
// Core Team, Advisory Team, Team Members, Members). Names are spelled as printed,
// except where the chapter confirmed a correction (noted inline).

export type Member = { name: string; role: string };
export type Team = { name: string; members: Member[] };

export const committeeYear = "2026–27";

export const coreTeam = {
  faculty: [
    // Poster prints "Joytsna"; spelling confirmed by the chapter.
    { name: "Ms. Jyotsna More", role: "Convener" },
    { name: "Ms. Nilambari Narkar", role: "Co-ordinator" },
    { name: "Mr. Omprakash Yadav", role: "Treasurer" },
  ],
  students: [
    { name: "Soham Bagal", role: "President" },
    { name: "Harsh Kadam", role: "Joint President" },
    { name: "Vignesh Pardeshi", role: "Vice President" },
    { name: "Amogh Sawant", role: "Secretary" },
    { name: "Unnati Gupta", role: "Joint Secretary" },
    { name: "Kesar Parab", role: "Student Treasurer" },
    { name: "Marisa Menezes", role: "Joint Student Treasurer" },
  ],
} satisfies { faculty: Member[]; students: Member[] };

export const advisoryTeam: Member[] = [
  // Listed on the poster's Core Team page; placed with the advisory team at the chapter's request.
  { name: "Sarvesh Dabholkar", role: "General Advisor" },
  { name: "Jay Kshirsagar", role: "Secretary Advisor" },
  { name: "Aniruddha Kule", role: "Treasury Advisor" },
  { name: "Dinesh Suthar", role: "Technical Advisor" },
  { name: "Cynthia Ferrao", role: "Publicity Advisor" },
  { name: "Rebecca Celine Sam", role: "Event Management Advisor" },
  // Poster prints "Docmention Advisor"; shown here with the corrected spelling.
  { name: "Shravni Bandodkar", role: "Documentation Advisor" },
  { name: "Muthusam Thevar", role: "Graphics Advisor" },
  { name: "Prisha Pereira", role: "Member Advisor" },
];

export const teams: Team[] = [
  {
    name: "Technical",
    members: [
      { name: "Gargi Birwatkar", role: "Technical Head" },
      { name: "Shaurya Chavan", role: "Asst. Technical Head" },
      { name: "Atul George", role: "Technical Member" },
    ],
  },
  {
    name: "Event Management",
    members: [
      { name: "Alakshya Salvi", role: "Event Manager" },
      // Poster role text is partly covered by the photo ("Event Manager Memb…").
      { name: "Nitesh Yadav", role: "Event Manager Member" },
      { name: "Somsree Das", role: "Event Manager Member" },
    ],
  },
  {
    name: "Documentation",
    members: [
      // Poster prints "Document-aion Head"; shown here with the corrected spelling.
      { name: "Keiyona Rodrigues", role: "Documentation Head" },
      { name: "Palakh Negi", role: "Asst. Documentation Head" },
    ],
  },
  {
    name: "Publicity",
    members: [
      { name: "Akanksha Thorat", role: "Publicity Head" },
      // Poster role text is partly covered by the photo ("Asst. Publicity Hea…").
      { name: "Nivedhithaa S", role: "Asst. Publicity Head" },
      { name: "Vaishnavi Talla", role: "Publicity Member" },
      // Poster prints "Shaysha"; spelling confirmed by the chapter.
      { name: "Shlaysha Gupta", role: "Publicity Member" },
    ],
  },
  {
    name: "Graphics",
    members: [
      { name: "Omkar Mohite", role: "Graphics Head" },
      { name: "Niranjan Sanakar", role: "Asst. Graphics Head" },
      { name: "Suyog More", role: "Graphics Member" },
    ],
  },
  {
    name: "Members",
    members: [
      { name: "Maryam Shaikh", role: "Member" },
      { name: "Latika Vispute", role: "Member" },
      { name: "Denisha Arulraj", role: "Member" },
      { name: "Kamesh Gohane", role: "Member" },
    ],
  },
];

// Poster pages, shown as small secondary images under the roster.
export const posterPages = [
  { src: "/team/committee-2026-27-core.jpg", alt: "XIE-CSI Committee 2026–27 poster: Core Team" },
  { src: "/team/committee-2026-27-advisory.jpg", alt: "XIE-CSI Committee 2026–27 poster: Advisory Team" },
  { src: "/team/committee-2026-27-team.jpg", alt: "XIE-CSI Committee 2026–27 poster: Team Members" },
  { src: "/team/committee-2026-27-members.jpg", alt: "XIE-CSI Committee 2026–27 poster: Members" },
];
