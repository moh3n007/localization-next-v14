// components
import { Box, Flex, Paper } from "@mantine/core";
import LanguageSwitcher from "@components/shared/LanguageSwitcher";
import ThemeModeSwitcher from "@components/shared/ThemeModeSwitcher";
import ThemeColorSwitcher from "@components/shared/ThemeColorSwitcher";

// types
import type { FC, PropsWithChildren } from "react";

// styles
import classes from "./AuthPagesLayout.module.css";

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
