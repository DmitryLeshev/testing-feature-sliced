import React from "react";
import { Theme } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

export interface ITheme extends Theme {
  drawer: {
    closeWidth: number;
    openWidth: number;
    transition: string;
  };
  header: {
    height: number;
  };
}

export type Color = string;

export interface IColors {
  primary: Color;
  secondary: Color;
}

export type Mode = "dark" | "light" | undefined;

export enum Modes {
  DARK = "dark",
  LIGHT = "light",
}

interface Props {
  type: Mode;
  colors: IColors;
}

export const useCustomTheme = (props: Props) => {
  const { type, colors } = props;
  const theme = React.useMemo(
    () =>
      createTheme(
        {
          typography: {
            fontFamily: ['"Montserrat"'].join(","),
          },
          palette: {
            type: type,
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary,
            },
            background: {
              default: type === "dark" ? "rgba(20, 20, 42, 1)" : "#F0F0F0",
              paper: type === "dark" ? "rgba(33, 33, 58, 0.8)" : "#FFFFFF",
            },
          },
        },
        {
          drawer: {
            closeWidth: 0,
            openWidth: 264,
            transition: "0.3s ease-out",
          },
          header: {
            height: 72,
          },
          main: {},
        }
      ),
    [type, colors]
  );

  return theme;
};

export default useCustomTheme;
