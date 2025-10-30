import { useState } from "react";
import { cleanObject } from "../../../utils";
import { useToastMessage } from "../../../hooks/helpers/useToastMessage";
import { IDriverDailyLogPayload } from "../../../interfaces/driverLog";
import { useCreateDriverDailyLog } from "../../../hooks/mutations/driver_log";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useDriverDailyLogForm = ({ closeModal = () => {} }) => {
  const { driver_id } = useParams();
  const { toastMessage } = useToastMessage();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<IDriverDailyLogPayload>({
    driver_id: driver_id,
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    shipper_company: "",
    commodity: "",
    total_driving_miles: "",
    truck_miles: "",
    trailer_numbers: [],
    load_numbers: [],
  });
  const { mutate: createDriverDailyLog, isPending } = useCreateDriverDailyLog();
  console.log(formData);
  const handleCreateDriverDailyLog = () => {
    createDriverDailyLog(cleanObject(formData), {
      onSuccess: () => {
        toastMessage({
          message: "Driver Daily Log Created Successful",
          type: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["getDriverLog"],
        });

        closeModal();
      },
    });
  };

  return { isPending, formData, setFormData, handleCreateDriverDailyLog };
};
