import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { modelLoader } from "processes/loader";
import { cubicApi } from "shared/api";
import type { Router, RouterRange } from "shared/api";

const testRouters: Router[] = [
  { channel: 23, enabled: true, name: "Default 1", range: "2.4" },
  { channel: 50, enabled: false, name: "Default 2", range: "5" },
];

const toggleRouter = createEvent<Router>();

const getRouterInfoFx = createEffect(() => {
  return cubicApi.router.getWifiTogleInfo();
});

const togleWifiFx = createEffect((args: cubicApi.router.TogleWifiArgs) => {
  return cubicApi.router.togleWifi(args);
});

export const routerInitialState: Router[] = [];

export const $routers = createStore(routerInitialState).on(
  getRouterInfoFx.doneData,
  (_, payload) => {
    return testRouters;
  }
);

export const $routersLoading = getRouterInfoFx.pending;

const useRouters = (): Router[] => {
  return useStore($routers);
};

const useRouter = (range: RouterRange | undefined): Router | undefined => {
  const routers = useStore($routers);
  return routers?.find((router) => router.range === range);
};

toggleRouter.watch(async (payload) => {
  modelLoader.actions.toggleLoader();
  await togleWifiFx({ range: payload.range, started: !payload.enabled });
  await getRouterInfoFx();
  modelLoader.actions.toggleLoader();
});

export const events = {
  toggleRouter,
};

export const effects = {
  getRouterInfoFx,
  togleWifiFx,
};

export const selectors = {
  useRouter,
  useRouters,
};
