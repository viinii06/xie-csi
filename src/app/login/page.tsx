import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight } from "@/components/icons";
import { LoginForm } from "@/components/portal/login-form";
import { isNoticeKey, LoginNotice } from "@/components/portal/notice";
import { LoginIntro } from "@/components/portal/login-panel";
import { PortalHeader } from "@/components/portal/portal-header";
import { getActiveMember } from "@/lib/auth/member";
import { isAuthConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Member Login · XIE-CSI",
  robots: { index: false, follow: false },
};

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <>
      <PortalHeader>
        <Link href="/" className="nudge-back link inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium">
          <ArrowRight className="arrow inline-block size-[0.9em] rotate-180" />
          Back to XIE-CSI
        </Link>
      </PortalHeader>
      <main id="main" className="px-gutter flex justify-center pb-20 pt-10 md:pt-16">
        <div className="w-full max-w-[30rem]">
          <LoginIntro />
          {/* The form shows immediately; the session check and any notice stream in. */}
          <Suspense fallback={<LoginForm configured={isAuthConfigured} />}>
            <LoginWithSession searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

async function LoginWithSession({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const params = await searchParams;
  // Members who are already signed in go straight to their dashboard.
  const { member } = await getActiveMember();
  if (member) redirect("/dashboard");

  const key = typeof params.error === "string" ? params.error : params["signed-out"] ? "signed-out" : null;
  const notice = isNoticeKey(key) ? <LoginNotice kind={key} /> : undefined;
  return <LoginForm configured={isAuthConfigured} notice={notice} />;
}
