import { useEffect } from "react";
import { RouteChildrenProps } from "react-router-dom";
import { reflect } from "@effector/reflect";

import { createStyles, makeStyles } from "@material-ui/core";

import { modelEvent, EventRow, TasksTabs, EventList } from "entities/event";

import { EventFilter } from "widgets/event-filter";

import { Loader, Placeholder } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";

type Props = RouteChildrenProps<{}> & {};

const View = ({}: Props) => {
  const { taskEffects, taskSelectors, taskEvents, querySelectors } = modelEvent;
  const tasks = taskSelectors.useTasksList();
  const isLoading = taskSelectors.useTaskListLoading();
  const isEmpty = taskSelectors.useTaskListIsEmpty();
  const queryConfig = querySelectors.useQuery();
  const lastId = taskSelectors.useLastTaskId();

  useEffect(() => {
    taskEvents.resetTasks();
    taskEffects.getTasksListFx(queryConfig);
  }, [queryConfig]);
  const classes = useStyles();

  const loader = isLoading && isEmpty && <Loader />;

  return (
    <section className={classes.tasks}>
      <div className={classes.content}>
        <div className={classes.tabs}>
          <TasksTabs className={classes.tabs} />
        </div>
        {loader ? (
          loader
        ) : isEmpty ? (
          <Placeholder placeholder="Задачи отсутсвуют" />
        ) : (
          <EventList
            callback={() =>
              taskEffects.getNextTasksFx({ ...queryConfig, lastId })
            }
          >
            {tasks.map((task) => {
              return <EventRow key={task.id} data={task} variant="task" />;
            })}
          </EventList>
        )}
      </div>
      <div className={classes.filter}>
        <EventFilter />
      </div>
    </section>
  );
};
const TasksPage = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    tasks: {
      position: "relative",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      width: 1224,
      margin: `0 auto`,
    },
    content: {
      marginRight: 360 + theme.spacing(2),
      margin: theme.spacing(6, 0),
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
      borderRadius: theme.spacing(2),
      overflow: "hidden",
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
    },
    tabs: { margin: theme.spacing(0) },
    filter: {
      position: "absolute",
      top: theme.spacing(6),
      bottom: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      width: 360,
      right: 0,
    },
  })
);

export default TasksPage;
