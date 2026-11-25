import fs from "node:fs";
import path from "node:path";
import { brand } from "@/content/site";

const extensions = ["svg", "png", "webp"];

function findLogo(base: string) {
  for (const ext of extensions) {
    const file = path.join(process.cwd(), "public", "brand", `${base}.${ext}`);
    if (fs.existsSync(file)) return `/brand/${base}.${ext}`;
  }
  return null;
}

// Official XIE and CSI logos side by side, then the chapter name. Height is fixed
// and width follows the file, so the original proportions are never distorted.
export function BrandLockup({ href = "#top", showName = true }: { href?: string; showName?: boolean }) {
  const logos = brand.logos.map((logo) => ({ ...logo, src: findLogo(logo.base) }));

  return (
    <a href={href} className="flex min-h-11 items-center gap-3 md:gap-4" aria-label={`${brand.name} home`}>
      {logos.map((logo, i) => (
        <span key={logo.base} className="flex items-center gap-3 md:gap-4">
          {i > 0 && <span aria-hidden className="h-8 w-px bg-rule md:h-10" />}
          {logo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo.src} alt={logo.alt} className={`w-auto ${logo.className}`} />
          ) : (
            <span
              className="wdth-expanded text-[1.0625rem] font-extrabold leading-none tracking-[-0.01em] md:text-xl"
              title={`${logo.alt} logo goes here`}
            >
              {logo.fallback}
            </span>
          )}
        </span>
      ))}
      {showName && (
        <>
          {/* Phones: the chapter name alone. Tablets and wide desktops: name plus full title.
              Narrow desktops hide it so the navigation fits. */}
          <span aria-hidden className="h-8 w-px bg-rule md:h-10 lg:hidden xl:block" />
          <span className="leading-tight lg:hidden xl:block">
            <span className="block text-[0.9375rem] font-semibold tracking-[-0.01em]">{brand.name}</span>
            <span className="hidden text-[0.8125rem] text-ink-soft sm:block">{brand.shortName}</span>
          </span>
        </>
      )}
    </a>
  );
}
