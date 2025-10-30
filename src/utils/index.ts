/* eslint-disable @typescript-eslint/no-explicit-any */

import { IDriverLogEvent } from "../interfaces/driverLog";

/**
 * Get the current URL query string (e.g., "?id=123&status=active")
 */
export const getUrlQuerySection = (): string => {
  return window.location.search;
};

/**
 * Removes null, undefined, or empty string values from an object.
 * Optionally deletes specific keys.
 */
export function cleanObject<T extends Record<string, any>>(
  obj: T,
  keys: string[] = []
): T {
  const cleanedObj = { ...obj };

  for (const propName in cleanedObj) {
    if (
      cleanedObj[propName] === null ||
      cleanedObj[propName] === undefined ||
      cleanedObj[propName] === ""
    ) {
      delete cleanedObj[propName];
    }
  }

  keys.forEach((key) => {
    delete cleanedObj[key];
  });

  return cleanedObj;
}

/**
 * Recursively extracts a readable message from a 422 validation error object.
 * Example:
 * { username: ["This field is required."] } -> "USERNAME: This field is required."
 */
export const get422errorMessage = (errors: Record<string, any>): string => {
  for (const key in errors) {
    const value = errors[key];
    if (Array.isArray(value) && typeof value[0] === "string") {
      return `${key.replace("_", " ").toUpperCase()}: ${value[0]}`;
    } else if (typeof value === "object") {
      return get422errorMessage(value);
    }
  }
  return "Unknown validation error";
};

/**
 * Converts a date string or timestamp into a readable date-time format.
 * Returns "-" if value is invalid.
 */
export const defaultDateDisplay = (value?: string | number | Date): string => {
  if (!value) return "-";
  const date = new Date(value);
  return isNaN(date.getTime())
    ? "-"
    : date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
};

// Helper to format status string
export const formatStatus = (status: string): string => {
  // Convert "OFF_DUTY" -> "Off Duty"
  const converted_status: string = status
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return converted_status;
};

// Conversion function
export const formatForPloting = (events: IDriverLogEvent[]) => {
  const formatted = events.map((event) => ({
    time: event.start_time,
    status: formatStatus(event.event_status),
  }));

  const lastItem = events?.[events?.length - 1];
  if (lastItem?.end_time)
    formatted.push({
      time: lastItem.end_time,
      status: formatStatus(lastItem.event_status),
    });

  return formatted;
};

export const decimalHoursToHoursMinutes = (
  decimalHours: number
): {
  hours: number;
  minutes: number;
} => {
  const hours = Math.floor(decimalHours); // integer part
  const minutes = Math.round((decimalHours - hours) * 60); // fractional part converted to minutes
  return { hours, minutes };
};

export const decimalHoursToString = (decimalHours: number): string => {
  const { hours, minutes } = decimalHoursToHoursMinutes(decimalHours);
  return `${hours}h ${minutes}m`;
};
