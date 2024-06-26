// i18n
import { getDictionary } from "@/i18n/getDictionary";

// types
import type { LanguageType } from "@interfaces/general";

// components
import SignInComponent from "@components/pagesComponents/authPages/SignInComponent";

// utils
import getPageName from "@utils/getPageName";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const dict = await getDictionary(lng);
  const title = getPageName(dict.auth.sign_in);

  return {
    title,
  };
}

export default async function SignIn() {
  return <SignInComponent />;
}
