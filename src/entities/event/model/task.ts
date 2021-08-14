import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";
import { normalize, schema } from "normalizr";
import produce from "immer";

import { cubicApi } from "shared/api";
import type { Event } from "shared/api";
import { _trDate } from "shared/utils";
import { setInterval } from "timers";

export type QueryConfig = cubicApi.event.ListArgs & {};

const updateTask = createEvent();
const getNextTasks = createEvent<QueryConfig>();
const resetTasks = createEvent();

const setQueryConfig = createEvent<QueryConfig>();
const updateQueryConfig = createEvent<any>();
const resetQueryConfig = createEvent();

const getTasksListFx = createEffect((args: cubicApi.event.ListArgs) => {
  return cubicApi.event.taskList(args);
});

const getNextTasksFx = createEffect((args: cubicApi.event.ListArgs) => {
  return cubicApi.event.taskList(args);
});

const getTaskFx = createEffect((args: cubicApi.event.GetArgs) => {
  return cubicApi.event.taskGet(args);
});

// Можно вынести нормализацию на уровне API
export const taskSchema = new schema.Entity("tasks");
export const normalizeTask = (data: Event) => normalize(data, taskSchema);
export const normalizeTasks = (data: Event[]) => normalize(data, [taskSchema]);

export const lvl100tasksInitialState: Record<number, Event> = {};
export const $lvl100tasks = createStore(lvl100tasksInitialState)
  .on(getTasksListFx.doneData, (_, payload) => {
    return normalizeTasks(payload.data ?? []).entities.tasks;
  })
  // .on(getTaskFx.doneData, (state, payload) => ({
  //   ...state,
  //   ...normalizeTask(payload.data).entities.tasks,
  // }))
  .on(updateTask, (state, taskId) =>
    produce(state, (draft) => {
      console.log({ state, taskId, draft });
    })
  );

export const tasksInitialState: Event[] = [];

export const $tasks = createStore(tasksInitialState)
  .on(getTasksListFx.doneData, (_, payload) => {
    return payload.data;
  })
  .on(resetTasks, () => tasksInitialState)
  .on(getNextTasksFx.doneData, (state, payload) => {
    console.log({ state, payload });
    if (!state.length) return state;
    return [...state, ...(payload.data ?? [])];
  });

const queryInitialState: QueryConfig = {
  progressId: 1,
  crt: [0, 10],
  date: [0, 9999999999],
  devices: [],
  lastId: 0,
};

export const $queryConfig = createStore<QueryConfig>(queryInitialState)
  .on(setQueryConfig, (_, payload) => payload)
  .on(updateQueryConfig, (state: any, payload: any) => {
    const [key, value] = Object.entries(payload)[0];
    return { ...state, [key]: value };
  })
  .on(resetQueryConfig, () => queryInitialState);

export const $tasksListLoading = getTasksListFx.pending;
export const $taskDetailsLoading = getTaskFx.pending;

export const $tasksList = combine($tasks, (tasks) => {
  return Object.values(tasks);
});

export const $tasksIsEmpty = combine(
  $tasksList,
  (tasksList) => tasksList.length < 1
);

export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasksList, config) => {
    return tasksList.filter((task) => {
      return task;
    });
  }
);

export const $lastTaskId = combine($tasks, (tasks) => {
  return tasks[tasks.length - 1]?.id ?? 0;
});

const useTask = (taskId: number): import("shared/api").Event | undefined => {
  return useStore($tasks)[taskId];
};

const useTasksList = (): import("shared/api").Event[] => {
  return useStore($tasksList);
};

const useTaskListLoading = () => {
  return useStore($tasksListLoading);
};

const useTaskListIsEmpty = () => {
  return useStore($tasksIsEmpty);
};

const useLastTaskId = () => {
  return useStore($lastTaskId);
};

const useQuery = () => {
  return useStore($queryConfig);
};

export const events = {
  resetTasks,
  updateTask,
  setQueryConfig,
  updateQueryConfig,
  resetQueryConfig,
  getNextTasks,
};

export const effects = {
  getTaskFx,
  getTasksListFx,
  getNextTasksFx,
};

export const selectors = {
  useTask,
  useTasksList,
  useTaskListLoading,
  useTaskListIsEmpty,
  useQuery,
  useLastTaskId,
};
