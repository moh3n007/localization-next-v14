"use client";

// components
import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";

// icons
import { IconMoonStars, IconSun } from "@tabler/icons-react";

// types
import type { FC } from "react";

// styles
import classes from "./ThemeSwitcher.module.css";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";

const ThemeSwitcher: FC = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const { t } = useClientTranstaltion();

  return (
    <Tooltip label={t("general.theme_mode")}>
      <ActionIcon
        onClick={() => setColorScheme(colorScheme == "dark" ? "light" : "dark")}
        size={"lg"}
      >
        {colorScheme != "dark" ? (
          <IconMoonStars className={classes.icon} />
        ) : (
          <IconSun className={classes.icon} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeSwitcher;
