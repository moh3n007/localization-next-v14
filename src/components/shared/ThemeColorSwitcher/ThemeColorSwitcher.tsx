"use client";

// components
import {
  ActionIcon,
  DefaultMantineColor,
  Flex,
  FlexProps,
  Grid,
  Menu,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

// icons
import { IconCheck, IconColorPicker } from "@tabler/icons-react";

// types
import { useState, type FC } from "react";

// styles
import classes from "./ThemeColorSwitcher.module.css";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";

// atoms
import { paletteAtom } from "@atoms/generalAtoms";

const ThemeColorSwitcher: FC = () => {
  const { t } = useClientTranstaltion();
  const router = useRouter();
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  const [palette, setPalatte] = useAtom(paletteAtom);

  const handleSetPalette = (palette: DefaultMantineColor) => {
    setOpened(false);
    setPalatte(palette);
    router.refresh();
  };

  return (
    <Menu
      shadow="md"
      width={200}
      position="bottom-end"
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <Tooltip
          label={t("general.theme_color")}
          opened={opened ? false : undefined}
        >
          <ActionIcon size="lg" color={theme.primaryColor}>
            <IconColorPicker size="1.2rem" />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Grid>
          {themesList.map((item) => (
            <Grid.Col
              span={3}
              key={`palette_item_${item}`}
              className={classes.gridItem}
            >
              <PaletteItem
                item={item}
                isSelected={item === palette}
                onClick={() => handleSetPalette(item)}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ThemeColorSwitcher;

const PaletteItem: FC<
  { item: DefaultMantineColor; isSelected: boolean } & FlexProps
> = (props) => {
  const { isSelected, item, ...rest } = props;

  return (
    <Flex
      {...rest}
      style={(theme) => ({
        backgroundColor: theme.colors[item][5],
      })}
      className={classes.item}
    >
      {isSelected && <IconCheck size="1.2rem" color="white" />}
    </Flex>
  );
};

// languages data
export const themesList: DefaultMantineColor[] = [
  "blue",
  "cyan",
  "dark",
  "grape",
  "gray",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
  "yellow",
];
