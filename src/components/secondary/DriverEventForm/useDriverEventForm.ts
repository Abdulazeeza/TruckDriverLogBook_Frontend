import { useState } from "react";
import { cleanObject } from "../../../utils";
import { useToastMessage } from "../../../hooks/helpers/useToastMessage";
import { IDriverEventPayload } from "../../../interfaces/driverLog";
import { useRecordDriverEvent } from "../../../hooks/mutations/driver_log";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useDriverEventForm = ({
  start_time = "00:00",
  closeModal = () => {},
}) => {
  const { log_id } = useParams();
  const { toastMessage } = useToastMessage();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<IDriverEventPayload>({
    start_time: start_time,
    end_time: "",
    event_status: "",
    remarks: "",
    location: "",
  });
  const { mutate: recordDriverEvent, isPending } = useRecordDriverEvent();

  const handleAddDriverEvent = () => {
    recordDriverEvent(
      { data: cleanObject(formData), id: `${log_id}` },
      {
        onSuccess: () => {
          toastMessage({
            message: "Driver Event Recorded Successful",
            type: "success",
          });

          queryClient.invalidateQueries({
            queryKey: ["getDriverDailyEvent", `${log_id}`],
          });
          queryClient.invalidateQueries({
            queryKey: ["getDriverLogDetails", `${log_id}`],
          });
          closeModal();
        },
      }
    );
  };

  return { isPending, formData, setFormData, handleAddDriverEvent };
};
