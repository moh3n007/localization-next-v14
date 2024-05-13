// config
import APP_CONFIG from "@config/index";

// next.js funcs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import AuthPagesLayout from "@components/shared/AuthPagesLayout";

// styles
import classes from "./layout.module.css";

// types
import type { LanguageType } from "@interfaces/general";

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: LanguageType };
}) {
  const cookie = cookies();
  const token = cookie.get(APP_CONFIG.tokenName)?.value;

  // redirects the user to home page
  // if token is exist
  if (!!token) redirect(`/${lng}`);

  return (
    <main className={classes.main}>
      <AuthPagesLayout>{children}</AuthPagesLayout>
    </main>
  );
}
