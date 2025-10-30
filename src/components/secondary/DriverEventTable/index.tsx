import { IDriverLogEvent } from "../../../interfaces/driverLog";
import TableHelper from "../../common/TableHelper";
import { useDriverEventTable } from "./useDriverEventTable";

export const DriverEventTable = ({
  driversEvents,
}: {
  driversEvents: IDriverLogEvent[];
}) => {
  const { instance } = useDriverEventTable({
    driversEvents,
  });

  return (
    <section>
      <TableHelper table={instance} minHeight={"auto"}>
        <div className="text-center mt-5">
          <h3>No Data Available</h3>
          <p className="text-center">
            Use the button above to add an event. When you do, they would appear
            here.
          </p>
        </div>
      </TableHelper>
    </section>
  );
};
