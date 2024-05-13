"use client";

// types
import type { FC } from "react";

// components
import { Anchor, Box, Button, Text, TextInput, Title } from "@mantine/core";
import Link from "@components/shared/Link";

// styles
import classes from "./SignInComponent.module.css";

const RegisterComponent: FC = () => {
  return (
    <Box component="form">
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Create an account!
      </Title>
      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
      />
      <Button fullWidth mt="xl" size="md">
        Register
      </Button>

      <Text ta="center" mt="md">
        Already have an account?{" "}
        <Link href={"/sign-in"}>
          <Anchor component="span" fw={700}>
            Login
          </Anchor>
        </Link>
      </Text>
    </Box>
  );
};

export default RegisterComponent;
