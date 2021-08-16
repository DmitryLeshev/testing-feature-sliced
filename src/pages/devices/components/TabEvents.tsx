import React, { memo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import useRouter from "shared/hooks/useRouter";
import { Card, Loader, Placeholder } from "shared/components";
import { ScrollableContentiner } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import { CardHeader } from "shared/components/Task/components";

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
  const params = useParams<{ id: string; tab: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const { location } = useRouter();

  const isIncident = location.pathname
    .split("/")
    .some((params) => params === "incidents");

  useEffect(() => {
    setLoading(true);
    const method = isIncident ? "getIncidents" : "getTasks";
    // api.device[method]({ id: Number(params.id) }).then((res: any) => {
    //   setTasks(res.msg);
    //   setLoading(false);
    // });
  }, []);

  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)}>
      {loading ? (
        <Loader />
      ) : !tasks.length ? (
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
                {tasks.map((el: any, index: number) => {
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
  })
);
