"use client";

// types
import type { FC } from "react";

// hooks
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// nprogress
import "nprogress/nprogress.css";
import nProgress from "nprogress";

const NavigationProgress: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const complete = nProgress.done;

    complete();
  }, [pathname, searchParams]);

  return <></>;
};

export default NavigationProgress;
