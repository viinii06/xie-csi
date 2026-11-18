import type { Metadata } from "next";

// Local UI previews only: kept out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
