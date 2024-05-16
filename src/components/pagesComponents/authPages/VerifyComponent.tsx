"use client";

// types
import { useEffect, type FC } from "react";

// components
import {
  Button,
  Flex,
  Loader,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import Link from "@components/shared/Link";

// icons
import { IconCheck, IconX } from "@tabler/icons-react";

// hooks
import useClientTranstaltion from "@hooks/useClientTranstaltion";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

// pocketbase
import pb from "@/pocketbase";

const VerifyComponent: FC = () => {
  const { t } = useClientTranstaltion();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (token: string) =>
      pb.collection("users").confirmVerification(token),
  });

  useEffect(() => {
    mutate(token);
  }, [token]);

  return (
    <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
      {isPending ? (
        <Loader />
      ) : (
        <Paper shadow="xs" p="xl">
          <Stack align="center">
            <ThemeIcon
              color={error ? "red" : "green"}
              radius={"xl"}
              size={"xl"}
            >
              {error ? <IconX /> : <IconCheck />}
            </ThemeIcon>
            <Text fw={"bold"} size="xl">
              {t(error ? "general.error" : "general.success")}
            </Text>
            <Text>{error ? error.message : t("auth.account_verified")}</Text>
            {!error && (
              <Link href={"/sign-in"}>
                <Button miw={rem(250)}>
                  {t("auth.go_to", { page: t("auth.login").toLowerCase() })}
                </Button>
              </Link>
            )}
          </Stack>
        </Paper>
      )}
    </Flex>
  );
};

export default VerifyComponent;
