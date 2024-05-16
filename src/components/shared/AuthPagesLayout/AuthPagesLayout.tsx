// components
import { Box, Flex, Paper, Skeleton, rem } from "@mantine/core";
import LanguageSwitcher from "@components/shared/LanguageSwitcher";
import ThemeColorSwitcher from "@components/shared/ThemeColorSwitcher";

// types
import type { FC, PropsWithChildren } from "react";

// styles
import classes from "./AuthPagesLayout.module.css";

// next.js funcs
import dynamic from "next/dynamic";

const ThemeModeSwitcher = dynamic(
  () => import("@components/shared/ThemeModeSwitcher"),
  {
    ssr: false,
    loading: () => <Skeleton w={rem(34)} h={rem(34)} />,
  }
);

const AuthPagesLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box className={classes.wrapper}>
      <Flex className={classes.buttons}>
        <LanguageSwitcher />
        <ThemeModeSwitcher />
        <ThemeColorSwitcher />
      </Flex>
      <Paper className={classes.paper} radius={0} p={30}>
        {children}
      </Paper>
    </Box>
  );
};

export default AuthPagesLayout;
