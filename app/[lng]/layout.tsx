// styles
import "./globals.css";
import "@mantine/core/styles.css";

// types
import type { LanguageType } from "@interfaces/general";

// providers
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import LanguageProvider from "@/src/providers/LanguageProvider";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";
import NotificationsProvider from "@/src/providers/NotificationsProvider";
import ModalsProvider from "@/src/providers/ModalsProvider";
import JotaiProvider from "@/src/providers/JotaiProvider";

// theme
import theme from "@config/theme";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// i18n
import { getDictionary } from "@/i18n/getDictionary";

// next.js funcs
import { cookies } from "next/headers";

// config
import APP_CONFIG from "@config/index";

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>) {
  const langJsonPromise = getDictionary(lng);
  const cookie = cookies();
  const palette = cookie.get(APP_CONFIG.paletteName)?.value ?? "blue";

  return (
    <html lang={lng}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <JotaiProvider>
          <LanguageProvider langJsonPromise={langJsonPromise} lng={lng}>
            <MantineProvider theme={{ ...theme, primaryColor: palette }}>
              <ReactQueryProvider>
                <ModalsProvider>
                  <NotificationsProvider />
                  {children}
                </ModalsProvider>
              </ReactQueryProvider>
            </MantineProvider>
          </LanguageProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
