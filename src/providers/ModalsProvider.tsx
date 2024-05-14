"use client";

// types
import { type FC } from "react";

// components
import {
  ContextModalProps,
  ModalsProvider as MantineModalsProvider,
  ModalsProviderProps,
} from "@mantine/modals";
import { Button, Stack, Text } from "@mantine/core";
import Link from "@components/shared/Link";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";

const ModalsProvider: FC<ModalsProviderProps> = (props) => {
  return (
    <MantineModalsProvider
      modalProps={{
        styles: {
          inner: {
            left: 0,
          },
        },
      }}
      modals={{ register: RegisterModal }}
    >
      {props.children}
    </MantineModalsProvider>
  );
};

export default ModalsProvider;

const RegisterModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  const { t } = useClientTranstaltion();

  return (
    <Stack>
      <Text fw={600} size="lg" ta={"center"}>
        {t("auth.congratulations")}
      </Text>
      <Text size="sm">
        {t("auth.account_created", { email: innerProps.modalBody })}
      </Text>
      <Link href={"/sign-in"}>
        <Button fullWidth onClick={() => context.closeModal(id)}>
          {t("auth.go_to", { page: t("auth.login").toLowerCase() })}
        </Button>
      </Link>
    </Stack>
  );
};
