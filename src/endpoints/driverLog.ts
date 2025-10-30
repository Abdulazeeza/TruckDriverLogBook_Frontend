import httpClient from "../apiGateway/axiosHandler";
import {
  IDriverDailyLogPayload,
  IDriverEventPayload,
} from "../interfaces/driverLog";

export const getDriverLog = (queries: string = "") => {
  const response = httpClient.get(`/driver-logs/${queries}`);
  return response;
};

export const getDriverDailyEvent = (driver_log_id: string) => {
  const response = httpClient.get(`/driver-logs/${driver_log_id}/events/`);
  return response;
};

export const getDriverLogDetails = (driver_log_id: string) => {
  const response = httpClient.get(`/driver-logs/${driver_log_id}/`);
  return response;
};

export const recordDriverEvent = ({
  data,
  id,
}: {
  data: IDriverEventPayload;
  id: string;
}) => {
  const response = httpClient.patch(`/driver-logs/${id}/add-event/`, data);
  return response;
};

export const createDriverDailyLog = (data: IDriverDailyLogPayload) => {
  const response = httpClient.post("/driver-logs/", data);
  return response;
};
