import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the shape of the form data
export interface FormData {
  vehicle_number: string;
  first_name: string;
  last_name: string;
  co_driver_id?: string;
}

// Define the schema with explicit typing
const Schema: yup.ObjectSchema<FormData> = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  vehicle_number: yup.string().required("Vehicle number is required"),
  co_driver_id: yup.string().optional(),
});

export const useValidation = ({
  ...rest
}: Partial<FormData>): UseFormReturn<FormData> => {
  return useForm<FormData>({
    resolver: yupResolver(Schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      ...rest,
    },
  });
};
