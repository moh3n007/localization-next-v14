import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { languages } from "@/i18n";
import { LanguageType } from "@/interfaces/general";
import LanguageProvider from "@/components/LanguageProvider";
import { getDictionary } from "@/i18n/getDictionary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Localized App In Next.JS",
  description: "Developed by Mohsen Lotfi",
};

export async function generateStaticParams() {
  return languages;
}

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>) {
  const langJsonPromise = getDictionary(lng);

  return (
    <html lang={lng}>
      <body className={inter.className}>
        <LanguageProvider langJsonPromise={langJsonPromise}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
