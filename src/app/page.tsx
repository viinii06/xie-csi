import { About, Contact, Team } from "@/components/about-team-contact";
import { Hero } from "@/components/hero";
import { RepoForge } from "@/components/repoforge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UpcomingEvents } from "@/components/upcoming-event";
import { WhatWeDo } from "@/components/what-we-do";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <UpcomingEvents />
        <RepoForge />
        <WhatWeDo />
        <About />
        <Team />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
