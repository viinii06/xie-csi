import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AnnouncementsEmpty, AnnouncementsHeading } from "@/components/portal/announcements";
import { PortalHeader } from "@/components/portal/portal-header";
import { requireMember } from "@/lib/auth/member";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Member Dashboard · XIE-CSI",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <>
      <PortalHeader>
        <Link href="/#events" className="nav-link hidden h-11 items-center px-2.5 text-[0.9375rem] font-medium md:inline-flex">
          Upcoming events
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex h-10 items-center border border-ink/25 px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper md:h-11 md:px-4"
          >
            Sign out
          </button>
        </form>
      </PortalHeader>
      <main id="main" className="px-gutter pb-20 pt-7 md:pt-12">
        <div className="max-w-[56rem]">
          {/* Everything member-specific waits on the server-side membership check. */}
          <Suspense fallback={<p className="text-ink-soft">Checking your membership…</p>}>
            <MemberDashboard />
          </Suspense>
        </div>
      </main>
    </>
  );
}

async function MemberDashboard() {
  const member = await requireMember();
  // Announcements aren't connected to a data source yet, so members see the empty state.
  return (
    <>
      <section aria-labelledby="ann-title">
        <AnnouncementsHeading meta="No updates yet" />
        <AnnouncementsEmpty />
      </section>
      <p className="mt-10 text-[0.875rem] text-ink-soft">
        Signed in as <span className="font-medium text-ink">{member.email}</span>
      </p>
    </>
  );
}
