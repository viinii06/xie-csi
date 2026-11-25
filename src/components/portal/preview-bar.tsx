// Strip above preview screens that names what is simulated and lets reviewers switch states.
// The controls wrap onto a second row on phones rather than hiding off-screen.
export function PreviewBar({ note, children }: { note: string; children?: React.ReactNode }) {
  return (
    <div className="border-b border-ink/15 bg-paper-deep" role="region" aria-label="Preview controls">
      <div className="px-gutter flex flex-wrap items-center justify-between gap-x-5 py-1 text-[0.875rem]">
        <p className="py-2.5">
          <span className="font-semibold">Preview</span>
          <span className="text-ink-soft"> · {note}</span>
        </p>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
