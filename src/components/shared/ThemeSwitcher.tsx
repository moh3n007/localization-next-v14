"use client";

// components
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

// icons
import { IconMoonStars, IconSun } from "@tabler/icons-react";

// types
import type { FC } from "react";

// styles
import classes from "./ThemeSwitcher.module.css";

const ThemeSwitcher: FC = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme == "dark" ? "light" : "dark")}
      size={"lg"}
    >
      {colorScheme == "dark" ? (
        <IconMoonStars className={classes.icon} />
      ) : (
        <IconSun className={classes.icon} />
      )}
    </ActionIcon>
  );
};

export default ThemeSwitcher;
