import { BrandLockup } from "../brand-lockup";

// Compact header for member portal screens: the site's logos, the portal name (from
// small tablets up), and the screen's secondary actions on the right.
export function PortalHeader({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <header className="border-b border-rule bg-paper">
        <div className="px-gutter flex h-[var(--header-h)] items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <BrandLockup href="/" showName={false} />
            <span aria-hidden className="hidden h-10 w-px bg-rule sm:block" />
            <span className="hidden text-[0.9375rem] font-semibold tracking-[-0.01em] sm:block">Member portal</span>
          </div>
          <div className="flex items-center gap-1 md:gap-3">{children}</div>
        </div>
      </header>
    </>
  );
}

// Shared style for the portal's bordered header button (Sign out).
export const portalButton =
  "inline-flex h-11 items-center border border-ink/25 px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper md:px-4";
