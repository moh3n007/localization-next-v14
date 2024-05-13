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

const Link: FC<LinkProps> = (props) => {
  const { lng } = useClientTranstaltion();
  return (
    <NextLink
      {...props}
      href={`/${lng}${props.href}`}
      locale={lng}
      className={cx(classes.link, props.className)}
    >
      {props.children}
    </NextLink>
  );
};

export default Link;
