import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { cubicApi } from "shared/api";
import type { Event } from "shared/api";
import { _trDate } from "shared/utils";

type QueryConfig = cubicApi.event.ListArgs & {};

const updateTask = createEvent();
const getNextTasks = createEvent<QueryConfig>();
const resetTasks = createEvent();

const getTasksListFx = createEffect((args: cubicApi.event.ListArgs) => {
  return cubicApi.event.taskList(args);
});

const getNextTasksFx = createEffect((args: cubicApi.event.ListArgs) => {
  return cubicApi.event.taskList(args);
});

const getTaskFx = createEffect((args: cubicApi.event.GetArgs) => {
  return cubicApi.event.taskGet(args);
});

const tasksInitialState: Event[] = [];

const $tasks = createStore(tasksInitialState)
  .on(getTasksListFx.doneData, (_, payload) => {
    return payload.data;
  })
  .on(resetTasks, () => tasksInitialState)
  .on(getNextTasksFx.doneData, (state, payload) => {
    console.log({ state, payload });
    if (!state.length) return state;
    return [...state, ...(payload.data ?? [])];
  });

const $tasksListLoading = getTasksListFx.pending;

const $tasksList = combine($tasks, (tasks) => {
  return Object.values(tasks);
});

const $tasksIsEmpty = combine($tasksList, (tasksList) => tasksList.length < 1);

const $lastTaskId = combine($tasks, (tasks) => {
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

export const taskEvents = {
  resetTasks,
  updateTask,
  getNextTasks,
};

export const taskEffects = {
  getTaskFx,
  getTasksListFx,
  getNextTasksFx,
};

export const taskSelectors = {
  useTask,
  useTasksList,
  useTaskListLoading,
  useTaskListIsEmpty,
  useLastTaskId,
};
