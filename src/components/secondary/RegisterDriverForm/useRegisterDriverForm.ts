/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IRegisterDriverPayload } from "../../../interfaces/driver";
import { useRegisterDriver } from "../../../hooks/mutations/driver";
import { cleanObject } from "../../../utils";
import { pathConstants } from "../../../RootRoutes/pathContants";
import { useNavigate } from "react-router-dom";
import { useToastMessage } from "../../../hooks/helpers/useToastMessage";

export const useRegisterDriverForm = () => {
  const navigate = useNavigate();
  const { toastMessage } = useToastMessage();
  const [formData, setFormData] = useState<IRegisterDriverPayload>({
    vehicle_number: "",
    first_name: "",
    last_name: "",
    co_driver_id: "",
  });
  const { mutate: registerDriver, isPending } = useRegisterDriver();

  const handleRegisterDriver = () => {
    registerDriver(cleanObject(formData), {
      onSuccess: (res: any) => {
        toastMessage({
          message: "Driver Registration Successful",
          type: "success",
        });
        navigate(pathConstants.DRIVER_LOG({ driver_id: res?.data?.data?.id }));
      },
    });
  };

  return { isPending, formData, setFormData, handleRegisterDriver };
};
