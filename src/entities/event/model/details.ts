import { createStore, createEffect } from "effector";
import { useStore } from "effector-react";

import { cubicApi, Event } from "shared/api";

const $details = createStore<Event | null>(null);
const useDetails = () => useStore($details);

const getDetailsFx = createEffect(
  ({ type, id }: cubicApi.event.GetArgs & { type: "task" | "incident" }) => {
    const action = type === "task" ? "taskGet" : "incidentGet";
    return cubicApi.event[action]({ id });
  }
);

$details.on(getDetailsFx.doneData, (_, payload) => payload.data);

const $detailsLoading = getDetailsFx.pending;

const useDetailsLoading = () => {
  return useStore($detailsLoading);
};

export const detailsEffects = {
  getDetailsFx,
};

export const detailsSelectors = {
  useDetails,
  useDetailsLoading,
};
