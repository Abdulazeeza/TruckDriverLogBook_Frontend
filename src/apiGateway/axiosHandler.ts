import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "../store";
import { get422errorMessage } from "../utils";
import { setApiErrorMessage } from "../store/modules/apiErrorHandler";

// Base URL from .env
const baseURL: string = import.meta.env.VITE_API_BASE_URL || "";

// Create the Axios instance
const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
const httpRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config;
};

// Success handler
const onFulfilled = <T>(
  response: AxiosResponse<T>
): Promise<AxiosResponse<T>> => {
  return Promise.resolve(response);
};

// Define a type for structured API errors (optional)
interface ApiErrorResponse {
  detail?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// Error handler
const onRejected = async (
  error: AxiosError<ApiErrorResponse>
): Promise<never> => {
  const status = error.response?.status;

  if (status) {
    switch (status) {
      case 400:
        store.dispatch(
          setApiErrorMessage({
            message:
              error.response?.data?.detail ||
              error.response?.data?.error ||
              "Bad request",
          })
        );
        break;

      case 422: {
        const errors = error.response?.data?.errors;
        if (errors && Object.keys(errors).length > 0) {
          const errorMessage = get422errorMessage(errors);
          store.dispatch(setApiErrorMessage({ message: errorMessage }));
        } else {
          store.dispatch(
            setApiErrorMessage({
              message: error.response?.data?.detail || "Validation error",
            })
          );
        }
        break;
      }

      case 404:
        store.dispatch(
          setApiErrorMessage({ message: "This resource was not found" })
        );
        break;

      case 500:
        store.dispatch(
          setApiErrorMessage({
            message: "Something went wrong, please try again",
          })
        );
        break;

      case 503:
        store.dispatch(setApiErrorMessage({ message: "Service unavailable" }));
        break;

      default:
        store.dispatch(
          setApiErrorMessage({ message: "An unexpected error occurred" })
        );
    }
  }

  if (!navigator.onLine) {
    store.dispatch(
      setApiErrorMessage({
        message:
          "No internet connection. Please check your connectivity and try again.",
      })
    );
  }

  return Promise.reject(error);
};

// ✅ Attach interceptors
httpClient.interceptors.request.use(httpRequest);
httpClient.interceptors.response.use(onFulfilled, onRejected);

export default httpClient;
