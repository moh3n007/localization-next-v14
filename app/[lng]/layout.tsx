// styles
import "./globals.css";
import "@mantine/core/styles.css";

// types
import type { LanguageType } from "@interfaces/general";

// providers
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import LanguageProvider from "@components/LanguageProvider";

// theme
import theme from "@config/theme";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// i18n
import { getDictionary } from "@/i18n/getDictionary";

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>) {
  const langJsonPromise = getDictionary(lng);

  return (
    <html lang={lng}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <LanguageProvider langJsonPromise={langJsonPromise} lng={lng}>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
