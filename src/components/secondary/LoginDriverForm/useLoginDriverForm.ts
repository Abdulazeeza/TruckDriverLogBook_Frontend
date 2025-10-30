import { useState } from "react";
import { ILoginDriverPayload } from "../../../interfaces/driver";
import { cleanObject } from "../../../utils";
import { useLoginDriver } from "../../../hooks/mutations/driver";
import { useNavigate } from "react-router-dom";
import { pathConstants } from "../../../RootRoutes/pathContants";
import { useToastMessage } from "../../../hooks/helpers/useToastMessage";

export const useLoginDriverForm = () => {
  const navigate = useNavigate();
  const { toastMessage } = useToastMessage();
  const [formData, setFormData] = useState<ILoginDriverPayload>({
    driver_id: "",
  });

  const { mutate: loginDriver, isPending } = useLoginDriver();

  const handleLoginDriver = () => {
    loginDriver(cleanObject(formData), {
      onSuccess: () => {
        toastMessage({
          message: "Driver Login Successful",
          type: "success",
        });
        navigate(pathConstants.DRIVER_LOG({ driver_id: formData?.driver_id }));
      },
    });
  };

  return { isPending, formData, setFormData, handleLoginDriver };
};
