import { useMutation } from "@tanstack/react-query";
import { loginDriver, registerDriver } from "../../endpoints/driver";
import {
  ILoginDriverPayload,
  IRegisterDriverPayload,
} from "../../interfaces/driver";

export const useRegisterDriver = () => {
  return useMutation({
    mutationFn: (data: IRegisterDriverPayload) => registerDriver(data),
  });
};

export const useLoginDriver = () => {
  return useMutation({
    mutationFn: (data: ILoginDriverPayload) => loginDriver(data),
  });
};
