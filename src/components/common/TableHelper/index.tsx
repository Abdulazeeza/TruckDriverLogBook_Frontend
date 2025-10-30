import React, { JSX } from "react";
import styles from "./styles.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Table as ReactTable, flexRender } from "@tanstack/react-table";

interface TableHelperProps<T extends object> {
  children?: React.ReactNode;
  table: ReactTable<T>; // the TanStack table instance
  useDefaultTableMobile?: boolean;
  autoScrollRef?: React.RefObject<HTMLTableRowElement> | null;
  hasHeader?: boolean;
  classNames?: string;
  minHeight?: string | number;
  hasAction?: boolean;
}

function TableHelper<T extends object>({
  children = null,
  table,
  useDefaultTableMobile = true,
  autoScrollRef = null,
  hasHeader = true,
  classNames = "",
  minHeight = "500px",
  hasAction = false,
}: TableHelperProps<T>): JSX.Element {
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <>
      {rows.length > 0 ? (
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className={`${styles.tableSection} ${classNames} ${
              !useDefaultTableMobile ? styles.dontShowOnMobile : ""
            }`}
            style={{
              paddingTop: hasHeader ? "0px" : "0px",
              minHeight: minHeight,
            }}
          >
            <table className={`${hasAction ? styles.actionView : ""}`}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr key={uuidv4()}>
                    {headerGroup.headers.map((header) => (
                      <th key={uuidv4()} className="font-weight-semibold">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={uuidv4()}
                    ref={autoScrollRef}
                    style={row.depth === 1 ? { background: "#F3F1FC" } : {}}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <td key={uuidv4()} style={{ zIndex: 100 - rowIndex }}>
                        {cellIndex + 1 === row.getVisibleCells().length &&
                        hasAction ? (
                          <span className="d-flex justify-content-end w-100">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default TableHelper;
