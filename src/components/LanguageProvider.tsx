"use client";

import { createContext, type FC, type PropsWithChildren, use } from "react";
import type DictionaryProps from "@/dictionaries/en.json";
import type { LanguageType } from "@interfaces/general";

export const LanguageContext = createContext<{
  dict?: typeof DictionaryProps;
  lng?: LanguageType;
}>({});

interface LanguageProviderProps extends PropsWithChildren {
  langJsonPromise: Promise<typeof DictionaryProps>;
  lng: LanguageType;
}

const LanguageProvider: FC<LanguageProviderProps> = ({
  langJsonPromise,
  lng,
  children,
}) => {
  const json = use(langJsonPromise);

  console.log({ lng });

  return (
    <LanguageContext.Provider value={{ dict: json, lng }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
