// context
import { LanguageContext } from "@/components/LanguageProvider";

// hooks
import { use } from "react";

// types
import type { DictionaryProps, TranslatePathType } from "@/interfaces/general";

// utils
import handleTranslate from "@utils/handleTranslate";

export default function useClientTranstaltion() {
  const dict = use(LanguageContext);

  function t(
    path: TranslatePathType<DictionaryProps>,
    values?: { [key: string]: string }
  ): string {
    const value = handleTranslate(dict, path, values);

    return value;
  }

  return { t };
}
