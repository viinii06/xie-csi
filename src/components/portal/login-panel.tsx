"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "../icons";

export type PanelStatus = "idle" | "sending" | "sent" | "error";

type Props = {
  status: PanelStatus;
  email: string;
  onEmailChange: (value: string) => void;
  /** Server action (real login) or submit handler (preview). */
  action?: (formData: FormData) => void;
  onSubmit?: (e: { preventDefault(): void }) => void;
  onReset: () => void;
  errorMessage?: string;
  /** Shown under the confirmation heading. */
  sentMessage: React.ReactNode;
  /** Extra actions in the confirmation, e.g. a preview-only link. */
  sentActions?: React.ReactNode;
  /** A notice above the field, e.g. "You've signed out." */
  notice?: React.ReactNode;
  disabled?: boolean;
  /** Wording for the email step. Defaults to the sign-in link wording (used by the preview). */
  copy?: PanelCopy;
  /** Focus the email field on mount, e.g. after "Change email". */
  autoFocus?: boolean;
};

export type PanelCopy = { hint: string; submit: string; sending: string };

const LINK_COPY: PanelCopy = {
  hint: "We’ll email you a one-time link. No password needed.",
  submit: "Send sign-in link",
  sending: "Sending link…",
};

const PLACEHOLDER = "yourname@student.xavier.ac.in";

// The member login panel shared by /login and /preview/login. The form and the "sent"
// confirmation share one grid cell, so switching states never changes the panel's
// height; the hint and the error share one reserved slot, so the button never moves.
export function LoginPanel({
  status,
  email,
  onEmailChange,
  action,
  onSubmit,
  onReset,
  errorMessage,
  sentMessage,
  sentActions,
  notice,
  disabled,
  copy = LINK_COPY,
  autoFocus,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);
  const sending = status === "sending";
  const invalid = status === "error";
  const sent = status === "sent";

  useEffect(() => {
    if (sent) sentRef.current?.focus();
    if (invalid) inputRef.current?.focus();
  }, [sent, invalid]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className="mt-7 grid border border-ink bg-paper md:mt-8">
      <form
        action={action}
        onSubmit={(e) => {
          // One request at a time: ignore Enter or clicks while one is in flight.
          if (sending) return e.preventDefault();
          onSubmit?.(e);
        }}
        noValidate
        aria-busy={sending}
        inert={sent}
        aria-hidden={sent}
        className={`col-start-1 row-start-1 p-5 md:p-7 ${sent ? "invisible" : ""}`}
      >
        {notice && <div className="mb-5 border-b border-rule pb-4 text-[0.9375rem] leading-snug">{notice}</div>}
        <label htmlFor="email" className="block text-[0.9375rem] font-semibold">
          College email
        </label>
        <input
          ref={inputRef}
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          placeholder={PLACEHOLDER}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          readOnly={sending}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby="email-message"
          className="field-box mt-2 block h-14 w-full border bg-paper px-4 text-lg placeholder:text-ink-faint disabled:opacity-60"
        />

        <p
          id="email-message"
          role={invalid ? "alert" : undefined}
          className={`mt-2.5 flex min-h-[3.75rem] gap-2 text-[0.9375rem] leading-snug ${invalid ? "field-error" : "text-ink-soft"}`}
        >
          {invalid && (
            <svg viewBox="0 0 16 16" aria-hidden className="mt-[0.2em] size-4 shrink-0" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 4.5v4.2M8 10.6v.9" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
          <span>{invalid ? errorMessage : copy.hint}</span>
        </p>

        <button
          type="submit"
          disabled={disabled}
          aria-disabled={sending || disabled}
          className="btn-primary mt-3 inline-flex min-h-14 w-full items-center justify-between gap-3 bg-ink px-5 font-semibold text-paper aria-disabled:cursor-progress disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? copy.sending : invalid ? "Try again" : copy.submit}
          {sending ? (
            <span aria-hidden className="spinner size-4 rounded-full border-2 border-paper/40 border-t-paper" />
          ) : (
            <ArrowRight />
          )}
        </button>
        <p aria-live="polite" className="sr-only">
          {sending ? copy.sending : ""}
        </p>
      </form>

      <section
        aria-labelledby="sent-title"
        inert={!sent}
        aria-hidden={!sent}
        className={`col-start-1 row-start-1 flex flex-col p-5 md:p-7 ${sent ? "" : "invisible"}`}
      >
        <h2
          id="sent-title"
          ref={sentRef}
          tabIndex={-1}
          className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] outline-none"
        >
          Check your email
        </h2>
        <div className="mt-2 leading-snug">{sentMessage}</div>
        <div className="mt-auto flex flex-col gap-1 pt-5">
          {sentActions}
          <button type="button" onClick={onReset} className="link min-h-11 self-start font-medium">
            Use a different email
          </button>
        </div>
      </section>
    </div>
  );
}

// Heading and invite-only explanation shared by both login screens.
export function LoginIntro() {
  return (
    <>
      <h1 className="text-[2.25rem] font-semibold leading-none tracking-[-0.035em] md:text-[2.75rem]">Member Login</h1>
      <p className="mt-4 max-w-[38ch] leading-snug text-ink-soft md:text-lg">
        <strong className="font-semibold text-ink">Invite-only.</strong> Sign in with the college email the committee
        added you with. Not invited yet?{" "}
        <Link href="/#team" className="link text-ink">
          Ask a committee member
        </Link>
        .
      </p>
    </>
  );
}
