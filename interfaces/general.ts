import type _DictionaryProps from "@/dictionaries/en.json";

export type LanguageType = "en" | "de";

export type TranslatePathType<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? `${K}` | `${K}.${TranslatePathType<T[K]>}`
        : string;
    }[keyof T]
  : string;

export type DictionaryProps = typeof _DictionaryProps;
