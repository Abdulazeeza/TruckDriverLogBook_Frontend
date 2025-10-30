/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { setApiErrorMessage } from "../../../store/modules/apiErrorHandler";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/helpers/useRedux";

export const useApiErrorHandler = () => {
  const dispatch = useAppDispatch();
  const { message, type } = useAppSelector((state) => state.apiErrorReducer);

  const closeApiErrorHandler = useCallback(() => {
    // your handler logic
    dispatch(
      setApiErrorMessage({
        message: null,
      })
    );
  }, []);

  useEffect(() => {
    if (message === null) return;

    const timer = setTimeout(() => {
      closeApiErrorHandler();
    }, 10000);

    return () => clearTimeout(timer);
  }, [message, closeApiErrorHandler]);

  return { message, type, closeApiErrorHandler };
};
