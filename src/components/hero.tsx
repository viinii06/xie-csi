import Image from "next/image";
import { Fragment } from "react";
import { hero, images } from "@/content/site";
import { getScheduledEvents } from "@/lib/events";
import { ArrowDown, ArrowRight } from "./icons";

export async function Hero() {
  const words = hero.headline.split(" ");
  const [next] = await getScheduledEvents();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grid grid-cols-1 gap-y-8 pt-8 md:grid-cols-12 md:gap-x-6 md:pt-14 lg:items-center lg:gap-y-0 lg:pt-12"
    >
      <div className="px-gutter flex flex-col justify-center md:col-span-12 lg:col-span-6 lg:pr-0">
        <h1
          id="hero-title"
          className="text-[clamp(3.25rem,12.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em] [text-wrap:balance]"
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              <span className="rise-word" style={{ "--i": i } as React.CSSProperties}>
                {word}
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        <p
          className="fade-in mt-5 max-w-[40ch] text-lg leading-snug text-ink-soft md:mt-8 md:text-[1.375rem]"
          style={{ "--d": "360ms" } as React.CSSProperties}
        >
          {hero.supporting}
        </p>

        <div
          className="fade-in mt-7 flex flex-wrap items-center gap-x-5 gap-y-1 md:mt-10 md:gap-x-6"
          style={{ "--d": "460ms" } as React.CSSProperties}
        >
          <a
            href={hero.primaryAction.href}
            className="btn-primary nudge-down nudge inline-flex h-12 items-center gap-2.5 bg-ink px-4 text-base font-semibold text-paper md:gap-3 md:px-6"
          >
            {hero.primaryAction.label}
            <ArrowDown />
          </a>
          <a
            href={hero.secondaryAction.href}
            className="nudge link inline-flex h-12 items-center gap-2 text-base font-medium"
          >
            {hero.secondaryAction.label}
            <ArrowRight />
          </a>
        </div>

        {next && (
          <a
            href="#events"
            className="next-up fade-in group mt-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-y border-rule py-3.5 md:mt-10"
            style={{ "--d": "560ms" } as React.CSSProperties}
          >
            <span className="min-w-0 leading-snug">
              <span className="block text-[0.8125rem] font-semibold text-accent">
                Next up <span className="font-normal text-ink-soft">·</span> {next.startsLabel}
              </span>
              <span className="font-semibold">{next.title}</span>
              {/* Separators trail the item before them, so a wrapped line never starts with "·". */}
              <span className="text-ink-soft">
                <span className="whitespace-nowrap"> · {next.shortDateLabel} ·</span>{" "}
                <span className="whitespace-nowrap">{next.venue}</span>
              </span>
            </span>
            <ArrowRight className="arrow inline-block size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        )}
      </div>

      <div className="px-gutter md:col-span-12 lg:col-span-6 lg:pl-0 lg:pr-0">
        <figure>
          <div className="reveal-photo relative aspect-[16/10] overflow-hidden bg-paper-deep lg:aspect-[5/4]">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: images.hero.focus }}
            />
          </div>
          {!hero.photoIsReal && (
            <figcaption className="mt-2 text-[0.8125rem] text-ink-soft lg:pr-[var(--gutter)]">
              Placeholder photo from another student hackathon. Credit in the footer.
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
