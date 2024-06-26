// i18n
import { getDictionary } from "@/i18n/getDictionary";

// types
import type { LanguageType } from "@interfaces/general";

// utils
import getPageName from "@utils/getPageName";

// hooks
import useServerTranstaltion from "@/src/hooks/useServerTranstaltion";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const dict = await getDictionary(lng); // en
  const title = getPageName(dict.home.home);

  return {
    title,
  };
}

export default async function Home({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const { t } = await useServerTranstaltion(lng);

  return <h1>Home</h1>;
}
