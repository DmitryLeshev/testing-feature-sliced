import React, { memo } from "react";

import { useModal } from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";
import { CachedIcon, RefreshIcon, RssFeedIcon } from "shared/assets/icons";
import CardAction from "./Card";

interface Props extends IAppContext {}

function CustomModal({ reset, usemodal }: any) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Modal className={classes.modal} {...usemodal}>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            await reset();
            usemodal.closeModal();
          }}
          fullWidth
        >
          {t("system:yes")}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t("system:no")}
        </Button>
      </div>
    </Modal>
  );
}

function ResetV2(props: IAppContext) {
  const classes = useStyles();
  const { t } = useTranslation();

  const usemodal = useModal();

  return (
    <>
      <Button
        className={classes.WrapperBtn}
        color="primary"
        onClick={usemodal.openModal}
      >
        <div className={classes.card2}>
          <RefreshIcon className={classes.icon} />
          <Typography variant="h5">{t("system:reset")}</Typography>
        </div>
      </Button>
      <CustomModal usemodal={usemodal} reset={props.reset} />
    </>
  );
}

function Reset({ reset }: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const classes = useStyles();

  const header = (
    <Typography variant="h5">{t("system:system-reset")}</Typography>
  );
  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t("system:reset")}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            await reset();
            usemodal.closeModal();
          }}
          fullWidth
        >
          {t("system:yes")}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t("system:no")}
        </Button>
      </div>
    </>
  );
  return (
    <>
      <Card header={header} footer={footer} />
      <Modal className={classes.modal} {...usemodal} children={modal} />
    </>
  );
}

function Resetv3({ reset }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <CardAction
      action={reset}
      className={classes.card}
      label={t("system:reset")}
      icon={RefreshIcon}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "reset" },
    btn: { marginLeft: "auto" },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    modal: { minWidth: 600 },
    card2: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 198,
      height: 176,
    },
    icon: { width: 84, height: 84, marginBottom: theme.spacing(1) },
    WrapperBtn: {},
  })
);

export default withAppContext(Resetv3);
