"use client";

import { useEffect, useRef, useState } from "react";
import { codeCopy } from "@/content/portal";
import { ArrowRight } from "../icons";

/** Supabase lets each address request a new email about once a minute. */
const RESEND_SECONDS = 60;
const MAX_CODE_LENGTH = 10;

export type CodeIntent = "verify" | "resend";

type Props = {
  email: string;
  error?: string;
  resent?: boolean;
  /** Changes on every server response, so focus returns to the field after each attempt. */
  attempt: object;
  action: (formData: FormData) => void;
  pending: boolean;
  pendingIntent: CodeIntent | null;
  onIntent: (intent: CodeIntent) => void;
  onChangeEmail: () => void;
};

// Second step of the member login: type or paste the emailed code. Rendered in the same
// bordered panel as the email step. The code is kept as text so leading zeroes survive.
export function CodeStep({ email, error, resent, attempt, action, pending, pendingIntent, onIntent, onChangeEmail }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const verifying = pending && pendingIntent === "verify";
  const resending = pending && pendingIntent === "resend";
  const invalid = Boolean(error);

  // Focus the field when the step opens and after every response (select it on error
  // so the member can simply retype).
  useEffect(() => {
    inputRef.current?.focus();
    if (invalid) inputRef.current?.select();
  }, [attempt, invalid]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const keepDigits = (v: string) => v.replace(/\D/g, "").slice(0, MAX_CODE_LENGTH);
  const { before, after } = codeCopy.sentBody(email);

  return (
    <div className="mt-7 border border-ink bg-paper md:mt-8">
      <form
        action={action}
        noValidate
        aria-busy={pending}
        aria-labelledby="code-title"
        onSubmit={(e) => {
          // One request at a time: ignore Enter or clicks while one is in flight.
          if (pending) return e.preventDefault();
          const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
          const intent: CodeIntent = submitter?.value === "resend" ? "resend" : "verify";
          if (intent === "resend") {
            if (cooldown > 0) return e.preventDefault();
            setCooldown(RESEND_SECONDS);
            setCode("");
          }
          onIntent(intent);
        }}
        className="p-5 md:p-7"
      >
        <h2 id="code-title" className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em]">
          {codeCopy.heading}
        </h2>
        <p id="code-sent" className="mt-2 leading-snug">
          {before}
          <span className="break-all font-semibold">{email}</span>
          {after}
        </p>

        <input type="hidden" name="email" value={email} />

        <label htmlFor="otp" className="mt-5 block text-[0.9375rem] font-semibold">
          Sign-in code
        </label>
        <input
          ref={inputRef}
          id="otp"
          name="token"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          value={code}
          onChange={(e) => setCode(keepDigits(e.target.value))}
          onPaste={(e) => {
            // Accept pastes like "Your code: 012 345" by keeping only the digits.
            e.preventDefault();
            setCode(keepDigits(e.clipboardData.getData("text")));
          }}
          readOnly={pending}
          aria-invalid={invalid}
          aria-describedby="code-sent code-message"
          className="field-box mt-2 block h-14 w-full border bg-paper px-4 text-xl tabular-nums tracking-[0.3em] placeholder:text-ink-faint"
        />

        <p
          id="code-message"
          role={invalid ? "alert" : resent ? "status" : undefined}
          className={`mt-2.5 flex min-h-[3.75rem] gap-2 text-[0.9375rem] leading-snug ${invalid ? "field-error" : "text-ink-soft"}`}
        >
          {invalid && (
            <svg viewBox="0 0 16 16" aria-hidden className="mt-[0.2em] size-4 shrink-0" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 4.5v4.2M8 10.6v.9" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
          <span>{error ?? (resent ? codeCopy.resentHint : codeCopy.codeHint)}</span>
        </p>

        {/* First submit button, so Enter in the field verifies. */}
        <button
          type="submit"
          name="intent"
          value="verify"
          aria-disabled={pending}
          className="btn-primary mt-3 inline-flex min-h-14 w-full items-center justify-between gap-3 bg-ink px-5 font-semibold text-paper aria-disabled:cursor-progress"
        >
          {verifying ? "Verifying…" : "Verify code"}
          {verifying ? (
            <span aria-hidden className="spinner size-4 rounded-full border-2 border-paper/40 border-t-paper" />
          ) : (
            <ArrowRight />
          )}
        </button>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <button
            type="submit"
            name="intent"
            value="resend"
            formNoValidate
            aria-disabled={pending || cooldown > 0}
            className="link min-h-11 font-medium aria-disabled:cursor-not-allowed aria-disabled:no-underline aria-disabled:opacity-60"
          >
            {resending ? "Sending a new code…" : cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
          </button>
          <button
            type="button"
            onClick={() => !pending && onChangeEmail()}
            aria-disabled={pending}
            className="link min-h-11 font-medium aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
          >
            Change email
          </button>
        </div>

        <p aria-live="polite" className="sr-only">
          {verifying ? "Checking your code." : resending ? "Sending a new code." : ""}
        </p>
      </form>
    </div>
  );
}
