"use client";

// types
import { useRef, type FC } from "react";
import type {
  RegisterDataProps,
  UserRegisterData,
} from "@interfaces/authPagesProps";

// components
import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "@components/shared/Link";

// styles
import classes from "./SignInComponent.module.css";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";

// pocketbase
import pb from "@/pocketbase";

// funcs
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const RegisterComponent: FC = () => {
  const { t } = useClientTranstaltion();

  const emailRef = useRef("");

  const form = useForm<RegisterDataProps>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validate: {
      email: (value) =>
        !!value
          ? /^\S+@\S+$/.test(value)
            ? null
            : t("form.email_invalid")
          : t("form.field_required"),
      password: (value) =>
        !!value
          ? value.length < 8
            ? t("form.less_char", { char: "8" })
            : null
          : t("form.field_required"),
      passwordConfirm: (value, values) =>
        value != values.password ? t("form.password_is_not_equal") : null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (props: UserRegisterData) =>
      pb.collection("users").create(props),
    onSuccess: async () => {
      modals.openContextModal({
        modal: "register",
        innerProps: {
          modalBody: emailRef.current,
        },
        centered: true,
        closeOnClickOutside: false,
        closeOnEscape: false,
        withCloseButton: false,
      });
      form.reset();
      await pb.collection("users").requestVerification(emailRef.current);
    },
    onError: (error) => {
      notifications.show({
        title: t("auth.register"),
        message: t("auth.email_invalid_or_exist"),
        color: "red",
      });
    },
  });

  const onSubmit = (data: RegisterDataProps) => {
    const userData: UserRegisterData = {
      ...data,
      verified: false,
    };
    emailRef.current = data.email;
    mutate(userData);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        {t("auth.create_account")}
      </Title>
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
      <PasswordInput
        label={t("form.confirm_password")}
        placeholder={t("form.your_password")}
        mt="md"
        size="md"
        withAsterisk
        key={form.key("passwordConfirm")}
        {...form.getInputProps("passwordConfirm")}
      />
      <Button fullWidth mt="xl" size="md" type="submit" loading={isPending}>
        {t("auth.register")}
      </Button>

      <Text ta="center" mt="md">
        {t("auth.already_have_account")}{" "}
        <Link href={"/sign-in"}>
          <Anchor component="span" fw={700}>
            {t("auth.login")}
          </Anchor>
        </Link>
      </Text>
    </Box>
  );
};

export default RegisterComponent;
