import { fetchApi } from "./base";
import type { Response, Router, RouterRange } from "./models";

const BASE_PATH = "setting";

const fetchRouter = fetchApi(BASE_PATH);

export type TogleWifiArgs = {
  range: RouterRange;
  started: boolean;
};

export const togleWifi = async (
  args: TogleWifiArgs
): Promise<Response<any>> => {
  return await fetchRouter({ togleWifi: args });
};

export const getWifiTogleInfo = async (): Promise<Response<Router[]>> => {
  // console.log("getWifiTogleInfo");
  return await fetchRouter({ getWifiTogleInfo: {} });
};
