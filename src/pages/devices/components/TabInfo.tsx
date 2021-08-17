import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { ScrollableContentiner } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import { modelDevices } from "entities/device";
// import api from "shared/api.old";

import {
  CardAgent,
  CardPorts,
  CardResume,
  CardUsb,
  CardMain,
  CardEquipment,
  CardUsers,
} from "./Cards";
import { reflect } from "@effector/reflect";
import { useGetParameter } from "shared/hooks";

interface Props {
  className?: string;
}

function View({ className }: Props) {
  const classes = useStyles();

  const device = modelDevices.selectors.useDevice();
  const id = useGetParameter("id");

  return (
    <div className={classes.tab}>
      <ScrollableContentiner>
        <div className={clsx(classes.container, className)}>
          {/* <div className={classes.col}> */}
          <CardResume data={device?.info?.resume} />
          {device?.info?.agentInfo?.main && (
            <CardMain data={device?.info?.agentInfo?.main} />
          )}
          {device?.info?.agentInfo?.users && (
            <CardUsers data={device?.info?.agentInfo?.users} />
          )}
          {/* {device?.info?.agentInfo && <CardAgent />} */}
          {device?.info?.agentInfo && device?.info?.ports && (
            <CardPorts data={device?.info?.ports} />
          )}
          {/* </div>
          <div className={classes.col}> */}
          {/* {!device?.info?.agentInfo && <CardAgent />} */}
          {device?.info?.agentInfo?.eq && (
            <CardEquipment data={device?.info?.agentInfo?.eq} />
          )}
          {device?.info?.agentInfo?.usbDevices && (
            <CardUsb data={device?.info?.agentInfo?.usbDevices} />
          )}
          {!device?.info?.agentInfo && device?.info?.ports && (
            <CardPorts data={device?.info?.ports} />
          )}
          {/* </div> */}
        </div>
      </ScrollableContentiner>
    </div>
  );
}

const TabInfo = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateColumns: `1fr`,
      gridAutoRows: `min-content`,
      alignItems: "baseline",
      flexDirection: "column",
      // padding: theme.spacing(1.5),
      gap: theme.spacing(2),
    },
    tab: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: 0,
      margin: theme.spacing(0, 2),
    },
    col: { display: "grid", gap: theme.spacing(2) },
  })
);

export default TabInfo;
