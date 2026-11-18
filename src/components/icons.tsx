type IconProps = { className?: string };

export function ArrowRight({ className = "arrow inline-block size-[0.9em]" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowDown({ className = "arrow inline-block size-[0.9em]" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M8 2v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "arrow inline-block size-[0.8em]" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CalendarIcon({ className = "inline-block size-[1em]" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <rect x="2" y="3" width="12" height="11" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
