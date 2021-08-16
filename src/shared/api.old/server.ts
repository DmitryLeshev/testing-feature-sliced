import { fetchData } from "shared/fetch";
import { Response } from "shared/types/response";

interface RegistrationDTO {
  domain: string;
  init_key: string;
}

export interface AnketaField {
  name: string;
  title: string;
  type?: string;
  value?: string;
}

export interface IDataRegistration {
  anketa: AnketaField[];
}

export interface AnketaDTO {
  anketa: AnketaField[];
}

export interface IDataAnketa {}

export interface IApiServer {
  registration: (dto: RegistrationDTO) => Promise<Response<AnketaField[]>>;
  anketa: (dto: AnketaDTO) => Promise<Response<IDataAnketa>>;
  disconnect: () => any;
}
export const fetchServer = fetchData("server");

const server: IApiServer = {
  registration: async (dto) => await fetchServer({ registration: dto }),
  anketa: async (dto) => await fetchServer({ anketa: dto }),
  disconnect: async () => await fetchServer({ disconnect: {} }),
};

export { server };
