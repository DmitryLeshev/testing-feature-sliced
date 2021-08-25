import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { Card, Enumeration } from "shared/components";
import { _trDate } from "shared/utils";
import { Typography, Button, Select } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { EnumerationItem } from "shared/components/Enumeration/Enumeration";
import { useResponseSnackbar, useSelect } from "shared/hooks";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";
import api from "shared/api.old";
import { IDataSettingIndex } from "shared/api.old/update";

interface Props extends IAppContext {}

const UPDATE = {
  "update-avaible": "доступно обновление",
  "update-notneed": "самая новая версия",
  "update-license-error": "истекла лицензия",
};

const initialState: IDataSettingIndex = {
  downloaded: false,
  downloading: "auto",
  updating: "auto",
  version: "1.0.1",
};
enum SelectItems {
  auto,
  manual,
}

function Update({ toggleLoader }: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useResponseSnackbar();
  const { t } = useTranslation();
  const [data, setData] = useState<IDataSettingIndex>(initialState);
  const [update] = useState<string>(`20.01.2021`);

  const downloadUpdate = useSelect({
    selectedValue: SelectItems[data.downloading],
    items: [
      { value: 0, label: "Автоматическое" },
      { value: 1, label: "Ручное" },
    ],
  });

  const typeUpdate = useSelect({
    selectedValue:
      SelectItems[typeof data.updating !== "string" ? "manual" : data.updating],
    items: [
      { value: 0, label: "Автоматическое" },
      { value: 1, label: "Ручное" },
    ],
  });

  async function getData() {
    const { data } = await api.update.index();
    if (data) setData(data);
  }

  async function updateDate() {
    const dto: IDataSettingIndex = {
      downloading: downloadUpdate.value === 1 ? "manual" : "auto",
      updating: typeUpdate.value === 1 ? "manual" : "auto",
    };
    const res = await api.update.setAll(dto);
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    updateDate();
  }, [typeUpdate.value, downloadUpdate.value]);

  const DownloadRowKey = (
    <div className={classes.key}>
      <Typography className={classes.mr_r2}>Загрузка обновления</Typography>
      {/* <Select {...downloadUpdate} /> */}
    </div>
  );

  const DownloadRowKeySecondary = (
    <div className={classes.keySecondary}>
      <Select {...downloadUpdate} />
    </div>
  );

  const DownloadRowValue =
    downloadUpdate.value === 1 ? <Button>Загрузить</Button> : null;

  const UpdateRowKey = (
    <div className={classes.key}>
      <Typography className={classes.mr_r2}>
        Обновление (с перезагрузкой устройства)
      </Typography>
      {/* <Select {...typeUpdate} /> */}
    </div>
  );

  const UpdateRowKeySecondary = (
    <div className={classes.keySecondary}>
      <Select {...typeUpdate} />
    </div>
  );

  const UpdateRowValue =
    typeUpdate.value === 1 ? (
      <>
        {data.downloaded ? (
          <Button className={classes.mr_r2}>Удалить</Button>
        ) : (
          <Button>Установть</Button>
        )}
      </>
    ) : null;

  const StatusRowKey = (
    <Typography className={classes.mr_r2}>
      Состояние: доступно обновление
    </Typography>
  );

  const StatusRowValue = (
    <Button
      onClick={async () => {
        toggleLoader();
        const res = await api.update.checkUpdate();
        enqueueSnackbar(res);
        toggleLoader();
      }}
    >
      Проверить обновление
    </Button>
  );

  const StatusRowKeySecondary = (
    <div className={classes.keySecondary}>
      <Button
        onClick={async () => {
          toggleLoader();
          const res = await api.update.checkUpdate();
          enqueueSnackbar(res);
          toggleLoader();
        }}
      >
        Проверить обновление
      </Button>
    </div>
  );

  const enumerationItems: EnumerationItem[] = [
    {
      key: DownloadRowKey,
      keySeconday: DownloadRowKeySecondary,
      value: DownloadRowValue,
    },
    {
      key: UpdateRowKey,
      keySeconday: UpdateRowKeySecondary,
      value: UpdateRowValue,
    },
    {
      key: StatusRowKey,
      keySeconday: StatusRowKeySecondary,
    },
  ];

  const header = (
    <Typography variant="h5">
      {t("system:version-system")}: {data.version}
    </Typography>
  );
  const body = (
    <>
      <Enumeration items={enumerationItems} />
    </>
  );
  const footer = (
    <Typography variant="body1" color="textSecondary">
      {t("system:renewal")} {update}
    </Typography>
  );

  return (
    <Card
      className={classes.card}
      header={header}
      bodyProps={{ className: classes.body }}
      body={body}
      footer={footer}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    body: {},
    card: {},
    btn: { marginLeft: "auto" },
    formControl: {},
    mr_r2: { marginRight: theme.spacing(2) },
    item: {},
    key: { display: "flex", alignItems: "center" },
    keySecondary: { marginTop: theme.spacing(2) },
  })
);

export default withAppContext(Update);
