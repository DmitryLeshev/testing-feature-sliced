import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { NewDesignGakLink } from "shared/assets/icons";

export type Props = {};

export function Header(props: Props) {
  const classes = useStyles();
  return (
    <>
      <header className={classes.header}>
        <NewDesignGakLink />
      </header>
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
