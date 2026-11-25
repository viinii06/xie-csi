"use client";

import { useActionState, useState } from "react";
import { sendSignInLink, type SignInState } from "@/app/login/actions";
import { loginCopy } from "@/content/portal";
import { LoginPanel, type PanelStatus } from "./login-panel";

const initial: SignInState = { status: "idle" };

// The real member login form: sends a one-time sign-in link through the server action.
export function LoginForm({ configured, notice }: { configured: boolean; notice?: React.ReactNode }) {
  const [result, formAction, pending] = useActionState(sendSignInLink, initial);
  const [email, setEmail] = useState("");
  // The result the member dismissed with "Use a different email" or by editing the field.
  const [dismissed, setDismissed] = useState<SignInState | null>(null);

  const current = result === dismissed ? initial : result;
  const status: PanelStatus = pending ? "sending" : current.status;

  return (
    <LoginPanel
      status={status}
      email={email}
      onEmailChange={(v) => {
        setEmail(v);
        if (current.status === "error") setDismissed(result);
      }}
      action={formAction}
      onReset={() => setDismissed(result)}
      errorMessage={current.status === "error" ? current.message : undefined}
      sentMessage={<SentMessage email={current.status === "sent" ? current.email : email} />}
      notice={
        !configured ? (
          <p role="status" className="text-ink-soft">{loginCopy.notConfigured}</p>
        ) : (
          notice
        )
      }
      disabled={!configured}
    />
  );
}

// Same wording on the real and preview screens. It never confirms whether an address is
// on the invite list, so the page can't be used to check who is a member.
export function SentMessage({ email }: { email: string }) {
  const { before, after } = loginCopy.sentBody(email);
  return (
    <p>
      {before}
      <span className="break-all font-semibold">{email}</span>
      {after}
    </p>
  );
}
