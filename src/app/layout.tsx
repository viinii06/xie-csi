import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "XIE-CSI · CSI Student Chapter, Xavier Institute of Engineering",
  description:
    "Hackathons, hands-on workshops, and student-led tech at Xavier Institute of Engineering, Mumbai.",
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${archivo.variable} antialiased`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
