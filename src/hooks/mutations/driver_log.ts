import { useMutation } from "@tanstack/react-query";
import {
  createDriverDailyLog,
  recordDriverEvent,
} from "../../endpoints/driverLog";
import {
  IDriverDailyLogPayload,
  IDriverEventPayload,
} from "../../interfaces/driverLog";

export const useRecordDriverEvent = () => {
  return useMutation({
    mutationFn: (data: { data: IDriverEventPayload; id: string }) =>
      recordDriverEvent(data),
  });
};

export const useCreateDriverDailyLog = () => {
  return useMutation({
    mutationFn: (data: IDriverDailyLogPayload) => createDriverDailyLog(data),
  });
};
