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
  "signed-out": { tone: "info", text: "You’ve signed out. Sign in again any time with a new link." },
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
