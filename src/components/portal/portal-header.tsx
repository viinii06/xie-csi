import { BrandLockup } from "../brand-lockup";

// Compact header for member portal screens: the site's logos, the portal name (from
// small tablets up), and the screen's secondary actions on the right.
export function PortalHeader({ children }: { children?: React.ReactNode }) {
  return (
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
  );
}
