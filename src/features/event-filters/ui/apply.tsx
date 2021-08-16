import { ReactElement } from "react";

import { modelEvent } from "entities/event";

import { Button } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

type Props = {};

export function EventFilterToApply({}: Props): ReactElement {
  const query = modelEvent.querySelectors.useQuery();
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => {
        if (true) {
          modelEvent.taskEffects.getTasksListFx(query);
        } else modelEvent.incidentEffects.getIncidentsListFx(query);
      }}
    >
      {t(`common:filter.apply`)}
    </Button>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    btn: {
      borderRadius: theme.spacing(3),
      color: "#fff",
      //   color: theme.palette.getContrastText(theme.palette.primary.main),
      boxShadow: `${theme.palette.primary.dark} 1px 0 8px`,
    },
  })
);
