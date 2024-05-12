"use client";

import { FC, use } from "react";
import { LanguageContext } from "./LanguageProvider";

interface ClientCompProps {}

const ClientComp: FC<ClientCompProps> = (props) => {
  const dict = use(LanguageContext);

  return <div>{dict?.home.come_from_client}</div>;
};

export default ClientComp;
