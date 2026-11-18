import Image from "next/image";
import { repoForge } from "@/content/events";
import { images } from "@/content/site";

export function RepoForge() {
  const [lead, ...support] = images.repoforge;

  return (
    <section
      id="repoforge"
      aria-labelledby="repoforge-title"
      className="on-night mt-20 bg-night pb-16 pt-14 text-paper md:mt-28 md:pb-24 md:pt-20"
    >
      <div className="px-gutter grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:items-end md:gap-x-6">
        <h2
          id="repoforge-title"
          className="wdth-expanded text-[clamp(2.5rem,10.5vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] lg:col-span-8"
        >
          {repoForge.name}
          <span className="block text-accent-light">{repoForge.year}</span>
        </h2>
        <p className="max-w-[32ch] text-lg leading-snug text-night-soft lg:col-span-4 lg:justify-self-end lg:pb-2 md:text-xl">
          {repoForge.summary}
        </p>
      </div>

      {/* Full-bleed lead photo: the scroll reveal opens it from an inset frame to the screen edges. */}
      <figure className="rf-lead relative mt-10 aspect-[4/3] overflow-hidden bg-ink-soft md:mt-14 md:aspect-[21/9]">
        <Image
          src={lead.src}
          alt={lead.alt}
          fill
          sizes="100vw"
          className="rf-photo object-cover"
          style={{ objectPosition: lead.focus }}
        />
      </figure>

      <div className="px-gutter">
        <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:gap-6 lg:grid-cols-12">
          {support.map((img, i) => (
            <figure
              key={img.src}
              className={`rf-support relative aspect-[4/5] overflow-hidden bg-ink-soft md:aspect-[3/2] ${
                i === 0 ? "lg:col-span-7" : "rf-support-late lg:col-span-5 lg:mt-24"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 50vw, 50vw"
                className="rf-photo object-cover"
                style={{ objectPosition: img.focus }}
              />
            </figure>
          ))}
        </div>

        {!repoForge.photosAreReal && (
          <p className="mt-5 text-[0.875rem] text-night-soft">
            Placeholder photos from other hackathons. RepoForge 2026 coverage will replace them.
          </p>
        )}
      </div>
    </section>
  );
}
