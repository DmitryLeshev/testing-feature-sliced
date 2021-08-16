import React, { memo, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { DeviceIcon, Tabs, Loader } from "shared/components";
import { Typography } from "shared/ui/components";
import { useTabs } from "shared/hooks";
import { ITheme } from "shared/ui/theme/theme";

import tabsConfig from "./tabs.config";
import { useEffect } from "react";
import { ItemDevice } from "../Devices";
import { useRouter } from "shared/hooks";

interface Props {
  selectedItem: ItemDevice;
}

export default memo(function Details({ selectedItem }: Props) {
  const { t } = useTranslation();
  const usetabs = useTabs();
  const { match } = useRouter<{ id: string }>();

  const [details, setDetails] = useState<ItemDevice | null>(null);
  const classes = useStyles();

  console.log({ selectedItem });

  useEffect(() => {
    setDetails(selectedItem);
  }, [selectedItem]);

  if (!selectedItem) return <Loader />;

  return (
    <>
      <div className={classes.detail}>
        <DeviceIcon className={classes.icon} type={details?.type ?? 0} />
        <div className={classes.names}>
          <Typography className={classes.name} variant="h4">
            {details?.name}
          </Typography>
          <Typography className={classes.ip} variant="body1">
            {details?.ip}
          </Typography>
          <Typography className={classes.ip} variant="body1">
            {details?.mac}
          </Typography>
        </div>
        {details?.agent && (
          <Typography className={classes.status}>
            {t("devices:header.agentIsRunning")}
          </Typography>
        )}
        <Tabs
          className={classes.tabs}
          {...usetabs}
          match={match}
          tabsConfig={tabsConfig(match.params.id, details?.agent ?? true)}
        />
      </div>
      <Suspense fallback={<Loader />}>
        {/* {renderRoutes(route.routes, { className: classes.tab, fetchDevices })} */}
      </Suspense>
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    detail: {
      display: "grid",
      gridTemplateColumns: "max-content 1fr max-content",
      gridAutoRows: "max-content",
      margin: theme.spacing(0, 2, 1),
      padding: theme.spacing(1, 0, 0),
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
      alignItems: "center",
    },
    tabs: { boxShadow: "none", gridColumn: "1/5" },
    icon: {
      margin: theme.spacing(0, 2),
      width: 80,
      height: 80,
      fill: theme.palette.primary.dark,
    },
    status: { margin: theme.spacing(0, 2), color: theme.palette.success.dark },
    names: {},
    tab: {
      display: "grid",
      gap: theme.spacing(2),
      padding: theme.spacing(0, 2),
      flexGrow: 2,
      overflow: "auto",
      height: 0,
    },
    name: {},
    ip: {},
  })
);
