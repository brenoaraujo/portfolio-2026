import { notFound } from "next/navigation";
import { HomeRedesign } from "@/components/content/HomeRedesign";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomeRedesign locale={lang} />;
}
