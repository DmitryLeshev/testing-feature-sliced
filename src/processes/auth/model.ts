import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";
import { normalize, schema } from "normalizr";

import { cubicApi } from "shared/api";
import { PING_INTERVAL } from "shared/config";

let interval: NodeJS.Timeout;

const check = createEvent();

const getStatusFx = createEffect(() => {
  return cubicApi.auth.status();
});

export const statusSchema = new schema.Entity("status");
export const normalizeStatus = (data: any) => normalize(data, statusSchema);

export type Status = "cubic-is-not-auth" | "cubic-auth" | "wizard" | null;

export const statusInitialState: Status = null;
const $status = createStore<Status>(statusInitialState).on(
  getStatusFx.doneData,
  (_, payload) => payload?.data?.message
);

export const $statusLoading = getStatusFx.pending;

const useStatus = () => {
  return useStore($status);
};

check.watch(async () => {
  await getStatusFx();
});

check();
interval = setInterval(() => {
  check();
}, PING_INTERVAL);

export const actions = { check };
export const effects = { getStatusFx };
export const selectors = { useStatus };
