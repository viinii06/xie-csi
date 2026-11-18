import { nav } from "@/content/site";
import { BrandLockup } from "./brand-lockup";
import { MemberLogin } from "./member-login";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="px-gutter flex h-[var(--header-h)] items-center justify-between gap-6">
        <BrandLockup />

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          <ul className="flex items-center gap-1 text-[0.9375rem] font-medium xl:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link inline-flex h-11 items-center px-2.5">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <MemberLogin />
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
