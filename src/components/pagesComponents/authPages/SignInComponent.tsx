"use client";

// types
import { useRef, type FC } from "react";
import type {
  LoginDataProps,
  LoginFormDataProps,
} from "@interfaces/authPagesProps";

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
import { useRouter } from "next/navigation";

// pocketbase
import pb from "@/pocketbase";

// funcs
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { setCookie } from "cookies-next";

// config
import APP_CONFIG from "@config/index";

const SignInComponent: FC = () => {
  const { t } = useClientTranstaltion();
  const router = useRouter();

  const rememberMe = useRef(false);

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
    onSuccess: (data) => {
      setCookie(APP_CONFIG.tokenName, data.token, {
        maxAge: rememberMe.current ? 1296000 : 86400,
      });
      router.refresh();
    },
    onError: (error: any) => {
      if (error.response.code == 403) {
        modals.openConfirmModal({
          title: t("auth.verify_account"),
          children: <Text>{t("auth.verify_email_first")}</Text>,
          centered: true,
          withCloseButton: false,
          cancelProps: {
            display: "none",
          },
          confirmProps: {
            fullWidth: true,
          },
          labels: { confirm: "OK", cancel: "" },
        });
      } else {
        notifications.show({
          title: t("auth.login"),
          message: t("auth.credentials_not_correct"),
          color: "red",
        });
      }
    },
  });

  const { mutate: googleMutate } = useMutation({
    mutationFn: (provider: "google" | "twitter") =>
      pb.collection("users").authWithOAuth2({ provider }),
    onSuccess: (data) => {
      setCookie(APP_CONFIG.tokenName, data.token, {
        maxAge: rememberMe.current ? 1296000 : 86400,
      });
      router.refresh();
    },
  });

  const onSubmit = (data: LoginFormDataProps) => {
    rememberMe.current = data.remember_me;
    mutate(data);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        {t("general.welcome_to_app_shell")}
      </Title>

      <Group grow mb="md" mt="md">
        <Button
          leftSection={<IconBrandGoogle />}
          radius="xl"
          onClick={() => googleMutate("google")}
        >
          Google
        </Button>
        <Button
          leftSection={<IconBrandX />}
          radius="xl"
          onClick={() => googleMutate("twitter")}
        >
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
