/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
} from "@tanstack/react-table";
import { IDriverLog } from "../../../interfaces/driverLog";
import { defaultDateDisplay } from "../../../utils";
import { Button } from "../../primary/Button";
import { useNavigate, useParams } from "react-router-dom";
import { pathConstants } from "../../../RootRoutes/pathContants";

export const useDriverLogTable = ({
  driversLogs,
}: {
  driversLogs: IDriverLog[];
}) => {
  const navigate = useNavigate();
  const { driver_id } = useParams();
  const columns = useMemo<ColumnDef<IDriverLog>[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ getValue }) => defaultDateDisplay(getValue() as string),
      },
      {
        accessorKey: "commodity",
        header: "Commodity",
      },
      {
        accessorKey: "shipper_company",
        header: "Shipper Company",
      },
      {
        accessorKey: "current_location",
        header: "Current Location",
        cell: ({ getValue }) => getValue() || "N/A",
      },
      {
        accessorKey: "pickup_location",
        header: "Pickup Location",
        cell: ({ getValue }) => getValue() || "N/A",
      },
      {
        accessorKey: "dropoff_location",
        header: "DropOff Location",
        cell: ({ getValue }) => getValue() || "N/A",
      },

      {
        header: "Action",
        cell: ({ row }) =>
          React.createElement(
            Button,
            {
              style: { height: "32px" },
              variantColor: "btn--primary-outline",
              onClick: () => {
                navigate(
                  pathConstants.DRIVER_LOG_EVENT({
                    driver_id: driver_id,
                    log_id: row?.original?.id,
                  })
                );
              },
            },
            "View"
          ),
      },
    ],
    []
  );

  const instance = useReactTable({
    data: driversLogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { instance };
};
