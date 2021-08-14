import { _trDate } from "shared/utils";
import { fetchApi, Response } from "./base";
import { EventFilterDevice } from "./event.model";
import type { Event } from "./models";

const BASE_PATH_TASK = "task";
const BASE_PATH_INCIDENT = "incident";

export const fetchTask = fetchApi(BASE_PATH_TASK);
export const fetchIncident = fetchApi(BASE_PATH_INCIDENT);

export type DeviceSearch = {
  entityId: number;
  entityType: number;
};

export type ListArgs = {
  progressId?: number;
  devices?: DeviceSearch[];
  crt?: [number, number];
  minCrt?: number;
  maxCrt?: number;
  limit?: number;
  date?: [number | null, number | null];
  minCreateDate?: number;
  maxCreateDate?: number;
  lastId?: number;
};

export type GetArgs = {
  id: number;
};

export const taskList = async (args: ListArgs): Promise<Response<Event[]>> => {
  const newArgs = Object.fromEntries(
    Object.entries(args).map(([key, value], idx) => {
      let newValue;
      if (key === "date") {
        newValue =
          Array.isArray(value) &&
          value.map((date, idx) => {
            if (typeof date === "number") return date;
            if (idx === 0) return _trDate.startOfTheDay(date);
            else return _trDate.endOfTheDay(date);
          });
      } else newValue = value;
      return [key, newValue];
    })
  );
  console.log({ tasks_args: newArgs });
  return await fetchTask({ list: newArgs });
};

export const taskGet = async (args: GetArgs): Promise<Response<Event>> => {
  return await fetchTask({ get: args });
};

export const getFeilterDevices = async (): Promise<
  Response<EventFilterDevice[]>
> => {
  return await fetchTask({ getDevices: {} });
};

export const incidentList = async (
  args: ListArgs
): Promise<Response<Event[]>> => {
  return await fetchIncident({ list: args });
};

export const incidentGet = async (args: GetArgs) => {
  return await fetchIncident({ get: args });
};

export const incidentGetDevices = async () => {
  return await fetchIncident({ getDevices: {} });
};
