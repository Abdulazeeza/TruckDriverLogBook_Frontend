import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the shape of the form data
export interface FormData {
  driver_id: string;
}

// Define the schema with explicit typing
const Schema: yup.ObjectSchema<FormData> = yup.object({
  driver_id: yup.string().required("Driver ID is required"),
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
