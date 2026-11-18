"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "../icons";
import { LoginIntro, LoginPanel, type PanelStatus } from "./login-panel";
import { PreviewBar } from "./preview-bar";
import { Segmented } from "./segmented";

const states: { value: PanelStatus; label: string; short?: string }[] = [
  { value: "idle", label: "Default" },
  { value: "sending", label: "Sending" },
  { value: "sent", label: "Email sent", short: "Sent" },
  { value: "error", label: "Error" },
];

const SAMPLE_EMAIL = "yourname@student.xavier.ac.in";
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Design preview of the login screen with simulated states. Nothing is sent: submitting
// waits briefly, and an invalid address (or one containing "error") shows the error state.
export function LoginPreview() {
  const [status, setStatus] = useState<PanelStatus>("idle");
  const [email, setEmail] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => () => void (timer.current && window.clearTimeout(timer.current)), []);

  const forceState = (next: PanelStatus) => {
    if (timer.current) window.clearTimeout(timer.current);
    if (next !== "idle" && !email) setEmail(next === "error" ? "not-an-invite@example" : SAMPLE_EMAIL);
    setStatus(next);
  };

  const submit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    timer.current = window.setTimeout(() => {
      setStatus(looksLikeEmail(email) && !/error/i.test(email) ? "sent" : "error");
    }, 1400);
  };

  return (
    <>
      <PreviewBar note="simulated, no email is sent">
        <Segmented label="State" options={states} value={status} onChange={forceState} />
      </PreviewBar>

      <main id="main" className="px-gutter flex justify-center pb-20 pt-10 md:pt-16">
        <div className="w-full max-w-[30rem]">
          <LoginIntro />
          <LoginPanel
            status={status}
            email={email}
            onEmailChange={(v) => {
              setEmail(v);
              if (status === "error") setStatus("idle");
            }}
            onSubmit={submit}
            onReset={() => setStatus("idle")}
            errorMessage="That address isn’t on the invite list. Check the spelling, or ask a committee member to add you."
            sentMessage={
              <>
                <p>
                  Sign-in link sent to <span className="break-all font-semibold">{email || SAMPLE_EMAIL}</span>.
                </p>
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
