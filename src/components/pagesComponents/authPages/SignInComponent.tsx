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
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";

// pocketbase
import pb from "@/pocketbase";

// funcs
import { notifications } from "@mantine/notifications";

interface LoginDataProps {
  email: string;
  password: string;
}

interface LoginFormDataProps extends LoginDataProps {
  remember_me: boolean;
}

const SignInComponent: FC = () => {
  const { t } = useClientTranstaltion();

  const form = useForm<LoginFormDataProps>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      remember_me: false,
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : t("form.email_invalid"),
      password: (value) => (!!value ? null : t("form.field_required")),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (props: LoginDataProps) =>
      pb.collection("users").authWithPassword(props.email, props.password),
    onError: () => {
      notifications.show({
        title: t("auth.login"),
        message: t("auth.credentials_not_correct"),
        color: "red",
      });
    },
  });

  const onSubmit = (data: LoginFormDataProps) => {
    mutate(data);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
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
        label={t("form.email")}
        placeholder="abcd@gmail.com"
        size="md"
        withAsterisk
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label={t("form.password")}
        placeholder={t("form.your_password")}
        mt="md"
        size="md"
        withAsterisk
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Checkbox
        label={t("form.keep_me_logged_in")}
        mt="xl"
        size="md"
        key={form.key("remember_me")}
        {...form.getInputProps("remember_me", { type: "checkbox" })}
      />
      <Button fullWidth mt="xl" size="md" type="submit" loading={isPending}>
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
