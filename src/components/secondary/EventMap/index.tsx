import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "./styles.module.scss";
import { DriverEvent, DriverStatus } from "../../../interfaces/driverLog";

// Map statuses to numbers
const statusMap: Record<DriverStatus, number> = {
  "On Duty": 0,
  Driving: 1,
  "Sleeper Birth": 2,
  "Off Duty": 3,
};

// Reverse mapping for Y-axis labels and tooltip
const statusReverseMap: Record<number, DriverStatus> = Object.fromEntries(
  Object.entries(statusMap).map(([k, v]) => [v, k])
) as Record<number, DriverStatus>;

// Generate 15-minute intervals for a day
const generate15MinIntervals = (): string[] => {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h.toString().padStart(2, "0");
      const min = m.toString().padStart(2, "0");
      times.push(`${hour}:${min}`);
    }
  }
  return times;
};

// Hourly ticks for X-axis grid
const hourlyTicks: string[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

// Expanded data point type
interface ExpandedDataPoint {
  time: string;
  value: number | null; // use null to stop line
}

export const EventMap = ({
  driverEvents = [],
}: {
  driverEvents: DriverEvent[];
}) => {
  const times15min = generate15MinIntervals();

  // Sort driverEvents by time to ensure proper step calculation
  const sortedEvents = [...driverEvents].sort((a, b) =>
    a.time > b.time ? 1 : -1
  );

  // Get last event time
  const lastEventTime = sortedEvents.length
    ? sortedEvents[sortedEvents.length - 1].time
    : null;

  // Expand driverEvents to 15-minute intervals
  const expandedData: ExpandedDataPoint[] = times15min.map((time) => {
    let status: string = "Off Duty";
    for (const event of sortedEvents) {
      if (event.time <= time) status = event.status;
      else break;
    }

    const mappedValue =
      statusMap[status as DriverStatus] ?? statusMap["Off Duty"];

    // Stop line after last event
    if (lastEventTime && time > lastEventTime) {
      return { time, value: null };
    }

    return { time, value: mappedValue };
  });

  return (
    <ResponsiveContainer width="100%" aspect={5} className={styles.chart}>
      <LineChart data={expandedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          ticks={hourlyTicks}
          interval={0}
          orientation="top"
        />
        <YAxis
          type="number"
          domain={[0, 3]}
          ticks={[0, 1, 2, 3]}
          tickFormatter={(tick) => statusReverseMap[tick]}
          padding={{ top: 20, bottom: 20 }}
        />
        <Tooltip
          labelFormatter={(label) => `Time: ${label}`}
          formatter={(value) => {
            if (typeof value === "number")
              return [`Status: ${statusReverseMap[value]}`, ""];

            return ["", ""];
          }}
        />
        <Line
          type="stepBefore"
          dataKey="value"
          stroke="#19ae57"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
