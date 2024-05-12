import APP_CONFIG from "@config/index";

export default function getPageName(name: string) {
  return `${APP_CONFIG.appName} | ${name}`;
}
