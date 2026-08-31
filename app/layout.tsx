import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mapstack — The world’s basemaps, one catalog",
  description: "Explore and compare beautiful basemaps for every GIS workflow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
