// types
import type { LinkProps as NextLinkProps } from "next/link";
import type { PropsWithChildren } from "react";

export type LinkProps = NextLinkProps &
  PropsWithChildren & {
    className?: string;
  };
