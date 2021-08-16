import { ITab } from "shared/components/Tabs/Tabs";

const tabsConfig = (id: string, agent: boolean): ITab[] => {
  const tabs: any = ["info", "programs", "tasks", "incidents"].filter((tab) => {
    if (!agent && tab === "programs") return false;
    return true;
  });
  return tabs.map((tab: string, idx: number) => {
    return {
      i18next: `devices:${tab}.tab`,
      url: `/devices/local/${id}/${tab}`,
      id: idx,
    };
  });
};

export default tabsConfig;
