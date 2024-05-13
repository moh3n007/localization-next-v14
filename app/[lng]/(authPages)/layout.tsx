// config
import APP_CONFIG from "@config/index";

// next.js funcs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import AuthBaseComponent from "@components/pagesComponents/authPages/shared/AuthBaseComponent";

// styles
import classes from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies();
  const token = cookie.get(APP_CONFIG.tokenName)?.value;

  // redirects the user to home page
  // if token is exist
  if (!!token) redirect("/");

  return (
    <main className={classes.main}>
      <AuthBaseComponent>{children}</AuthBaseComponent>
    </main>
  );
}
