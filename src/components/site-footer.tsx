import { brand, images } from "@/content/site";

export function SiteFooter() {
  const credits = [images.hero, ...images.repoforge].flatMap((img) => (img.credit ? [img.credit] : []));

  return (
    <footer className="px-gutter border-t border-rule py-10 text-[0.875rem] text-ink-soft">
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-6">
        <p className="md:col-span-4">
          <span className="font-semibold text-ink">{brand.name}</span>
          <br />
          {brand.longName}
        </p>
        {credits.length > 0 && (
          <div className="md:col-span-8">
            <p>Placeholder photos via Wikimedia Commons:</p>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {credits.map((c) => (
                <li key={c.source}>
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="link">
                    {c.author}
                  </a>{" "}
                  ({c.license})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
