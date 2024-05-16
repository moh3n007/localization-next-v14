"use client";
import { ActionIcon, Box, Menu, Stack, Tooltip } from "@mantine/core";
import { useMemo } from "react";

// types
import type { LanguageType } from "@interfaces/general";

// flags
import EnglandFlagSvg from "@/src/SVGs/EnglandFlagSvg";
import GermanyFlagSvg from "@/src/SVGs/GermanyFlagSvg";

// icons
import { IconLanguage } from "@tabler/icons-react";

// languages
import { languageTitles, languages } from "@/i18n";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";
import { usePathname } from "next/navigation";

// styles
import classes from "./LanguageSwitcher.module.css";

// utils
import removeLocalePrefix from "@utils/removeLocalePrefix";

export default function LanguageSwitcher() {
  const { lng, t } = useClientTranstaltion();
  const pathname = usePathname();

  const languagesList = useMemo(
    () => languages.filter((_lng) => _lng !== lng),
    [lng]
  ) as LanguageType[];

  const asPath = removeLocalePrefix(pathname);

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Tooltip label={t("general.language")}>
          <ActionIcon size="lg" className={classes.button}>
            <IconLanguage size="1.2rem" />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        {languagesList.map((_lng) => (
          <Box
            component="a"
            href={`/${_lng}/${asPath}`}
            key={`lng_${_lng}`}
            className={classes.link}
          >
            <Menu.Item
              p="0.5rem"
              leftSection={
                <Stack w="1.5rem" h="1.5rem" className={classes.item}>
                  {countryFlags[_lng]}
                </Stack>
              }
            >
              {languageTitles[_lng]}
            </Menu.Item>
          </Box>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

// languages data
export const countryFlags: {
  [key in LanguageType]: React.ReactNode;
} = {
  de: <GermanyFlagSvg />,
  en: <EnglandFlagSvg />,
};
