import type { TranslatePathType } from "@interfaces/general";

function _replacePlaceholders(
  str: string,
  values: { [key: string]: string }
): string {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => values[key] || match);
}

function handleTranslate<T, P extends TranslatePathType<T>>(
  dictionary: T,
  path: P,
  values?: { [key: string]: string }
): string {
  const keys = path.split(".");

  let current = dictionary as any;
  for (let key of keys) {
    if (!key) {
      return path; // Return the path if the path is not correct
    }

    if (current[key] === undefined) {
      return key; // Return undefined if the path does not exist
    }

    current = current[key];
  }

  if (!!values) {
    current = _replacePlaceholders(current, values);
  }

  return typeof current == "string" ? current : path;
}

export default handleTranslate;
