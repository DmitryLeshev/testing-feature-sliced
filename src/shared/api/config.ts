import { isCubicMode } from "shared/config";

export type Response<T> = {
  status?: boolean;
  data?: T;
  msg?: string;
};

export const { host, protocol } = window.location;

export const PROTOCOL = protocol === "http" ? "http" : "http";

export const PREFIX = isCubicMode ? "/index.php" : "";

export const SERVER_HOST = isCubicMode ? "192.168.0.1" : "185.220.33.197";

export const HOST = host.startsWith("localhost") ? SERVER_HOST : host;

export const URL = `${PROTOCOL}://${HOST}`;
export const SW_URL = `ws://192.168.0.1:9503/ws`;

export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "/",
  "Cache-Control": "no-cache",
};

export const METHOD = "POST";

export const CREDENTIALS = "include";

export const DEFAULT_OPTIONS: RequestInit = {
  method: METHOD,
  headers: HEADERS,
  credentials: CREDENTIALS,
};

// credentials
