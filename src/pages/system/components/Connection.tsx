import React, { memo } from "react";

import { useModal, useInput, useResponseSnackbar } from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button, Input } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { AnketaDTO } from "shared/api.old/server";
import api from "shared/api.old";
import { useEffect } from "react";
import { RssFeedIcon } from "shared/assets/icons";

interface Props {}

interface IInputs {
  name: string;
  value: string;
  className: string;
  type: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default memo(function Connection({}: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useResponseSnackbar();
  const usemodal = useModal();
  const domain = useInput("rstest.gaklink.com", {
    label: t(`system:domain`),
  });
  const key = useInput("pChiuXaSdVS6fpyH", {
    label: t(`system:key-label`),
  });

  const [anketa, setAnketa] = React.useState<IInputs[] | null>(null);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAnketa((prev) => {
      if (!prev) return null;
      const inputs = prev.map((input) => {
        if (input.name === name) {
          input.value = value;
        }
        return input;
      });
      return inputs;
    });
  }

  async function loadAnketa() {
    const res = await api.server.registration({
      domain: domain.value,
      init_key: key.value,
    });
    const inputs = res?.data?.map((field) => {
      return {
        name: field.name,
        value: field.value
          ? field.value
          : field.type === "date"
          ? "1999-01-01"
          : "",
        className: classes.input,
        type: field.type ?? "text",
        label: field.title,
        onChange,
      };
    });
    setAnketa(inputs ?? null);
  }

  async function saveAnketa() {
    const dto: AnketaDTO = {
      anketa:
        anketa?.map((input) => {
          const { name, value, type, label } = input;
          return { name, title: label, type, value };
        }) ?? [],
    };
    const res = await api.server.anketa(dto);
    setAnketa(null);
    usemodal.closeModal();
    enqueueSnackbar(res);
    await getConnected();
  }

  async function getConnected() {
    api.main.isServerConnected().then((res: any) => {
      setIsConnected(res.msg);
    });
  }

  async function disconnect() {
    const res = await api.server.disconnect();
    enqueueSnackbar(res);
    return await getConnected();
  }

  useEffect(() => {
    getConnected();
  }, []);

  const header = <Typography variant="h5">{t("system:connection")}</Typography>;

  const RenderKey = (
    <>
      <Typography paragraph variant="h4">
        {t("system:key")}
      </Typography>
      <Input className={classes.input} {...domain} fullWidth />
      <Input className={classes.input} {...key} fullWidth />
      <Button className={classes.btn} onClick={loadAnketa}>
        {t(`system:send`)}
      </Button>
    </>
  );

  const RenderAnketa = (
    <>
      <Typography paragraph variant="h4">
        {t("system:anketa")}
      </Typography>
      {anketa?.map((input, idx) => {
        return <Input key={idx} {...input} />;
      })}
      <Button
        className={classes.btn}
        onClick={saveAnketa}
        disabled={anketa?.some((el) => !el.value)}
      >
        {t(`system:send`)}
      </Button>
    </>
  );

  const footer = (
    <Button
      className={classes.btn}
      onClick={async () => {
        if (!isConnected) return usemodal.openModal();
        else disconnect();
      }}
    >
      {!isConnected ? t("system:connect") : t("system:disconnect")}
    </Button>
  );
  const modal = anketa ? RenderAnketa : RenderKey;
  return (
    <>
      <Button
        color="primary"
        onClick={async () => {
          if (!isConnected) return usemodal.openModal();
          else disconnect();
        }}
      >
        <div className={classes.card2}>
          <RssFeedIcon className={classes.icon} />
          <Typography variant="h5">
            {!isConnected ? t("system:connect") : t("system:disconnect")}
          </Typography>
        </div>
      </Button>
      {/* <Card header={header} footer={footer} /> */}
      <Modal className={classes.modal} {...usemodal} children={modal} />
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "reboot" },
    btn: { marginLeft: "auto" },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    modal: { minWidth: 800, display: "flex", flexDirection: "column" },
    input: { marginBottom: theme.spacing(2) },
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
  })
);
