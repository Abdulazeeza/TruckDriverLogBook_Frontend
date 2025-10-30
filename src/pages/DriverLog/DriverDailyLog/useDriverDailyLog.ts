import { useParams } from "react-router-dom";
import { useGetDriverLog } from "../../../hooks/queries/driverLog";
import { useState } from "react";

export const useDriverDailyLog = () => {
  const { driver_id } = useParams();
  const [isDriverLog, setIsDriverLog] = useState(false);
  const { data: driversLogs = [], isPending } = useGetDriverLog({
    queries: `?driver_id=${driver_id}`,
  });

  return { isPending, driversLogs, isDriverLog, setIsDriverLog };
};
