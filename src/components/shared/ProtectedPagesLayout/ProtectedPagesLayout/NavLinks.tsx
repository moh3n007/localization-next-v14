"use client";

// components
import { Flex, NavLink, Skeleton, rem } from "@mantine/core";
import Link from "@components/shared/Link";

// hooks
import { usePathname } from "next/navigation";
import useClientTranstaltion from "@hooks/useClientTranstaltion";
import { useRouter } from "@hooks/useRouter";

// icons
import {
  IconCreditCard,
  IconCreditCardFilled,
  IconHome,
  IconHomeFilled,
} from "@tabler/icons-react";

// utils
import removeLocalePrefix from "@utils/removeLocalePrefix";

// types
import type { FC } from "react";
import type { NavLinksProps } from "@interfaces/sharedComponentsProps";

// next.js funcs
import dynamic from "next/dynamic";

// dynamic components
const UserProfile = dynamic(() => import("./NavLinks/UserProfile"), {
  ssr: false,
  loading: () => <Skeleton w={"100%"} h={rem(26)} />,
});

const NavLinks: FC<NavLinksProps> = ({ toggleMobile }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { t, lng } = useClientTranstaltion();

  return (
    <>
      <Link href={"/"}>
        <NavLink
          component="div"
          label={t("home.home")}
          leftSection={
            removeLocalePrefix(pathname) == "" ||
            removeLocalePrefix(pathname) == "/" ? (
              <IconHomeFilled size="1rem" stroke={1.5} />
            ) : (
              <IconHome size="1rem" stroke={1.5} />
            )
          }
          childrenOffset={28}
          active={
            removeLocalePrefix(pathname) == "" ||
            removeLocalePrefix(pathname) == "/"
          }
          onClick={() => {
            toggleMobile();
          }}
        />
      </Link>
      <NavLink
        label={t("billing.billing")}
        childrenOffset={28}
        leftSection={
          removeLocalePrefix(pathname).includes("billing") ? (
            <IconCreditCardFilled size="1rem" stroke={1.5} />
          ) : (
            <IconCreditCard size="1rem" stroke={1.5} />
          )
        }
        active={removeLocalePrefix(pathname).includes("billing")}
        component="div"
        onClick={() => {
          router.push(`/${lng}/billing`);
          toggleMobile();
        }}
        opened={removeLocalePrefix(pathname).includes("billing")}
      >
        <Link href={"/billing"}>
          <NavLink
            label={t("billing.overview")}
            active={removeLocalePrefix(pathname) == "billing"}
            component="div"
            onClick={() => {
              toggleMobile();
            }}
          />
        </Link>
        <Link href={"/billing/history"}>
          <NavLink
            label={t("billing.transaction_history")}
            active={removeLocalePrefix(pathname) == "billing/history"}
            component="div"
            onClick={() => {
              toggleMobile();
            }}
          />
        </Link>
        <Link href={"/billing/preferences"}>
          <NavLink
            label={t("billing.preferences")}
            active={removeLocalePrefix(pathname) == "billing/preferences"}
            component="div"
            onClick={() => {
              toggleMobile();
            }}
          />
        </Link>
      </NavLink>
      <Flex mt={"auto"}>
        <UserProfile />
      </Flex>
    </>
  );
};

export default NavLinks;
