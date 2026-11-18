// Strip above preview screens that names what is simulated and lets reviewers switch states.
// It stays one row on phones; the controls scroll sideways if they don't fit.
export function PreviewBar({ note, children }: { note: string; children?: React.ReactNode }) {
  return (
    <div className="border-b border-ink/15 bg-paper-deep" role="region" aria-label="Preview controls">
      <div className="px-gutter flex items-center justify-between gap-x-5 overflow-x-auto py-1.5 text-[0.875rem] [scrollbar-width:none]">
        <p className="shrink-0 whitespace-nowrap">
          <span className="font-semibold">Preview</span>
          <span className="text-ink-soft max-sm:sr-only"> · {note}</span>
        </p>
        <div className="shrink-0">{children}</div>
      </div>
    </div>
  );
}
