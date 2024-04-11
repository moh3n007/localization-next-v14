import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { languages } from "@/i18n";
import { LanguageType } from "@/interfaces/general";

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
  return (
    <html lang={lng}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
