import APP_CONFIG from "@configindex";

export default function getPageName(name: string) {
  return `${APP_CONFIG.appName} | ${name}`;
}
