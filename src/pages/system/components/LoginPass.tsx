import React, { memo } from "react";

import {
  useModal,
  useInput,
  useValidations,
  useResponseSnackbar,
} from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button, Input } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import {
  minValue,
  stringMustContainCpecoalCharacter,
  stringMustContainNumber,
} from "shared/utils/validations";
import api from "shared/api.old";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";

interface Props extends IAppContext {}

function LoginPass({ toggleLoader }: Props) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useResponseSnackbar();
  const usemodal = useModal();
  const login = useInput("");
  const loginValid = useValidations({
    validations: [minValue(6)],
    value: login.value,
  });
  const password = useInput("");
  const passwordValid = useValidations({
    validations: [
      stringMustContainNumber(2),
      stringMustContainCpecoalCharacter(2),
      minValue(8),
    ],
    value: password.value,
  });
  const classes = useStyles();
  const header = <Typography variant="h5">{t("system:login-pass")}</Typography>;
  const body = (
    <>
      <Input
        {...login}
        {...loginValid}
        className={classes.field}
        label={t("system:login")}
      />
      <Input
        {...password}
        {...passwordValid}
        type="password"
        label={t("system:password")}
      />
    </>
  );
  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t("system:save")}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            toggleLoader();
            const res = await api.setting.changeAuthData({
              login: login.value,
              password: password.value,
            });
            enqueueSnackbar(res);
            usemodal.closeModal();
            toggleLoader();
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
      <Card
        className={classes.card}
        header={header}
        body={body}
        footer={footer}
      />
      <Modal className={classes.modal} {...usemodal} children={modal} />
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "loginpass" },
    btn: { marginLeft: "auto" },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    field: { marginBottom: theme.spacing(2) },
    modal: { minWidth: 600 },
  })
);

export default withAppContext(LoginPass);
