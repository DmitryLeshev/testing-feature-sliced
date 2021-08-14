import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import { selectIsNewDesign } from "shared/store/app/selector";
import { useTypedSelector } from "shared/hooks";

export const Label = (props: any) => {
  const isNewDesign = useTypedSelector(selectIsNewDesign);

  const {
    variant = "contained",
    color = null,
    shape = "square",
    children,
    style = {},
    className,
  } = props;

  const classes = useStyles();

  const rootClassName = clsx({
    [classes.root]: true,
    [classes.rounded]: shape === "rounded",
  });

  const finalStyle = { ...style };

  if (variant === "contained") {
    finalStyle.backgroundColor = isNewDesign ? "#1CC8EE" : color;
    finalStyle.color = "#FFF";
  } else {
    finalStyle.border = `1px solid ${color}`;
    finalStyle.color = color;
  }

  return (
    <Typography
      className={clsx(rootClassName, className)}
      style={finalStyle}
      variant="overline"
    >
      {!isNewDesign ? children : null}
    </Typography>
  );
};

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: theme.shape.borderRadius,
    lineHeight: "10px",
    fontSize: "10px",
    height: 20,
    minWidth: 20,
    whiteSpace: "nowrap",
    padding: theme.spacing(0.5, 1),
  },
  rounded: {
    borderRadius: 10,
    padding: theme.spacing(0.5),
  },
}));
