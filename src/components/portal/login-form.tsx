"use client";

import { useActionState, useState } from "react";
import { sendSignInLink, type SignInState } from "@/app/login/actions";
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
      sentMessage={
        <p>
          If <span className="break-all font-semibold">{current.status === "sent" ? current.email : email}</span> is on the
          invite list, a sign-in link is on its way. Open it from your inbox to sign in.
        </p>
      }
      notice={
        !configured ? (
          <p className="text-ink-soft">Member sign-in isn’t set up yet. Please check back soon.</p>
        ) : (
          notice
        )
      }
      disabled={!configured}
    />
  );
}
