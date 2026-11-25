import Image from "next/image";
import { about, contact } from "@/content/site";
import { advisoryTeam, committeeYear, coreTeam, posterPages, teams, type Member } from "@/content/team";
import { ArrowRight, ArrowUpRight } from "./icons";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-gutter pt-20 md:pt-28 -scroll-mt-20 md:-scroll-mt-28">
      <div className="grid grid-cols-1 gap-y-4 border-t border-ink pt-5 lg:grid-cols-12 md:gap-x-6">
        <h2
          id="about-title"
          className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] lg:col-span-4 md:text-[2.5rem]"
        >
          About
        </h2>
        <div className="lg:col-span-8">
          <p className="max-w-[44ch] text-[1.375rem] font-medium leading-snug tracking-[-0.02em] md:text-[1.625rem]">
            {about.mission} <span className="text-ink-soft">{about.detail}</span>
          </p>
          <a href="#team" className="nudge link mt-5 inline-flex min-h-11 items-center gap-2 text-lg font-medium">
            Meet the team <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="px-gutter pt-20 md:pt-28 -scroll-mt-20 md:-scroll-mt-28">
      <div className="grid grid-cols-1 gap-y-6 border-t border-ink pt-5 lg:grid-cols-12 md:gap-x-6">
        <h2
          id="team-title"
          className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] lg:col-span-4 md:text-[2.5rem]"
        >
          Team <span className="whitespace-nowrap text-ink-soft">{committeeYear}</span>
        </h2>

        <div className="lg:col-span-8">
          <h3 className="text-[0.9375rem] font-semibold">Core team</h3>
          <h4 className="mt-4 text-[0.8125rem] font-medium text-ink-soft">Faculty</h4>
          <RosterRows members={coreTeam.faculty} className="mt-2" />
          <h4 className="mt-7 text-[0.8125rem] font-medium text-ink-soft">Student office-bearers</h4>
          <RosterRows members={coreTeam.students} className="mt-2" />

          <h3 className="mt-12 text-[0.9375rem] font-semibold">Advisory team</h3>
          <RosterRows members={advisoryTeam} className="mt-3" compact />

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div key={team.name}>
                <h3 className="border-b border-rule pb-2 text-[0.9375rem] font-semibold">{team.name}</h3>
                <ul className="mt-3 space-y-2.5">
                  {team.members.map((m) => (
                    <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className="min-w-0 break-words font-medium">{m.name}</span>
                      <span className="text-[0.875rem] text-ink-soft">{m.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-rule pb-2">
              <h3 className="text-[0.9375rem] font-semibold">Committee poster {committeeYear}</h3>
              <p className="text-[0.875rem] text-ink-soft">Open a page to view it full size</p>
            </div>
            {/* Mobile: a swipeable row of pages. Desktop: all four pages side by side. */}
            <ul className="poster-row -mx-[var(--gutter)] mt-4 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] pb-3 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
              {posterPages.map((page) => (
                <li key={page.src} className="w-[68vw] max-w-[18rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <a
                    href={page.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="poster-thumb relative block aspect-[1414/2000] overflow-hidden bg-paper-deep"
                  >
                    <Image
                      src={page.src}
                      alt={page.alt}
                      fill
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 25vw, 68vw"
                      className="object-cover"
                    />
                    <span className="sr-only">(opens full size in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Ruled name/role rows. Long names and roles wrap onto their own lines instead of colliding.
function RosterRows({ members, className = "", compact = false }: { members: Member[]; className?: string; compact?: boolean }) {
  return (
    <ul className={`grid grid-cols-1 border-t border-rule md:grid-cols-2 md:gap-x-6 ${className}`}>
      {members.map((m) => (
        <li
          key={m.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-rule py-3.5"
        >
          <span
            className={`min-w-0 break-words font-semibold tracking-[-0.015em] ${compact ? "text-lg" : "text-xl"}`}
          >
            {m.name}
          </span>
          <span className="text-[0.9375rem] text-ink-soft">{m.role}</span>
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  const socials = [
    contact.instagram && { label: "Instagram", handle: "@xie.csi", href: contact.instagram },
    contact.linkedin && { label: "LinkedIn", handle: "XIE-CSI", href: contact.linkedin },
  ].filter(Boolean) as { label: string; handle: string; href: string }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-gutter pb-20 pt-20 md:pb-28 md:pt-28 -scroll-mt-20 md:-scroll-mt-28">
      <div className="grid grid-cols-1 gap-y-6 border-t border-ink pt-5 lg:grid-cols-12 md:gap-x-6">
        <h2
          id="contact-title"
          className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] lg:col-span-4 md:text-[2.5rem]"
        >
          Contact
        </h2>
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:col-span-8">
          <address className="text-xl not-italic leading-snug">
            {contact.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nudge link mt-3 inline-flex min-h-11 items-center gap-2 text-lg font-medium"
            >
              Open in Maps <ArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </address>
          <div className="text-lg">
            {socials.length > 0 && (
              <ul aria-label="XIE-CSI on social media" className="border-t border-rule">
                {socials.map((s) => (
                  <li key={s.href} className="border-b border-rule">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nudge group flex min-h-14 items-center justify-between gap-4"
                    >
                      <span>
                        <span className="font-semibold">{s.label}</span>{" "}
                        <span className="text-ink-soft">{s.handle}</span>
                      </span>
                      <ArrowUpRight />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {/* Hidden until a chapter email is set in content/site.ts. */}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="link mt-4 inline-flex min-h-11 items-center font-medium">
                {contact.email}
              </a>
            )}
            <a
              href={contact.csiNational}
              target="_blank"
              rel="noopener noreferrer"
              className="nudge link mt-3 inline-flex min-h-11 items-center gap-2 font-medium"
            >
              Computer Society of India <ArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
