import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { Card, Loader, Placeholder } from "shared/components";
import { ScrollableContentiner } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import { CardHeader } from "shared/components/Task/components";
import { modelDevices } from "entities/device";
import { useGetParameter } from "shared/hooks";

// import api from "shared/api.old";

interface ITask {
  id: number;
  crt: number;
  type: number;
  class: number;
  tst: number;
  status: string;
  titleVars: string[];
}

interface Props {
  route: any;
  className: string;
}

export default memo(function TabEvents({ className }: Props) {
  const { t } = useTranslation();
  const tab = useGetParameter("tab");
  const isIncident = tab === "incidents";
  const device = modelDevices.selectors.useDevice();
  const events = isIncident ? device.incidents : device.tasks;
  const isLoading = isIncident
    ? modelDevices.selectors.useIncidentsLoading()
    : modelDevices.selectors.useTasksLoading();

  console.log({ isIncident, isLoading, events, device });

  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)}>
      {isLoading && !events?.length ? (
        <Loader />
      ) : !events?.length ? (
        <Placeholder
          placeholder={
            isIncident
              ? t("devices:incident-placeholder")
              : t("devices:tasks-placeholder")
          }
          animation
        />
      ) : (
        <ScrollableContentiner>
          <Card
            className={classes.wrapper}
            bodyProps={{ className: classes.body }}
            body={
              <ul className={classes.list}>
                {events.map((el: any, index: number) => {
                  const taskCardHeaderProps = {
                    taskNumber: el.type,
                    id: el.id,
                    taskType: isIncident ? 1 : 4,
                    titleVars: el.titleVars,
                    crt: el.crt,
                    dashboard: true,
                    incident: isIncident,
                    priority: el.priority,
                  };
                  return (
                    <li key={index} className={classes.item}>
                      <Link
                        className={classes.link}
                        to={
                          !isIncident
                            ? `/events/tasks/in-work/${el.id}`
                            : `/events/incidents/${el.id}`
                        }
                      >
                        <CardHeader {...taskCardHeaderProps} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            }
          />
        </ScrollableContentiner>
      )}
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      gridTemplateColumns: `1fr`,
      gridAutoRows: `auto`,
      flexGrow: 1,
      padding: 0,
    },
    wrapper: { margin: theme.spacing(1, 2, 0), padding: 0, borderRadius: 0 },
    icon: { marginLeft: "auto" },
    btn: { marginRight: theme.spacing(2), "&:last-child": { marginRight: 0 } },
    body: { padding: 0 },
    list: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      transition: "0.3s",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:active": {
        backgroundColor: theme.palette.action.focus,
      },
    },
    link: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
    "@media all and (max-width: 1200px)": {
      container: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  })
);
