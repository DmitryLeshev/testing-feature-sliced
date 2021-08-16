import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  useInput,
  useModal,
  useResponseSnackbar,
  useSelect,
} from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button, Input, Select } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import api from "shared/api.old";
import { SettingWifiDTO } from "shared/api.old/setting";
import useValidations from "shared/hooks/useValidations";

import { validations } from "shared/utils";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";
import { ISetting } from "./Wifi-5";

interface Props extends IAppContext {
  settings: {
    "2.4": ISetting;
  };
}
const { minValue, stringMustContainNumber, stringMustContainCpecoalCharacter } =
  validations;

function Wifi24({ toggleLoader, settings }: Props) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useResponseSnackbar();
  const usemodal = useModal();
  const essid = useInput(settings?.["2.4"]?.ssid ?? "", { name: "essid" });
  const eesidValid = useValidations({
    validations: [minValue(5)],
    value: essid.value,
  });

  const password = useInput(settings?.["2.4"]?.password ?? "", {
    name: "passwd",
  });
  const passwordValid = useValidations({
    validations: [
      stringMustContainNumber(2),
      stringMustContainCpecoalCharacter(2),
      minValue(9),
    ],
    value: password.value,
  });

  const width = useSelect({
    items: [
      { value: 20, label: "20 Mhz" },
      { value: 40, label: "40 Mhz" },
      { value: 80, label: "80 Mhz" },
    ],
    selectedValue: settings?.["2.4"]?.width ?? 20,
    label: t("settings:width"),
  });

  const canal24 = useSelect({
    items: Array.from(Array(13).keys()).map((canal) => {
      canal = ++canal;
      return { label: String(canal), value: canal };
    }),
    selectedValue: settings?.["2.4"]?.channel ?? 1,
    label: t("settings:canal"),
  });

  async function saveSettings() {
    const dto: SettingWifiDTO = {
      range: "2.4",
      essid: essid.value,
      passwd: password.value,
      channel: Number(canal24.value),
      width: Number(width.value),
    };
    toggleLoader();
    const res = await api.setting.settingWifi(dto);
    enqueueSnackbar(res);
    essid.onChange();
    password.onChange();
    toggleLoader();
  }

  const classes = useStyles();
  const header = <Typography variant="h5">{t("settings:wifi-2.4")}</Typography>;
  const body = (
    <>
      <Input
        className={classes.field}
        {...essid}
        {...eesidValid}
        label={t("settings:essid")}
      />
      <Input
        className={classes.field}
        {...password}
        {...passwordValid}
        label={t("settings:password")}
      />
      <Select className={classes.field} {...canal24} />
      <Select className={classes.field} {...width} />
    </>
  );
  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t("settings:save")}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t("settings:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            usemodal.closeModal();
            await saveSettings();
          }}
          fullWidth
        >
          {t("settings:yes")}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t("settings:no")}
        </Button>
      </div>
    </>
  );
  return (
    <>
      <Card header={header} body={body} footer={footer} />
      <Modal {...usemodal} children={modal} />
    </>
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
    field: { marginBottom: theme.spacing(2) },
  })
);
export default withAppContext(Wifi24);
