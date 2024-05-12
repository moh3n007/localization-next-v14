// i18n
import { getDictionary } from "@/i18n/getDictionary";

// types
import type { LanguageType } from "@interfaces/general";

// components
import RegisterComponent from "@components/pagesComponents/authPages/RegisterComponent";

// utils
import getPageName from "@utils/getPageName";

// styles
import classes from "./page.module.css";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const dict = await getDictionary(lng);
  const title = getPageName(dict.auth.sign_up);

  return {
    title,
  };
}

export default async function SignUp({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const dict = await getDictionary(lng); // en
  return (
    <main className={classes.main}>
      <RegisterComponent />
    </main>
  );
}
