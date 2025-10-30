import { IDriverLog } from "../../../interfaces/driverLog";
import TableHelper from "../../common/TableHelper";
import { useDriverLogTable } from "./useDriverLogTable";

export const DriverLogTable = ({
  driversLogs,
}: {
  driversLogs: IDriverLog[];
}) => {
  const { instance } = useDriverLogTable({
    driversLogs,
  });

  return (
    <section>
      <TableHelper
        table={instance} // pass the whole table instance
        hasAction={true}
      >
        <div className="text-center mt-5">
          <h3>No Data Available</h3>
          <p className="text-center">
            Use the button above to add a driver log. When you do, they would
            appear here.
          </p>
        </div>
      </TableHelper>
    </section>
  );
};
