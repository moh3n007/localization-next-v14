"use client";

// types
import { type FC } from "react";

// components
import { Notifications } from "@mantine/notifications";

// css styles
import "@mantine/notifications/styles.css";

const NotificationsProvider: FC = () => {
  return <Notifications />;
};

export default NotificationsProvider;
