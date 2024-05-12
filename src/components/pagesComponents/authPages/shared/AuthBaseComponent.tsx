// components
import { Paper } from "@mantine/core";

// types
import type { FC, PropsWithChildren } from "react";

// styles
import classes from "./AuthBaseComponent.module.css";

const AuthBaseComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper} radius={0} p={30}>
        {children}
      </Paper>
    </div>
  );
};

export default AuthBaseComponent;
