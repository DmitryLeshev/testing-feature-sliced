import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { Page } from "shared/components";
import { ScrollableContentiner } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import { Internet, Local, Wifi5, Wifi24 } from "./components";
import api from "shared/api.old";

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
          <div className={classes.col}>
            <Local lan={lanwan?.lan ?? null} />
            <Wifi24 settings={settings} />
          </div>
          <div className={classes.col}>
            <Internet wan={lanwan?.wan ?? null} />
            <Wifi5 settings={settings} />
          </div>
        </div>
      </ScrollableContentiner>
      {/* {renderRoutes(route.routes)} */}
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    template: {
      display: "grid",
      padding: theme.spacing(1.5, 3),
      gridTemplateAreas: `
        "update update"
        "reboot reset"
      `,
      gap: theme.spacing(3),
      alignItems: "baseline",
    },
    col: { display: "grid", gap: theme.spacing(2) },
  })
);
