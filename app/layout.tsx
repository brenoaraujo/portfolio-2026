import type { Metadata } from "next";
import { Noto_Serif, DM_Sans, DM_Mono } from "next/font/google";
import { Amplitude } from "@/components/analytics/Amplitude";
import "./globals.css";

// Noto Serif carries voice; DM Sans carries information; DM Mono is present in
// the source file but unused inside the Handoff frames.
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-2026-one-steel.vercel.app"),
  title: "Breno Araujo — Product designer",
  description:
    "I'm a product designer based in Vancouver. I listen first, gather context, then prototype quickly to reduce ambiguity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${dmSans.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full">
        <Amplitude />
        {children}
      </body>
    </html>
  );
}
