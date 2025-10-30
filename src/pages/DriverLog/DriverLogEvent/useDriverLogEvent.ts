import { useParams } from "react-router-dom";
import {
  useGetDriverDailyEvent,
  useGetDriverLogDetails,
} from "../../../hooks/queries/driverLog";
import { formatForPloting } from "../../../utils";
import { useState } from "react";

export const useDriverLogEvent = () => {
  const { log_id } = useParams();
  const [isRecordEvent, setIsRecordEvent] = useState(false);
  const { data: driversEvents = [], isPending } = useGetDriverDailyEvent({
    driver_log_id: `${log_id}`,
  });

  const { data: driverLogDetails = {}, isPending: isFetchingDetails } =
    useGetDriverLogDetails({
      driver_log_id: `${log_id}`,
    });

  return {
    isPending: isFetchingDetails || isPending,
    driversEvents,
    driversEventsForPlot: formatForPloting(driversEvents),
    driverLogDetails,
    isRecordEvent,
    setIsRecordEvent,
  };
};
