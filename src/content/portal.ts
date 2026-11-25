// Member portal copy shared by the real login (/login) and its preview (/preview/login),
// so the preview always shows exactly what members will read.

export type NoticeKey = "link" | "no-access" | "signed-out";

export const loginNotices: Record<NoticeKey, { tone: "info" | "error"; text: string }> = {
  link: {
    tone: "error",
    text: "That sign-in link has expired or was already used. Enter your email below to get a new one.",
  },
  "no-access": {
    tone: "error",
    text: "That account doesn’t have member access. If you think this is wrong, ask a committee member.",
  },
  "signed-out": { tone: "info", text: "You’ve signed out. Sign in again any time." },
};

export const loginCopy = {
  notConfigured: "Member sign-in isn’t set up yet. Please check back soon.",
  invalidEmail: "Enter your full college email address.",
  sentBody: (email: string) => ({
    before: "If ",
    email,
    after: " is on the invite list, a sign-in link is on its way. Open it from your inbox to sign in.",
  }),
};

// The real /login signs members in with a one-time code typed into the page.
// Like the link wording above, nothing here confirms whether an address is invited.
export const codeCopy = {
  hint: "We’ll email you a one-time code. No password needed.",
  submit: "Send code",
  sending: "Sending code…",
  heading: "Enter your code",
  sentBody: (email: string) => ({
    before: "If ",
    email,
    after: " is on the invite list, we’ve emailed it a sign-in code. It can take a minute to arrive.",
  }),
  codeHint: "Check your inbox and spam folder. Each code works once.",
  resentHint: "We sent a new code. Use the most recent email.",
  invalidFormat: "Enter the full code from your email, numbers only.",
  wrongOrExpired: "That code is wrong or has expired. Check the latest email, or resend a new code.",
  tooManyAttempts: "Too many attempts. Wait a few minutes, then try again.",
  tooManyRequests: "Too many codes requested. Wait a minute before asking for another one.",
  sendFailed: "We couldn’t send a code right now. Try again in a minute.",
  verifyFailed: "We couldn’t check your code right now. Try again in a minute.",
};
