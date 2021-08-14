import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";

import { modelAuthCheck } from "processes/auth";
import { Loader } from "processes/loader";

import { Footer } from "widgets/footer";
import { Header } from "widgets/header";
import { Leftbar, modelLeftbar, Navbar } from "widgets/left-bar";
import { useEffect } from "react";

export type Props = {
  children: React.ReactElement;
};

export function Layout(props: Props) {
  const status = modelAuthCheck.selectors.useStatus();
  const leftbar = modelLeftbar.selectors.useLeftbar();

  const isDefault = status === "cubic-auth";

  useEffect(() => {
    const body = document.querySelector("body");
    const root = document.querySelector("#root");
    if (isDefault) {
      body?.classList.remove("root_center");
      root?.classList.remove("body_bg");
    } else {
      body?.classList.add("body_bg");
      root?.classList.add("root_center");
    }
  }, [isDefault]);

  const classes = useStyles();
  return (
    <>
      <Loader />
      {!isDefault && <Header />}
      {isDefault && (
        <Navbar
          navbar={leftbar === "OPEN"}
          toggleNavbar={modelLeftbar.events.toggleBar}
        />
      )}
      <main
        className={clsx(classes.main, {
          [classes.mainShift]: isDefault && leftbar === "OPEN",
          [classes.mainDefault]: isDefault,
        })}
      >
        {props.children}
      </main>
      {false && <Footer />}
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    main: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: `calc(100% - ${theme.drawer.closeWidth}px)`,
      marginLeft: theme.drawer.closeWidth,
      transition: theme.drawer.transition,
    },
    mainShift: {
      width: `calc(100% - ${theme.drawer.openWidth}px)`,
      marginLeft: theme.drawer.openWidth,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0,
      },
    },
    mainDefault: {
      flexGrow: 1,
      overflow: "auto",
      background: theme.palette.background.default,
      alignItems: "normal",
    },
    // main_mt: { marginTop: theme.spacing(6) },
  })
);
