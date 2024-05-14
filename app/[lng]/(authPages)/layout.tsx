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

// utils
import getUserIdFromtoken from "@utils/getUserIdFromtoken";

// pocketbase
import pb from "@/pocketbase";

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: LanguageType };
}) {
  const cookie = cookies();
  const token = cookie.get(APP_CONFIG.tokenName)?.value;
  const userId = getUserIdFromtoken(token);

  // redirects the user to home page
  // if token is exist
  try {
    const user = await pb.collection("users").getOne(userId);
    if (process.env.NODE_ENV != "production") {
      console.error("Redirect User: User exist");
    }
    if (!!user.id) redirect(`/${lng}`);
  } catch (error) {}

  return (
    <main className={classes.main}>
      <AuthPagesLayout>{children}</AuthPagesLayout>
    </main>
  );
}
