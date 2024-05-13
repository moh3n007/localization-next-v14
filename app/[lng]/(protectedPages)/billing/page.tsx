import { getDictionary } from "@/i18n/getDictionary";
import { LanguageType } from "@interfaces/general";
import getPageName from "@utils/getPageName";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const dict = await getDictionary(lng); // en
  const title = `${getPageName(dict.billing.billing)} - ${
    dict.billing.overview
  }`;

  return {
    title,
  };
}

export default async function BillingPage({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  return <h1>Overview</h1>;
}
