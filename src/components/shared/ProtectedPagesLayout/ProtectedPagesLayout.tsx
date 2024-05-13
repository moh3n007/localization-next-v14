"use client";
import {
  AppShell,
  Burger,
  Flex,
  Group,
  NavLink,
  Skeleton,
  Title,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandGoogle,
  IconCreditCard,
  IconCreditCardFilled,
  IconFingerprint,
  IconGauge,
  IconHome,
  IconHomeFilled,
} from "@tabler/icons-react";
import removeLocalePrefix from "@utils/removeLocalePrefix";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import Link from "@components/shared/Link";
import useClientTranstaltion from "@hooks/useClientTranstaltion";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

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
            <ThemeSwitcher />
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
