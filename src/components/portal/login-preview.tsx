"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { loginCopy, type NoticeKey } from "@/content/portal";
import { ArrowRight } from "../icons";
import { SentMessage } from "./login-form";
import { LoginIntro, LoginPanel, type PanelStatus } from "./login-panel";
import { LoginNotice } from "./notice";
import { PreviewBar } from "./preview-bar";
import { Segmented } from "./segmented";

// Panel states plus the notices the real /login shows after a redirect.
type PreviewState = PanelStatus | "expired" | "signed-out";

const states: { value: PreviewState; label: string; short?: string }[] = [
  { value: "idle", label: "Default" },
  { value: "sending", label: "Sending" },
  { value: "sent", label: "Email sent", short: "Sent" },
  { value: "error", label: "Error" },
  { value: "expired", label: "Expired link", short: "Expired" },
  { value: "signed-out", label: "Signed out" },
];

const noticeFor: Partial<Record<PreviewState, NoticeKey>> = { expired: "link", "signed-out": "signed-out" };

const SAMPLE_EMAIL = "yourname@student.xavier.ac.in";
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Design preview of the login screen with simulated states. Nothing is sent: submitting
// waits briefly, then shows "sent" for any well-formed address and the error otherwise.
// All copy comes from content/portal.ts, the same source as the real /login.
export function LoginPreview({ initial = "idle" }: { initial?: "idle" | "signed-out" }) {
  const [state, setState] = useState<PreviewState>(initial);
  const [email, setEmail] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => () => void (timer.current && window.clearTimeout(timer.current)), []);

  const status: PanelStatus = state === "expired" || state === "signed-out" ? "idle" : state;
  const notice = noticeFor[state];

  const forceState = (next: PreviewState) => {
    if (timer.current) window.clearTimeout(timer.current);
    if (next === "error") setEmail("yourname@student");
    else if ((next === "sending" || next === "sent") && !looksLikeEmail(email)) setEmail(SAMPLE_EMAIL);
    setState(next);
  };

  const submit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    timer.current = window.setTimeout(() => setState(looksLikeEmail(email) ? "sent" : "error"), 1400);
  };

  return (
    <>
      <PreviewBar note="simulated, no email is sent">
        <Segmented label="State" options={states} value={state} onChange={forceState} />
      </PreviewBar>

      <main id="main" className="px-gutter flex justify-center pb-20 pt-10 md:pt-16">
        <div className="w-full max-w-[30rem]">
          <LoginIntro />
          <LoginPanel
            status={status}
            email={email}
            onEmailChange={(v) => {
              setEmail(v);
              if (state === "error") setState("idle");
            }}
            onSubmit={submit}
            onReset={() => setState("idle")}
            errorMessage={loginCopy.invalidEmail}
            notice={notice ? <LoginNotice kind={notice} /> : undefined}
            sentMessage={
              <>
                <SentMessage email={email || SAMPLE_EMAIL} />
                <p className="mt-2 text-[0.875rem] text-ink-soft">Simulated: nothing was sent.</p>
              </>
            }
            sentActions={
              <Link
                href="/preview/dashboard"
                className="btn-primary nudge inline-flex min-h-14 items-center justify-between bg-ink px-5 font-semibold text-paper"
              >
                Continue to the dashboard preview
                <ArrowRight />
              </Link>
            }
          />
        </div>
      </main>
    </>
  );
}
