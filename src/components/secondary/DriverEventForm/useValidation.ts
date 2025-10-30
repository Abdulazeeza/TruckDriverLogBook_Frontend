import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IDriverEventPayload } from "../../../interfaces/driverLog";

// Define the schema with explicit typing
const Schema: yup.ObjectSchema<IDriverEventPayload> = yup.object({
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
  event_status: yup.string().required("Event status is required"),
  remarks: yup.string().optional(),
  location: yup.string().optional(),
});

export const useValidation = ({
  ...rest
}: Partial<IDriverEventPayload>): UseFormReturn<IDriverEventPayload> => {
  return useForm<IDriverEventPayload>({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      ...rest,
    },
  });
};
