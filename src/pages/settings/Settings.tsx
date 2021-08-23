import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { Page } from "shared/components";
import { ScrollableContentiner } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import { Internet, Local, Wifi5, Wifi24 } from "./components";
import api from "shared/api.old";
import { NewDesignRouter } from "shared/assets/icons";

interface Props {
  route: any;
}

export default memo(function Settings({ route }: Props) {
  const { t } = useTranslation();
  const [settings, setSettings] = React.useState<any | null>(null);
  const [lanwan, setLanwan] = React.useState<any | null>(null);
  React.useEffect(() => {
    api.setting.getWifiInfo().then((res: any) => {
      const { data } = res;
      if (data) setSettings(data);
    });
    api.setting.getNetworkInfo().then((res: any) => {
      const { data } = res;
      if (data) setLanwan(data);
    });
  }, []);

  const classes = useStyles();
  return (
    <Page title={t("settings:page")}>
      <ScrollableContentiner>
        <div className={classes.template}>
          <div className={classes.row}>
            <Wifi24 settings={settings} />
            <Wifi5 settings={settings} />
            <Local lan={lanwan?.lan ?? null} />
            <Internet wan={lanwan?.wan ?? null} />
          </div>
          <NewDesignRouter className={classes.router} />
        </div>
      </ScrollableContentiner>
      {/* {renderRoutes(route.routes)} */}
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    template: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(6, 3),
      width: "1224px",
      margin: "0 auto",
      gap: theme.spacing(3),
      alignItems: "center",
    },
    col: { width: "50%", display: "grid", gap: theme.spacing(3) },
    router: {
      margin: theme.spacing(6, 0),
      position: "absolute",
      zIndex: -1,
      bottom: 0,
    },
    row: {
      display: "flex",
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: theme.spacing(2),
    },
  })
);
