// types
import type { LanguageType } from "@interfaces/general";

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
import pb from "@/pocketbase";

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

  try {
    await pb.collection("users").getOne(userId);
  } catch (error) {
    // redirects the user to sign-in page
    // if token is not exist
    if (process.env.NODE_ENV != "production") {
      console.error("Redirect User: User does not exist");
    }
    redirect(`/${lng}/sign-in`);
  }

  return <ProtectedPagesLayout>{children}</ProtectedPagesLayout>;
}
