import { ReactElement } from "react";

import { modelEvent } from "entities/event";

import { Button } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

type Props = {};

export function EventFilterReset({}: Props): ReactElement {
  const query = modelEvent.selectors.useQuery();
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      color="primary"
      fullWidth
      onClick={() => modelEvent.events.resetQueryConfig()}
    >
      {t(`common:filter.reset`)}
    </Button>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    btn: {
      borderRadius: theme.spacing(3),
    },
  })
);
