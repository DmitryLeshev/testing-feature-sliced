import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

type Props = {};

const ProfilePage = ({}: Props) => {
  const classes = useStyles();
  return <div className={classes.profile}>profile</div>;
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    profile: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
  })
);

export default ProfilePage;
