"use client";

// pocketbase
import pb from "@/pocketbase";

// atoms
import { userIdAtom } from "@atoms/generalAtoms";

// types
import type { UserProps } from "@interfaces/general";
import type { FC } from "react";

// components
import {
  Avatar,
  Divider,
  Flex,
  Menu,
  SegmentedControl,
  Skeleton,
  Text,
  rem,
  useMantineColorScheme,
} from "@mantine/core";

// icons
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

// hooks
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import useClientTranstaltion from "@hooks/useClientTranstaltion";

// styles
import classes from "./UserProfile.module.css";

// funcs
import { deleteCookie } from "cookies-next";

// config
import APP_CONFIG from "@config/index";

const UserProfile: FC = () => {
  const router = useRouter();
  const { t } = useClientTranstaltion();

  const [userId] = useAtom(userIdAtom);
  const setUserId = useSetAtom(userIdAtom);

  const queryClient = useQueryClient();

  const handleLogout = () => {
    deleteCookie(APP_CONFIG.tokenName);
    setUserId("");
    queryClient.clear();
    router.refresh();
  };

  const { data, isLoading } = useQuery<UserProps>({
    queryKey: ["profile"],
    queryFn: () => pb.collection("users").getOne(userId),
    enabled: !!userId,
  });

  if (isLoading) return <Skeleton w={"100%"} h={rem(26)} />;

  return (
    <Menu shadow="md" classNames={{ dropdown: classes.dropdown }}>
      <Menu.Target>
        <Flex className={classes.userMenu}>
          <Avatar src={data?.avatar} size={"sm"} />
          <Text size="sm">{data?.name}</Text>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{data?.email}</Menu.Label>
        <Divider />
        <ThemeModeSwwitcher />
        <Menu.Item color="red" onClick={handleLogout}>
          {t("general.logout")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserProfile;

const ThemeModeSwwitcher: FC = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const { t } = useClientTranstaltion();

  return (
    <Flex align={"center"} w={"100%"} px={rem(12)} py={rem(6)}>
      <Text size="sm" mr={"auto"}>
        {t("general.theme")}
      </Text>
      <SegmentedControl
        value={colorScheme}
        onChange={(value: any) => setColorScheme(value)}
        classNames={{
          root: classes.segmentRoot,
          label: classes.segmentLabel,
          innerLabel: classes.segmentInnerLabel,
        }}
        data={[
          {
            value: "light",
            label: <IconSun style={{ width: rem(14), height: rem(14) }} />,
          },
          {
            value: "dark",
            label: <IconMoon style={{ width: rem(14), height: rem(14) }} />,
          },
          {
            value: "auto",
            label: (
              <IconDeviceDesktop style={{ width: rem(14), height: rem(14) }} />
            ),
          },
        ]}
      />
    </Flex>
  );
};
