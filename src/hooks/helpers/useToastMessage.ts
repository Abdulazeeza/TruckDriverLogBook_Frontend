import { setApiErrorMessage } from "../../store/modules/apiErrorHandler";
import { useAppDispatch } from "./useRedux";

export const useToastMessage = () => {
  const dispatch = useAppDispatch();

  const toastMessage = ({
    message = null,
    type = "failed",
  }: {
    message: null | string;
    type: string;
  }) => {
    dispatch(
      setApiErrorMessage({
        message: message,
        type: type,
      })
    );
  };

  return { toastMessage };
};
