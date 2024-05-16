import { useRouter as useRouterOriginal } from "next/navigation";
import { shouldTriggerStartEvent } from "@utils/shouldTriggerStartEvent";
import nprogress from "nprogress";

export function useRouter(): ReturnType<typeof useRouterOriginal> {
  const router = useRouterOriginal();

  const onStart = nprogress.start;

  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.push(href, options);
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.replace(href, options);
    },
    refresh: () => {
      onStart();
      router.refresh();
    },
  };
}
