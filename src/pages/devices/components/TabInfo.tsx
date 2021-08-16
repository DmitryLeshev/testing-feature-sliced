import React, { useEffect } from "react";

import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { ScrollableContentiner } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { useParams } from "react-router-dom";
import { useState } from "react";

// import api from "shared/api";

import {
  CardAgent,
  CardPorts,
  CardResume,
  CardUsb,
  CardMain,
  CardEquipment,
  CardUsers,
} from "./Cards";

interface Props {
  route?: any;
  className?: string;
  fetchDevices: () => void;
}

function TabInfo({ route, className, fetchDevices }: Props) {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<any>({});

  useEffect(() => {
    // api.device.get({ id: Number(id) }).then((res: any) => {
    //   setData(res.data);
    // });
  }, [id]);

  console.log({ data });

  return (
    <div className={classes.tab}>
      <ScrollableContentiner>
        <div className={clsx(classes.container, className)}>
          <div className={classes.col}>
            <CardResume data={data.resume} fetchDevices={fetchDevices} />
            {data?.agentInfo?.main && <CardMain data={data?.agentInfo?.main} />}
            {data?.agentInfo?.users && (
              <CardUsers data={data?.agentInfo?.users} />
            )}
            {/* {data?.agentInfo && <CardAgent />} */}
            {data?.agentInfo && data?.ports && <CardPorts data={data.ports} />}
          </div>
          <div className={classes.col}>
            {/* {!data?.agentInfo && <CardAgent />} */}
            {data?.agentInfo?.eq && (
              <CardEquipment data={data?.agentInfo?.eq} />
            )}
            {data?.agentInfo?.usbDevices && (
              <CardUsb data={data?.agentInfo?.usbDevices} />
            )}
            {!data?.agentInfo && data?.ports && <CardPorts data={data.ports} />}
          </div>
        </div>
      </ScrollableContentiner>
    </div>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    container: {
      gridTemplateColumns: `1fr 1fr`,
      gridAutoRows: `min-content`,
      paddingBottom: theme.spacing(1.5),
      alignItems: "baseline",
      flexDirection: "column",
      height: "100%",
      paddingTop: theme.spacing(1.5),
    },
    tab: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: 0,
    },
    col: { display: "grid", gap: theme.spacing(2) },
  })
);

export default TabInfo;
