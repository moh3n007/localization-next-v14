"use client";

// components
import NotificationMenu from "./ProtectedPagesLayout/NotificationMenu";
import NavLinks from "./ProtectedPagesLayout/NavLinks";
import { AppShell, Burger, Flex, Group, Title, rem } from "@mantine/core";

// types
import type { FC, PropsWithChildren } from "react";

// hooks
import { useDisclosure } from "@mantine/hooks";

// config
import APP_CONFIG from "@config/index";

const ProtectedPagesLayout: FC<PropsWithChildren> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: rem(60) }}
      navbar={{
        width: rem(300),
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
          <Title order={2}>{APP_CONFIG.appName}</Title>
          <Flex visibleFrom="sm" gap={rem(10)} ml={"auto"}>
            <NotificationMenu />
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLinks toggleMobile={toggleMobile} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default ProtectedPagesLayout;
