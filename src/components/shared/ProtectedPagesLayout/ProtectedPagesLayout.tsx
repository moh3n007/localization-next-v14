"use client";

// components
import Link from "@components/shared/Link";
import LanguageSwitcher from "@components/shared/LanguageSwitcher";
import ThemeModeSwitcher from "@components/shared/ThemeModeSwitcher";
import {
  AppShell,
  Burger,
  Flex,
  Group,
  NavLink,
  Title,
  rem,
} from "@mantine/core";

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
import type { FC, PropsWithChildren } from "react";

// hooks
import { usePathname, useRouter } from "next/navigation";
import useClientTranstaltion from "@hooks/useClientTranstaltion";
import { useDisclosure } from "@mantine/hooks";

const ProtectedPagesLayout: FC<PropsWithChildren> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const pathname = usePathname();
  const router = useRouter();
  const { t, lng } = useClientTranstaltion();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Title order={2}>APP SHELL</Title>
          <Flex visibleFrom="sm" gap={rem(10)} ml={"auto"}>
            <LanguageSwitcher />
            <ThemeModeSwitcher />
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
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
          onClick={() => router.push(`/${lng}/billing`)}
          opened={removeLocalePrefix(pathname).includes("billing")}
        >
          <Link href={"/billing"}>
            <NavLink
              label={t("billing.overview")}
              active={removeLocalePrefix(pathname) == "billing"}
              component="div"
            />
          </Link>
          <Link href={"/billing/history"}>
            <NavLink
              label={t("billing.transaction_history")}
              active={removeLocalePrefix(pathname) == "billing/history"}
              component="div"
            />
          </Link>
          <Link href={"/billing/preferences"}>
            <NavLink
              label={t("billing.preferences")}
              active={removeLocalePrefix(pathname) == "billing/preferences"}
              component="div"
            />
          </Link>
        </NavLink>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default ProtectedPagesLayout;
