// types
import type {
  DictionaryProps,
  LanguageType,
  TranslatePathType,
} from "@/interfaces/general";

// utils
import handleTranslate from "@utils/handleTranslate";

// i18
import { getDictionary } from "@/i18n/getDictionary";

export default async function useServerTranstaltion(lng: LanguageType) {
  const dict = await getDictionary(lng); // en

  function t(
    path: TranslatePathType<DictionaryProps>,
    values?: { [key: string]: string }
  ): string {
    const value = handleTranslate(dict, path, values);

    return value;
  }

  return { t };
}
