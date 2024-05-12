"use client";

// types
import type { FC } from "react";

// translate
import useClientTranstaltion from "@/src/hooks/useClientTranstaltion";

const ClientComp: FC = () => {
  const { t } = useClientTranstaltion();

  return <div>{t("home.come_from_client")}</div>;
};

export default ClientComp;
