// components
import AuthPagesLayout from "@components/shared/AuthPagesLayout";

// types
import type { LanguageType } from "@interfaces/general";

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: LanguageType };
}) {
  return <AuthPagesLayout>{children}</AuthPagesLayout>;
}
