// styles
import "./globals.css";
import "@mantine/core/styles.css";

// types
import type { LanguageType } from "@interfaces/general";

// providers
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

// theme
import theme from "@config/theme";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: LanguageType };
}>) {
  return (
    <html lang={lng}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
