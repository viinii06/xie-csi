"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { MemberLogin } from "./member-login";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      // Keep Tab inside the toggle and the panel while the menu is open.
      if (e.key !== "Tab" || !panelRef.current || !buttonRef.current) return;
      const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-11 items-center gap-2 px-2 text-[0.9375rem] font-medium"
      >
        {open ? "Close" : "Menu"}
        <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none">
          {open ? (
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.6" />
          ) : (
            <path d="M1.5 5h13M1.5 11h13" stroke="currentColor" strokeWidth="1.6" />
          )}
        </svg>
      </button>

      {/* Tapping the dimmed page behind the panel closes the menu. */}
      <div
        aria-hidden
        data-open={open}
        onClick={() => setOpen(false)}
        className="menu-scrim fixed inset-x-0 bottom-0 top-[var(--header-h)] bg-ink/30"
      />

      <div
        id="mobile-menu"
        ref={panelRef}
        data-open={open}
        inert={!open}
        className="menu-panel px-gutter absolute inset-x-0 top-full border-b border-ink bg-paper pb-6"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-rule border-b border-rule">
            {nav.map((item, i) => (
              <li key={item.href} className="menu-item" style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between text-2xl font-semibold tracking-[-0.02em]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5">
          <MemberLogin block />
        </div>
      </div>
    </div>
  );
}
