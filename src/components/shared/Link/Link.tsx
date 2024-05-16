"use client";

// components
import NextLink from "next/link";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";

// types
import type { FC } from "react";
import type { LinkProps } from "@interfaces/sharedComponentsProps";

// styles
import classes from "./Link.module.css";
import cx from "clsx";

//utils
import nprogress from "nprogress";
import { shouldTriggerStartEvent } from "@utils/shouldTriggerStartEvent";

const Link: FC<LinkProps> = (props) => {
  const { lng } = useClientTranstaltion();

  return (
    <NextLink
      {...props}
      href={`/${lng}${props.href}`}
      locale={lng}
      className={cx(classes.link, props.className)}
      onClick={(event) => {
        if (shouldTriggerStartEvent(props.href as string, event))
          nprogress.start();
        props.onClick?.(event);
      }}
    >
      {props.children}
    </NextLink>
  );
};

export default Link;
