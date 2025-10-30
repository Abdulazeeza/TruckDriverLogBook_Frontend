export interface IRegisterDriverPayload {
  vehicle_number: string;
  first_name: string;
  last_name: string;
  co_driver_id: string;
}

export interface ILoginDriverPayload {
  driver_id: string;
}
