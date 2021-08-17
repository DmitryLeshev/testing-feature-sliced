import React, { memo } from "react";

import { useModal } from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";
import CardAction from "./Card";
import { CachedIcon } from "shared/assets/icons";

interface Props extends IAppContext {}

function Reboot({ reboot }: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const classes = useStyles();

  const header = (
    <Typography variant="h5">{t("system:reboot-reset")}</Typography>
  );
  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t("system:reboot")}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            await reboot();
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

function RebootV2({ reboot }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <CardAction
      action={reboot}
      className={classes.card}
      label={t("system:reboot")}
      icon={CachedIcon}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "reboot" },
    btn: { marginLeft: "auto" },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    modal: { minWidth: 600 },
  })
);

export default withAppContext(RebootV2);
