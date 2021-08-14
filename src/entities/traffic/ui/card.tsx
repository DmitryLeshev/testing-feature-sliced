import { Card } from "shared/components";
import { Typography } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { TrafficGraph } from "./graph";
import { Traffic } from "shared/api";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

interface Props {
  data: Traffic[];
}

export const TrafficCard = ({ data }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const header = (
    <Typography variant="h5">{t("home:internet.title")}</Typography>
  );
  return (
    <Card
      className={classes.card}
      header={header}
      body={
        <>
          <Typography variant="body1" paragraph>
            Трафик
          </Typography>
          <TrafficGraph data={data} />
        </>
      }
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: {
      flexGrow: 1,
    },
  })
);
