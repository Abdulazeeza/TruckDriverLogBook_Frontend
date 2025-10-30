import httpClient from "../apiGateway/axiosHandler";
import {
  ILoginDriverPayload,
  IRegisterDriverPayload,
} from "../interfaces/driver";

export const registerDriver = (data: IRegisterDriverPayload) => {
  const response = httpClient.post("/drivers/", data);
  return response;
};

export const loginDriver = (data: ILoginDriverPayload) => {
  const response = httpClient.post("/drivers/login/", data);
  return response;
};
