import { store } from "shared/store";

import { DEFAULT_OPTIONS, URL, Response } from "./config";
import { modelNotifier } from "shared/lib/notifier";

async function request({
  path,
  args,
  token,
}: {
  path: string;
  args?: any;
  token?: string;
}) {
  try {
    const options: RequestInit = {
      ...DEFAULT_OPTIONS,
      body: JSON.stringify({ path, args, token }),
    };
    const response = await fetch(URL, options);
    const data: Response<any> = await response.json();
    if (data.msg) {
      store.dispatch(
        modelNotifier.actions.enqueueSnackbar({
          message: typeof data.msg === "string" ? data.msg : "default-message",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: data.status ? "success" : "error",
          },
        })
      );
    }
    return data;
  } catch (error) {
    console.log("[request] block catch", error);
    return error;
  }
}

export { request };
