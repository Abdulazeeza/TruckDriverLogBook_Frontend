import { useQuery } from "@tanstack/react-query";
import {
  getDriverDailyEvent,
  getDriverLog,
  getDriverLogDetails,
} from "../../endpoints/driverLog";
import { IDriverLog, IDriverLogEvent } from "../../interfaces/driverLog";

export const useGetDriverLog = ({ queries }: { queries?: string }) => {
  return useQuery({
    queryKey: ["getDriverLog", queries],
    staleTime: Infinity,
    queryFn: () =>
      getDriverLog(queries).then((res: { data: { data: IDriverLog[] } }) => {
        return res?.data?.data;
      }),
  });
};

export const useGetDriverDailyEvent = ({
  driver_log_id,
}: {
  driver_log_id: string;
}) => {
  return useQuery({
    queryKey: ["getDriverDailyEvent", `${driver_log_id}`],
    staleTime: Infinity,
    queryFn: () =>
      getDriverDailyEvent(driver_log_id).then(
        (res: { data: { data: IDriverLogEvent[] } }) => {
          return res?.data?.data;
        }
      ),
  });
};

export const useGetDriverLogDetails = ({
  driver_log_id,
}: {
  driver_log_id: string;
}) => {
  return useQuery({
    queryKey: ["getDriverLogDetails", `${driver_log_id}`],
    staleTime: Infinity,
    queryFn: () =>
      getDriverLogDetails(driver_log_id).then(
        (res: { data: { data: IDriverLogEvent[] } }) => {
          return res?.data?.data;
        }
      ),
  });
};
