export default function removeLocalePrefix(url: string) {
  // Regular expression to match any locale prefix followed by a slash
  const regex = /^\/[a-z]{2}\/?/;
  // Replace the matched locale prefix with an empty string
  return url.replace(regex, "");
}
