// components
import { Box, Flex, Paper } from "@mantine/core";
import LanguageSwitcher from "@components/shared/LanguageSwitcher";
import ThemeSwitcher from "@components/shared/ThemeSwitcher";

// types
import type { FC, PropsWithChildren } from "react";

// styles
import classes from "./AuthPagesLayout.module.css";

const AuthPagesLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box className={classes.wrapper}>
      <Flex className={classes.buttons}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </Flex>
      <Paper className={classes.paper} radius={0} p={30}>
        {children}
      </Paper>
    </Box>
  );
};

export default AuthPagesLayout;
