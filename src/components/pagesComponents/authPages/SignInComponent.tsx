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
import AuthBaseComponent from "./shared/AuthBaseComponent";
import Link from "@components/shared/Link";

// styles
import classes from "./SignInComponent.module.css";

// icons
import { IconBrandGoogle, IconBrandTwitter } from "@tabler/icons-react";

const SignInComponent: FC = () => {
  return (
    <AuthBaseComponent>
      <Box component="form">
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to App Shell!
        </Title>

        <Group grow mb="md" mt="md">
          <Button leftSection={<IconBrandGoogle />} radius="xl">
            Google
          </Button>
          <Button leftSection={<IconBrandTwitter />} radius="xl">
            Twitter
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Link href={"/register"}>
            <Anchor fw={700} component="span">
              Register
            </Anchor>
          </Link>
        </Text>
      </Box>
    </AuthBaseComponent>
  );
};

export default SignInComponent;
