import { ActionIcon, Badge, Button, Indicator, Menu, rem } from "@mantine/core";
import { IconBell, IconNotification } from "@tabler/icons-react";
import { FC } from "react";

interface NotificationMenuProps {}

const NotificationMenu: FC<NotificationMenuProps> = () => {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button variant="subtle" p={0} px={rem(6)} color="gray">
          <Indicator offset={5} withBorder>
            <IconBell />
          </Indicator>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;
