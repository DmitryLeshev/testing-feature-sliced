import { colors } from "@material-ui/core";
import { Label } from "./ui/label";

import {
  StorageIcon,
  NewDesignHome,
  NewDesignShieldFail,
  NewDesignAlertInfo,
  NewDesignWifi,
  NewDesignSettings,
  NewDesignEdit,
} from "shared/assets/icons";

export const navigationConfig = () => {
  return [
    {
      title: "Pages",
      pages: [
        {
          i18nkey: "home",
          title: "Главная",
          href: "/home",
          isActive: "home",
          icon: NewDesignHome,
        },
        {
          i18nkey: "tasks",
          title: "Задачи",
          isActive: "tasks",
          href: "/tasks",
          icon: NewDesignShieldFail,
          label: ({
            count = {
              countTasks: 0,
            },
          }) =>
            count.countTasks > 0 && (
              <Label color={colors.indigo[500]} shape="rounded">
                {count && count.countTasks}
              </Label>
            ),
        },
        {
          i18nkey: "incident",
          title: "Инцидент",
          isActive: "incidents",
          href: "/incidents",
          icon: NewDesignAlertInfo,
          label: ({
            count = {
              countAttacks: 0,
            },
          }) =>
            count.countAttacks > 0 && (
              <Label color={colors.red[500]} shape="rounded">
                {count && count.countAttacks}
              </Label>
            ),
        },
        {
          i18nkey: "devices",
          title: "Устройства",
          href: `/devices`,
          isActive: "devices",
          icon: NewDesignWifi,
        },
        {
          i18nkey: "settings",
          title: "Настройки",
          href: "/settings",
          isActive: "settings",
          icon: NewDesignSettings,
        },
      ],
    },
    {
      title: "Support",
      pages: [],
    },
  ];
};

export const settingsConfig = [
  {
    title: "Support",
    pages: [
      {
        i18nkey: "system",
        title: "Система",
        href: "/system",
        isActive: "system",

        icon: StorageIcon,
      },
      {
        i18nkey: "interface",
        title: "Интерфейс",
        href: "/profile",
        isActive: "interface",
        icon: NewDesignEdit,
      },
    ],
  },
];
