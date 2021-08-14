import { RouteChildrenProps } from "react-router-dom";
import { reflect } from "@effector/reflect";

import { useEffect } from "react";
import { modelEvent, EventRow, TasksTabs, EventList } from "entities/event";

import { EventFilter } from "widgets/event-filter";

import { Loader } from "shared/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

type Props = RouteChildrenProps<{}> & {};

const View = ({ match }: Props) => {
  const { effects, selectors } = modelEvent;
  const tasks = selectors.useTasksList();
  const isLoading = selectors.useTaskListLoading();
  const isEmpty = selectors.useTaskListIsEmpty();

  useEffect(() => {
    effects.getTasksListFx({ progressId: 1 });
  }, []);
  const classes = useStyles();

  if (isLoading && isEmpty) return <Loader />;
  return (
    <section className={classes.tasks}>
      <div className={classes.content}>
        {isEmpty ? (
          "Пусто"
        ) : (
          <EventList>
            {tasks.map((task) => {
              return (
                <EventRow
                  className={classes.incident}
                  key={task.id}
                  data={task}
                  variant="incident"
                />
              );
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
const IncidentsPage = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    tasks: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      marginRight: 360 + theme.spacing(12),
      margin: theme.spacing(6),
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    },
    tabs: {},
    filter: {
      position: "absolute",
      top: theme.spacing(6),
      bottom: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      width: 360,
      right: theme.spacing(6),
    },
    incident: {
      "&:first-child": {
        borderRadius: `16px 16px 0px 0px`,
      },
    },
  })
);

export default IncidentsPage;
