import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { LoginPreview } from "@/components/portal/login-preview";
import { PortalHeader } from "@/components/portal/portal-header";

export const metadata: Metadata = { title: "Member Login (preview) · XIE-CSI" };

export default function LoginPreviewPage() {
  return (
    <>
      <PortalHeader>
        {/* Same place the public site keeps its navigation, so the way back is where people look. */}
        <Link href="/" className="nudge-back link inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium">
          <ArrowRight className="arrow inline-block size-[0.9em] rotate-180" />
          Back to XIE-CSI
        </Link>
      </PortalHeader>
      <LoginPreview />
    </>
  );
}
