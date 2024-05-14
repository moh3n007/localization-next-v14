"use client";

// types
import type { FC } from "react";

// components
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "@components/shared/Link";

// styles
import classes from "./SignInComponent.module.css";

// icons
import { IconBrandGoogle, IconBrandX } from "@tabler/icons-react";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";

const SignInComponent: FC = () => {
  const { t } = useClientTranstaltion();
  return (
    <Box component="form">
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        {t("general.welcome_to_app_shell")}
      </Title>

      <Group grow mb="md" mt="md">
        <Button leftSection={<IconBrandGoogle />} radius="xl">
          Google
        </Button>
        <Button leftSection={<IconBrandX />} radius="xl">
          Twitter
        </Button>
      </Group>

      <Divider
        label={t("auth.or_continue_with_email")}
        labelPosition="center"
        my="lg"
      />

      <TextInput
        label={t("auth.email")}
        placeholder="abcd@gmail.com"
        size="md"
      />
      <PasswordInput
        label={t("auth.password")}
        placeholder={t("auth.your_password")}
        mt="md"
        size="md"
      />
      <Checkbox label={t("auth.keep_me_logged_in")} mt="xl" size="md" />
      <Button fullWidth mt="xl" size="md">
        {t("auth.login")}
      </Button>

      <Text ta="center" mt="md">
        {t("auth.dont_have_account")}{" "}
        <Link href={"/register"}>
          <Anchor fw={700} component="span">
            {t("auth.register")}
          </Anchor>
        </Link>
      </Text>
    </Box>
  );
};

export default SignInComponent;
