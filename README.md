This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Languages (English + Português)

English is the default and keeps the clean URLs (`/`, `/work/<slug>`). Portuguese lives under `/pt-br`. All pages are in `app/[lang]/`; `proxy.ts` serves English for unprefixed URLs and sends visitors who picked Portuguese back to it.

- **Interface copy:** `lib/i18n/dictionaries/en.ts` (source) and `pt-br.ts`. The build fails if a key is missing in a translation.
- **Case studies:** English in `content/work/<slug>.mdx`, Portuguese in `content/work/pt-br/<slug>.mdx` (same slug, same frontmatter keys). Without a translation, `/pt-br/work/<slug>` shows the English text with a note and stays out of search.
- **Machine-translation notice:** while `language.machineTranslated` is `true` in `pt-br.ts`, Portuguese pages show the "Tradução automática" toast once per session. Set it to `false` after the manual review.
- **Who sees the "Prefere ler em português?" prompt:** `PROMPT_SIGNALS` in `lib/i18n/config.ts` (browser language `pt*` or a visitor from Brazil, no saved choice). The choice is kept in the `ba-lang` cookie.
- `/for/<company>` pages are English only (no switcher, no prompt).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
