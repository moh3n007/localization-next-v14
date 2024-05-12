// i18n
import { getDictionary } from "@/i18n/getDictionary";

// types
import type { LanguageType } from "@/interfaces/general";

// utils
import getPageName from "@/src/utils/getPageName";

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

export default async function Home({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const dict = await getDictionary(lng); // en
  return <main>SIGN IN</main>;
}
