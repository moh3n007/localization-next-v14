// i18n
import { getDictionary } from "@/i18n/getDictionary";

// types
import type { LanguageType } from "@interfaces/general";

// utils
import getPageName from "@utils/getPageName";

// dynamic components
const VerifyComponent = dynamic(
  () => import("@components/pagesComponents/authPages/VerifyComponent"),
  {
    ssr: false,
    loading: () => (
      <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
        <Loader />
      </Flex>
    ),
  }
);
import dynamic from "next/dynamic";
import { Flex, Loader } from "@mantine/core";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: LanguageType };
}) {
  const dict = await getDictionary(lng);
  const title = getPageName(dict.auth.verify);

  return {
    title,
  };
}

export default async function SignUp() {
  return <VerifyComponent />;
}
