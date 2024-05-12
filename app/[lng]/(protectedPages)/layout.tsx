// types
import type { LanguageType } from "@interfaces/general";

// providers
import LanguageProvider from "@components/LanguageProvider";

// i18n
import { getDictionary } from "@/i18n/getDictionary";

// config
import APP_CONFIG from "@config/index";

// next.js funcs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function ProtectedPagesLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>) {
  const langJsonPromise = getDictionary(lng);

  const cookie = cookies();
  const token = cookie.get(APP_CONFIG.tokenName)?.value;

  // redirects the user to sign-in page
  // if token is not exist
  if (!token) redirect("/sign-in");

  return (
    <LanguageProvider langJsonPromise={langJsonPromise}>
      {children}
    </LanguageProvider>
  );
}
