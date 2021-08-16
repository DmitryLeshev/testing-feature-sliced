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
import { useRouter } from "shared/hooks";

interface Props {}

export function EventFilter({}: Props): ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const header = <Typography>{t(`common:filter.title`)}</Typography>;

  const { location } = useRouter();

  const isIncident = location.pathname.includes("incidents");

  return (
    <Card
      className={classes.card}
      header={header}
      bodyProps={{ className: classes.body }}
      body={
        <>
          <EventDevices />
          {!isIncident && <EventFilterCriticality />}
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
    body: { gap: theme.spacing(2) },
  })
);
