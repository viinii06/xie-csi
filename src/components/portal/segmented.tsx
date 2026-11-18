"use client";

// Small toggle group for preview controls. Each option is a pressed/unpressed button.
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; short?: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1 whitespace-nowrap">
      <span aria-hidden className="mr-1 hidden text-ink-soft md:inline">
        {label}:
      </span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className="min-h-9 border border-transparent px-2.5 font-medium transition-colors duration-150 hover:border-ink/30 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
        >
          {o.short ? (
            <>
              <span className="sm:hidden" aria-hidden>
                {o.short}
              </span>
              <span className="max-sm:sr-only">{o.label}</span>
            </>
          ) : (
            o.label
          )}
        </button>
      ))}
    </div>
  );
}
