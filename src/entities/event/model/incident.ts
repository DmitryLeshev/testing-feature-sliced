// import { createStore, combine, createEffect, createEvent } from "effector";
// import { useStore } from "effector-react";
// import { normalize, schema } from "normalizr";
// import produce from "immer";

// import { cubicApi } from "shared/api";
// import type { Event } from "shared/api";

// export type QueryConfig = cubicApi.event.ListArgs & {};

// const updateIncident = createEvent();
// const setQueryConfig = createEvent<QueryConfig>();
// const resetQueryConfig = createEvent<QueryConfig>();

// const getIncidentsListFx = createEffect((args: cubicApi.event.ListArgs) => {
//   return cubicApi.event.incidentList(args);
// });

// const getIncidentFx = createEffect((args: cubicApi.event.GetArgs) => {
//   return cubicApi.event.incidentGet(args);
// });

// // Можно вынести нормализацию на уровне API
// export const incidentsSchema = new schema.Entity("incidents");
// export const normalizeIncident = (data: Event) =>
//   normalize(data, incidentsSchema);
// export const normalizeIncidents = (data: Event[]) =>
//   normalize(data, [incidentsSchema]);

// export const incidentsInitialState: Record<number, Event> = {};
// export const $incidents = createStore(incidentsInitialState)
//   .on(
//     getIncidentsListFx.doneData,
//     (_, payload) => normalizeIncidents(payload.data ?? []).entities.incidents
//   )
//   .on(getIncidentFx.doneData, (state, payload) => ({
//     ...state,
//     ...normalizeIncident(payload.data).entities.incidents,
//   }))
//   .on(updateIncident, (state, taskId) =>
//     produce(state, (draft) => {
//       console.log({ state, taskId, draft });
//     })
//   );

// export const $queryConfig = createStore<QueryConfig>({})
//   .on(setQueryConfig, (_, payload) => payload)
//   .on(resetQueryConfig, () => {});

// export const $incidentsListLoading = getIncidentsListFx.pending;
// export const $taskDetailsLoading = getIncidentFx.pending;

// export const $incidentsList = combine($incidents, (incidents) =>
//   Object.values(incidents)
// );
// export const $incidentsIsEmpty = combine(
//   $incidentsList,
//   (incidentsList) => incidentsList.length < 1
// );

// export const $incidentsFiltered = combine(
//   $incidentsList,
//   $queryConfig,
//   (incidentsList, config) => {
//     return incidentsList.filter((task) => config.progressId === task.id);
//   }
// );

// const useIncident = (
//   taskId: number
// ): import("shared/api").Event | undefined => {
//   return useStore($incidents)[taskId];
// };

// const useIncidentsList = (): import("shared/api").Event[] => {
//   return useStore($incidentsList);
// };

// const useIncidentListLoading = () => {
//   return useStore($incidentsListLoading);
// };

// const useIncidentListIsEmpty = () => {
//   return useStore($incidentsIsEmpty);
// };

// const useQuery = () => {
//   return useStore($queryConfig);
// };

// export const events = {
//   updateIncident,
//   setQueryConfig,
// };

// export const effects = {
//   getIncidentFx,
//   getIncidentsListFx,
// };

// export const selectors = {
//   useIncident,
//   useIncidentsList,
//   useIncidentListLoading,
//   useIncidentListIsEmpty,
//   useQuery,
// };

// $incidents.watch((state) => {
//   return state;
// });

export {};
