import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

const open = createEvent("open");
const closed = createEvent("closed");
const error = createEvent("error");

const $wsStatus = createStore("closed")
  .on(open, () => "open")
  .on(closed, () => "closed")
  .on(error, () => "error");

export const events = { open, closed, error };
export const selectors = {
  useWsStatus: () => useStore($wsStatus),
};

$wsStatus.watch((state) => console.log("ws", state));
