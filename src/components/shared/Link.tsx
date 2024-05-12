// components
import NextLink from "next/link";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";

// types
import type { FC } from "react";
import type { LinkProps } from "@interfaces/sharedComponentsProps";

const Link: FC<LinkProps> = (props) => {
  const { lng } = useClientTranstaltion();
  return (
    <NextLink {...props} href={`/${lng}${props.href}`} locale={lng}>
      {props.children}
    </NextLink>
  );
};

export default Link;
