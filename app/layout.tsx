import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://currentapartmentseastpeoria.com"),
  title: "The Current Apartments | East Peoria, IL",
  description: "Modern studio, one-bedroom, and two-bedroom apartments on the Illinois River in East Peoria, Illinois. Now pre-leasing Phase One.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "The Current Apartments | East Peoria, IL",
    description: "A river landmark reborn. Modern apartments on the Illinois River in East Peoria, Illinois.",
    siteName: "The Current Apartments",
    images: [{ url: "/assets/hero-aerial.jpg", width: 1620, height: 971, alt: "The Current Apartments above the Illinois River" }],
  },
  twitter: { card: "summary_large_image", title: "The Current Apartments | East Peoria, IL", description: "A river landmark reborn. Now pre-leasing.", images: ["/assets/hero-aerial.jpg"] },
  icons: { icon: "/assets/favicon.png", apple: "/assets/favicon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#06233a" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
