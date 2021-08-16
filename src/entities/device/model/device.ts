import { createStore, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";
import { events as qEvents, QueryConfig } from "entities/device/model/query";

import { cubicApi, Device } from "shared/api";

// [C]reate
// [R]ead
// [U]pdate
// [D]delete

const updateDevice = createEvent<cubicApi.device.SetNewResumeArgs>();
const selectedDevice = createEvent<QueryConfig>();

const getDevicesFx = createEffect(() => {
  return cubicApi.device.list();
});

const getDeviceByIdFx = createEffect((args: cubicApi.device.GetArgs) => {
  return cubicApi.device.get(args);
});

const getDeviceTasksByIdFx = createEffect(
  (args: cubicApi.device.GetTasksArgs) => {
    return cubicApi.device.getTasks(args);
  }
);

const getDeviceIncidentsByIdFx = createEffect(
  (args: cubicApi.device.GetIncidentsArgs) => {
    return cubicApi.device.getIncidents(args);
  }
);

const getDeviceProgramsByIdFx = createEffect(
  (args: cubicApi.device.GetProgramsArgs) => {
    return cubicApi.device.getPrograms(args);
  }
);

const updateDeviceFx = createEffect(
  (args: cubicApi.device.SetNewResumeArgs) => {
    return cubicApi.device.setNewResume(args);
  }
);

const devicesInitialState: Device[] = [];
const $devices = createStore(devicesInitialState).on(
  getDevicesFx.doneData,
  (_, payload) => payload.data
);

type DeviceInitialStateType = {
  info?: Device;
  tasks?: any;
  incidents?: any;
  programs?: any;
  details?: Device;
};
const deviceInitialState: DeviceInitialStateType = {};
const $device = createStore(deviceInitialState)
  .on(getDeviceByIdFx.doneData, (state, payload) => {
    return { ...state, info: payload.data };
  })
  .on(getDeviceTasksByIdFx.doneData, (state, payload) => {
    return { ...state, tasks: payload.data };
  })
  .on(getDeviceIncidentsByIdFx.doneData, (state, payload) => {
    return { ...state, incidents: payload.data };
  })
  .on(getDeviceProgramsByIdFx.doneData, (state, payload) => {
    return { ...state, programs: payload.data };
  })
  .on(selectedDevice, (state, payload) => {
    const devices = $devices.getState();
    const details = devices.find((device) => device.id === payload.id);
    return { ...state, details: details };
  });

const useDevices = () => {
  return useStore($devices);
};

const useDevice = () => {
  return useStore($device);
};

updateDevice.watch(async (payload) => {
  await updateDeviceFx(payload);
  await getDevicesFx();
  await getDeviceByIdFx({ id: payload.id });
});

qEvents.setQueryConfig.watch(async (payload) => {
  selectedDevice(payload);
  await getDeviceByIdFx(payload);
  await getDeviceTasksByIdFx(payload);
  await getDeviceIncidentsByIdFx(payload);
  await getDeviceProgramsByIdFx(payload);
});

getDevicesFx();

export const events = {
  updateDevice,
};

export const effects = {
  getDevicesFx,
  getDeviceByIdFx,
  getDeviceTasksByIdFx,
  getDeviceIncidentsByIdFx,
  getDeviceProgramsByIdFx,
};

export const selectors = {
  useDevices,
  useDevice,
};
