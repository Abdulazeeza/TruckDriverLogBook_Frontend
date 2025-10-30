export interface IDriverLog {
  [x: string]: string;
  vehicle_number: string;
  driver_id: string;
}

export interface IDriverLogEvent {
  [x: string]: string;
}

export type DriverStatus = "On Duty" | "Driving" | "Sleeper Birth" | "Off Duty";

export interface DriverEvent {
  time: string;
  status: DriverStatus | string;
}

export interface IDriverEventPayload {
  start_time: string;
  end_time: string;
  event_status: string;
  remarks?: string;
  location?: string;
}

export interface IDriverDailyLogPayload {
  driver_id?: string;
  shipper_company: string;
  commodity: string;
  current_location?: string;
  pickup_location?: string;
  dropoff_location?: string;
  total_driving_miles?: string | number;
  truck_miles?: string | number;
  trailer_numbers?: string[];
  load_numbers?: string[];
}
