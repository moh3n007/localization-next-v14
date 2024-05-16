// types
import type { LanguageType, UserProps } from "@interfaces/general";

// config
import APP_CONFIG from "@config/index";

// next.js funcs
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import ProtectedPagesLayout from "@components/shared/ProtectedPagesLayout";

// utils
import getUserIdFromtoken from "@utils/getUserIdFromtoken";

// pocketbase
import getUserInServer from "@utils/getUserInServer";

export default async function ProtectedLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>) {
  const cookie = cookies();
  const token = cookie.get(APP_CONFIG.tokenName)?.value;
  const userId = getUserIdFromtoken(token);
  let user: UserProps | undefined = undefined;

  try {
    user = await getUserInServer(userId);
  } catch (error) {}

  // redirects the user to sign-in page
  // if token is not exist
  if (!user?.id) {
    if (process.env.NODE_ENV != "production") {
      console.error("Redirect to login page: User does not exist");
    }
    redirect(`/${lng}/sign-in`);
  }

  return <ProtectedPagesLayout>{children}</ProtectedPagesLayout>;
}
