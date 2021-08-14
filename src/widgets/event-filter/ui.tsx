import { createStyles, makeStyles } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "shared/components";
import { Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import {
  EventFilterToApply,
  EventFilterReset,
  EventFilterCriticality,
  EventDevices,
  EventDate,
} from "features/event-filters";

interface Props {}

export function EventFilter({}: Props): ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const header = <Typography>{t(`common:filter.title`)}</Typography>;

  return (
    <Card
      className={classes.card}
      header={header}
      bodyProps={{ className: classes.body }}
      body={
        <>
          <EventDevices />
          <EventFilterCriticality />
          <EventDate />
          <EventFilterToApply />
          <EventFilterReset />
        </>
      }
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { flexGrow: 1 },
    body: {
      //   position: "absolute",
      //   top: theme.spacing(6),
      //   bottom: theme.spacing(6),
      //   display: "flex",
      //   flexDirection: "column",
      gap: theme.spacing(2),
      //   padding: theme.spacing(6),
      //   width: 360,
      //   backgroundColor: theme.palette.background.paper,
      //   right: theme.spacing(6),
      //   borderRadius: theme.spacing(2),
    },
  })
);
