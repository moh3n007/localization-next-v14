"use client";

// types
import { useRef, type FC } from "react";

// components
import { Anchor, Box, Button, Text, TextInput, Title } from "@mantine/core";
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

interface RegisterDataProps {
  email: string;
}

interface UserRegisterData extends RegisterDataProps {
  password: string;
  passwordConfirm: string;
  verified?: boolean;
}

const RegisterComponent: FC = () => {
  const { t } = useClientTranstaltion();

  const emailRef = useRef("");

  const form = useForm<RegisterDataProps>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : t("form.email_invalid"),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (props: UserRegisterData) =>
      pb.collection("users").create(props),
    onSuccess: () => {
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
      email: data.email,
      password: "temp1234",
      passwordConfirm: "temp1234",
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
