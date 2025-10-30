import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IDriverDailyLogPayload } from "../../../interfaces/driverLog";

// Define the schema with explicit typing
const Schema: yup.ObjectSchema<IDriverDailyLogPayload> = yup.object({
  driver_id: yup.string().optional(),
  commodity: yup.string().required("Commodity is required"),
  shipper_company: yup.string().required("Shipper company is required"),
  current_location: yup.string().optional(),
  pickup_location: yup.string().optional(),
  dropoff_location: yup.string().optional(),
  total_driving_miles: yup.string().optional(),
  truck_miles: yup.string().optional(),
  trailer_numbers: yup
    .array()
    .of(yup.string().defined())
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") return [originalValue];
      return value;
    })
    .optional(),

  load_numbers: yup
    .array()
    .of(yup.string().defined())
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") return [originalValue];
      return value;
    })
    .optional(),
});

export const useValidation = ({
  ...rest
}: Partial<IDriverDailyLogPayload>): UseFormReturn<IDriverDailyLogPayload> => {
  return useForm<IDriverDailyLogPayload>({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      ...rest,
    },
  });
};
