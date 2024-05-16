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
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

// styles
import classes from "./UserProfile.module.css";

// funcs
import { deleteCookie } from "cookies-next";

// config
import APP_CONFIG from "@config/index";
import useClientTranstaltion from "@hooks/useClientTranstaltion";

const UserProfile: FC = () => {
  const userId = useAtomValue(userIdAtom);

  const router = useRouter();
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

  if (isLoading) return <Skeleton w={"100%"} h={rem(38)} />;

  return (
    <Menu shadow="md">
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
          Logout
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
