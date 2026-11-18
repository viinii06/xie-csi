import type { Metadata } from "next";
import Link from "next/link";
import { DashboardPreview } from "@/components/portal/dashboard-preview";
import { PortalHeader } from "@/components/portal/portal-header";

export const metadata: Metadata = { title: "Member Dashboard (preview) · XIE-CSI" };

export default function DashboardPreviewPage() {
  return (
    <>
      <PortalHeader>
        <Link href="/#events" className="nav-link hidden h-11 items-center px-2.5 text-[0.9375rem] font-medium md:inline-flex">
          Upcoming events
        </Link>
        {/* Simulated: returns to the login preview. */}
        <Link
          href="/preview/login"
          className="inline-flex h-10 items-center border border-ink/25 px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper md:h-11 md:px-4"
        >
          Sign out
        </Link>
      </PortalHeader>
      <DashboardPreview />
    </>
  );
}
