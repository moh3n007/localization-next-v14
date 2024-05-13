// types
import type { LanguageType } from "@interfaces/general";

// config
import APP_CONFIG from "@config/index";

// next.js funcs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import ProtectedPagesLayout from "@components/shared/ProtectedPagesLayout";

export default function ProtectedLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>) {
  const cookie = cookies();
  const token = cookie.get(APP_CONFIG.tokenName)?.value;

  // redirects the user to sign-in page
  // if token is not exist
  if (!token) redirect(`/${lng}/sign-in`);

  return <ProtectedPagesLayout>{children}</ProtectedPagesLayout>;
}
