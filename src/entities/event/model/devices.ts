import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { cubicApi, EventFilterDevice } from "shared/api";

const $devices = createStore<EventFilterDevice[]>([]);
const useDevices = () => useStore($devices);

const getDevicesFx = createEffect(() => cubicApi.event.getFeilterDevices());
$devices.on(getDevicesFx.doneData, (_, payload) => payload.data);

const $selectedDevice = createStore<EventFilterDevice | null>(null);
const useSelecetedDevices = () => useStore($selectedDevice);

const selectDevice = createEvent<EventFilterDevice>();

$selectedDevice.on(selectDevice, (_, payload) => payload);

export const devicesEvents = {
  selectDevice,
};

export const devicesEffects = {
  getDevicesFx,
};

export const devicesSelectors = {
  useSelecetedDevices,
  useDevices,
};
