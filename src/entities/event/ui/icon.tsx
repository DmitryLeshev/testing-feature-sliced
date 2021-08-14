import { createStyles, makeStyles, useTheme } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { NewDesignAlertInfo, NewDesignShieldFail } from "shared/assets/icons";
import clsx from "clsx";

interface Props {
  variant: "incident" | "task";
  className?: string;
}

export function EventIcon({ variant, className }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  return variant === "task" ? (
    <NewDesignAlertInfo
      className={clsx(classes.icon, className)}
      fill={theme.palette.primary.main}
    />
  ) : (
    <NewDesignShieldFail
      className={clsx(classes.icon, className)}
      fill={theme.palette.secondary.main}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    icon: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  })
);
