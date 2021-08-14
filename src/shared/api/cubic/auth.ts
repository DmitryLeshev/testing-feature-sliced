import { fetchApi } from "./base";
import type { Response } from "./models";

const BASE_PATH = "auth";

const fetchAuth = fetchApi(BASE_PATH);

export type LoginArgs = {
  login: string;
  password: string;
};

export const login = async (args: LoginArgs): Promise<Response<any>> => {
  return await fetchAuth({ login: args });
};

export const logout = async () => {
  return await fetchAuth({ logout: {} });
};

export const status = async () => {
  return await fetchAuth({ status: {} });
};
