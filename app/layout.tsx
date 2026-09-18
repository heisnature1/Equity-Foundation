import type { Metadata } from "next";
import { Libre_Baskerville, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const displayFont = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.equitybridgefoundation.org"),
  title: {
    default: "Equity Bridge Foundation",
    template: "%s | Equity Bridge Foundation",
  },
  description:
    "Equity Bridge Foundation works to close the access-to-justice gap for women and underprivileged communities in Ghana through legal aid, advocacy, and public legal education.",
  keywords: [
    "Equity Bridge Foundation",
    "Ghana legal aid",
    "access to justice",
    "human rights advocacy",
    "women's rights",
  ],
  openGraph: {
    title: "Equity Bridge Foundation",
    description:
      "Bridging the Gap Between Rights and Justice.",
    url: "https://www.equitybridgefoundation.org",
    type: "website",
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Equity Bridge Foundation",
    description: "Bridging the Gap Between Rights and Justice.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="site-shell">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
