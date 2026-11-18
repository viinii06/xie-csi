import { whatWeDo } from "@/content/site";

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-title" className="px-gutter pt-20 md:pt-28">
      <div className="grid grid-cols-1 gap-y-6 border-t border-ink pt-5 lg:grid-cols-12 md:gap-x-6">
        <h2
          id="what-title"
          className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] lg:col-span-4 md:text-[2.5rem]"
        >
          What we do
        </h2>
        <ul className="lg:col-span-8">
          {whatWeDo.map((item) => (
            <li
              key={item.title}
              className="grid grid-cols-1 gap-y-1 border-b border-rule py-5 first:pt-0 sm:grid-cols-8 sm:gap-x-6 md:py-6"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:col-span-3 md:text-[1.75rem]">{item.title}</h3>
              <p className="text-lg leading-snug text-ink-soft sm:col-span-5 sm:pt-1">{item.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
