"use client";

// types
import type { FC } from "react";

// components
import { Anchor, Box, Button, Text, TextInput, Title } from "@mantine/core";
import Link from "@components/shared/Link";

// styles
import classes from "./SignInComponent.module.css";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";

const RegisterComponent: FC = () => {
  const { t } = useClientTranstaltion();

  return (
    <Box component="form">
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        {t("auth.create_account")}
      </Title>
      <TextInput
        label={t("auth.email")}
        placeholder="abcd@gmail.com"
        size="md"
      />
      <Button fullWidth mt="xl" size="md">
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
