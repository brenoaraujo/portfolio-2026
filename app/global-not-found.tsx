import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

// The root layout lives under app/[lang], so unmatched URLs need their own
// page (enabled by experimental.globalNotFound in next.config.ts).
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page not found — Breno Araujo",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-full">
        <main className="not-found">
          <p className="not-found__code">404</p>
          <h1>This page doesn&apos;t exist.</h1>
          <p lang="pt-BR">Esta página não existe.</p>
          <p>
            <Link href="/">Go to the home page</Link> ·{" "}
            <Link href="/pt-br" lang="pt-BR">
              Ir para a página inicial
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
