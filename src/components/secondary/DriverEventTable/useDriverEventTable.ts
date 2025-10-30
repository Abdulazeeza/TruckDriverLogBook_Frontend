/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
} from "@tanstack/react-table";
import { IDriverLogEvent } from "../../../interfaces/driverLog";
import { defaultDateDisplay, formatStatus } from "../../../utils";

export const useDriverEventTable = ({
  driversEvents,
}: {
  driversEvents: IDriverLogEvent[];
}) => {
  const columns = useMemo<ColumnDef<IDriverLogEvent>[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ getValue }) => defaultDateDisplay(getValue() as string),
      },
      {
        accessorKey: "start_time",
        header: "Start Time",
      },
      {
        accessorKey: "end_time",
        header: "End Time",
      },
      {
        accessorKey: "event_status",
        header: "Status",
        cell: ({ getValue }) => formatStatus(getValue() as string),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ getValue }) => getValue() || "N/A",
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        cell: ({ getValue }) => getValue() || "N/A",
      },
    ],
    []
  );

  const instance = useReactTable({
    data: driversEvents,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { instance };
};
