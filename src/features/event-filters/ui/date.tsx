import { ReactElement } from "react";

import { modelEvent } from "entities/event";

import { Datepicker } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { reflect } from "@effector/reflect";

type Props = { updateData: (v: any) => void };

function View({ updateData }: Props): ReactElement {
  const query = modelEvent.selectors.useQuery();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Datepicker
        className={classes.field}
        label={t(`common:filter.dateStart`)}
        value={query.date?.[0] ?? 0}
        onChange={(event: any) => {
          updateData({ date: [event.target.value, query.date?.[1]] });
        }}
      />

      <Datepicker
        label={t(`common:filter.dateEnd`)}
        value={query.date?.[1] ?? 0}
        onChange={(event: any) => {
          updateData({ date: [query.date?.[0], event.target.value] });
        }}
      />
    </div>
  );
}

export const EventDate = reflect({
  view: View,
  bind: {
    updateData: modelEvent.events.updateQueryConfig,
  },
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    field: { marginBottom: theme.spacing(2) },
    wrapper: { marginBottom: theme.spacing(2) },
  })
);
