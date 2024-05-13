import { LanguageType } from "@interfaces/general";

const fallbackLng = "en";

const languages = ["en", "de"];

const languageTitles: { [key in LanguageType]: string } = {
  en: "English",
  de: "German",
};

export { fallbackLng, languages, languageTitles };
