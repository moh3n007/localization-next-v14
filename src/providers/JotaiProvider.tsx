"use client";
import { Provider, createStore } from "jotai";
import { FC, PropsWithChildren } from "react";

const store = createStore();

const JotaiProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default JotaiProvider;
