"use client";

import { useActionState, useState } from "react";
import { submitLogin, type LoginState } from "@/app/login/actions";
import { codeCopy, loginCopy } from "@/content/portal";
import { CodeStep, type CodeIntent } from "./code-step";
import { LoginPanel, type PanelStatus } from "./login-panel";

const initial: LoginState = { step: "email" };

// The real member login: email → one-time code → dashboard, through one server action.
// Only one request runs at a time (`pending` covers send, resend and verify).
export function LoginForm({ configured, notice }: { configured: boolean; notice?: React.ReactNode }) {
  const [result, formAction, pending] = useActionState(submitLogin, initial);
  const [email, setEmail] = useState("");
  // The result the member dismissed with "Change email" or by editing the field.
  const [dismissed, setDismissed] = useState<LoginState | null>(null);
  const [intent, setIntent] = useState<"send" | CodeIntent>("send");

  const current = result === dismissed ? initial : result;

  if (current.step === "code") {
    return (
      <CodeStep
        email={current.email}
        error={current.error}
        resent={current.resent}
        attempt={current}
        action={formAction}
        pending={pending}
        pendingIntent={intent === "send" ? null : intent}
        onIntent={setIntent}
        onChangeEmail={() => setDismissed(result)}
      />
    );
  }

  const status: PanelStatus = pending ? "sending" : current.error ? "error" : "idle";

  return (
    <LoginPanel
      status={status}
      email={email}
      onEmailChange={(v) => {
        setEmail(v);
        if (current.error) setDismissed(result);
      }}
      action={formAction}
      onSubmit={() => setIntent("send")}
      onReset={() => setDismissed(result)}
      errorMessage={current.error}
      sentMessage={null}
      copy={codeCopy}
      autoFocus={dismissed !== null}
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

// Used by the login preview. It never confirms whether an address is on the invite
// list, so the page can't be used to check who is a member.
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
