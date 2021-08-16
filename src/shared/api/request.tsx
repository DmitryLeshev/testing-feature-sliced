import { store } from "shared/store";

import { DEFAULT_OPTIONS, URL, Response } from "./config";
import { modelNotifier } from "shared/lib/notifier";

const controller = new AbortController();
const signal = controller.signal;

function abortFetching() {
  console.log("Now aborting");
  controller.abort();
}

async function request({
  path,
  args,
  token,
}: {
  path: string;
  args?: any;
  token?: string;
  debug?: boolean;
}) {
  try {
    const options: RequestInit = {
      ...DEFAULT_OPTIONS,
      signal: signal,
      body: JSON.stringify({ path, args, token: "DEBUG" }),
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

export { request, abortFetching };
