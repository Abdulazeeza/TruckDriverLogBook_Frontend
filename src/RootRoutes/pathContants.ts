export const pathConstants = {
  LOGIN_DRIVER: "/login",
  REGISTER_DRIVER: "/register",

  DRIVER_LOG: ({ driver_id }: { driver_id: string }) => {
    return `/${driver_id}/driver-logs`;
  },
  DRIVER_LOG_EVENT: ({
    driver_id,
    log_id,
  }: {
    driver_id: string;
    log_id: string;
  }) => {
    return `/${driver_id}/driver-logs/${log_id}`;
  },
};
