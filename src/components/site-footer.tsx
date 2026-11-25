import Link from "next/link";
import { brand, contact, images, memberLoginHref } from "@/content/site";
import { ArrowUpRight } from "./icons";

export function SiteFooter() {
  const credits = [images.hero, ...images.repoforge].flatMap((img) => (img.credit ? [img.credit] : []));
  const socials = [
    contact.instagram && { label: "Instagram", href: contact.instagram },
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="px-gutter border-t border-rule py-10 text-[0.875rem] text-ink-soft">
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-4">
          <p>
            <span className="font-semibold text-ink">{brand.name}</span>
            <br />
            {brand.longName}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 text-[0.9375rem] font-medium text-ink">
            {socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="nudge link inline-flex min-h-11 items-center gap-1.5">
                  {s.label} <ArrowUpRight />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
            {memberLoginHref && (
              <li>
                <Link href={memberLoginHref} className="link inline-flex min-h-11 items-center">
                  Member Login
                </Link>
              </li>
            )}
            <li>
              <a href="#top" className="link inline-flex min-h-11 items-center">
                Back to top
              </a>
            </li>
          </ul>
        </div>
        {credits.length > 0 && (
          <div className="md:col-span-8">
            <p>Placeholder photos via Wikimedia Commons:</p>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {credits.map((c) => (
                <li key={c.source}>
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="link">
                    {c.author}
                  </a>{" "}
                  ({c.license})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
