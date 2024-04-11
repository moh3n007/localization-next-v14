"use client";

import { createContext, FC, PropsWithChildren, use } from "react";
import type DictionaryProps from "@/dictionaries/en.json";

export const LanguageContext = createContext<
  typeof DictionaryProps | undefined
>(undefined);

interface LanguageProviderProps extends PropsWithChildren {
  langJsonPromise: Promise<typeof DictionaryProps>;
}

const LanguageProvider: FC<LanguageProviderProps> = ({
  langJsonPromise,
  children,
}) => {
  const json = use(langJsonPromise);
  return (
    <LanguageContext.Provider value={json}>{children}</LanguageContext.Provider>
  );
};

export default LanguageProvider;
