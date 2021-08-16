import React, { memo } from "react";
import { renderRoutes } from "react-router-config";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { Page } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";

import { Reboot, Reset, Update, LoginPass, Connection } from "./components";
import { ScrollableContentiner } from "shared/ui/components";
import { Agent } from "./components/Agent";

interface Props {
  route: any;
}

export default memo(function System({ route }: Props) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Page title={t("system:page")}>
      <ScrollableContentiner>
        <div className={classes.template}>
          <Update />
          <Reboot />
          <Reset />
          <LoginPass />
          <Connection />
          <Agent />
        </div>
      </ScrollableContentiner>
      {renderRoutes(route.routes)}
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
        "loginpass connect"
        "loginpass agent"
      `,
      gap: theme.spacing(3),
      alignItems: "baseline",
    },
  })
);
