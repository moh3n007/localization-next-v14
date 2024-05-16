// config
import APP_CONFIG from "@config/index";

// next.js funcs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// styles
import classes from "./layout.module.css";

// types
import type { LanguageType, UserProps } from "@interfaces/general";

// utils
import getUserIdFromtoken from "@utils/getUserIdFromtoken";
import getUserInServer from "@utils/getUserInServer";

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

  let user: UserProps | undefined = undefined;

  try {
    user = await getUserInServer(userId);
  } catch (error) {}

  // redirects the user to home page
  // if token is exist
  if (!!user?.id) {
    if (process.env.NODE_ENV != "production") {
      console.error("Redirect to home page: User exist");
    }
    redirect(`/${lng}`);
  }

  return <main className={classes.main}>{children}</main>;
}
