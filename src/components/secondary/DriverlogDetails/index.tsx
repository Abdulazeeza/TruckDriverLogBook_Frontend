import styles from "./styles.module.scss";
import { IDriverLogEvent } from "../../../interfaces/driverLog";
import { decimalHoursToString, defaultDateDisplay } from "../../../utils";

export const DriverlogDetails = ({
  driverLogDetails,
}: {
  driverLogDetails: IDriverLogEvent;
}) => {
  return (
    <section className={styles.gridDetailsView}>
      <div>
        <h6 className="mb-0">Created At</h6>
        <p className="text-muted">
          {defaultDateDisplay(driverLogDetails?.created_at)}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Vehicle Number</h6>
        <p className="text-muted">
          {driverLogDetails.driver_vehicle_number || "N/A"}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Shipper Company</h6>
        <p className="text-muted">
          {driverLogDetails.shipper_company || "N/A"}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Commodity</h6>
        <p className="text-muted">{driverLogDetails.commodity || "N/A"}</p>
      </div>
      <div>
        <h6 className="mb-0">Start Location</h6>
        <p className="text-muted">
          {driverLogDetails.current_location || "N/A"}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Pickup Location</h6>
        <p className="text-muted">
          {driverLogDetails.pickup_location || "N/A"}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Dropoff Location </h6>
        <p className="text-muted">
          {driverLogDetails.dropoff_location || "N/A"}
        </p>
      </div>

      <div>
        <h6 className="mb-0">Trailer Number</h6>
        <p className="text-muted">
          {driverLogDetails.trailer_numbers?.[0] || "N/A"}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Load Number</h6>
        <p className="text-muted">
          {driverLogDetails.load_numbers?.[0] || "N/A"}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Total Miles Driving</h6>
        <p className="text-muted">
          {driverLogDetails.total_driving_miles || "N/A"}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Truck Miles</h6>
        <p className="text-muted">{driverLogDetails.truck_miles || "N/A"}</p>
      </div>
      <div>
        <h6 className="mb-0">Total Drivig Duration</h6>
        <p className="text-muted">
          {decimalHoursToString(
            Number(driverLogDetails.total_driving_hours || 0)
          )}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Total On Duty Duration</h6>
        <p className="text-muted">
          {decimalHoursToString(
            Number(driverLogDetails.total_on_duty_hours) || 0
          )}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Total Working Duration</h6>
        <p className="text-muted">
          {decimalHoursToString(
            Number(driverLogDetails.total_working_hours) || 0
          )}
        </p>
      </div>
      <div>
        <h6 className="mb-0">Co-Driver ID</h6>
        <p className="text-muted">{driverLogDetails.co_driver_id || "N/A"}</p>
      </div>
    </section>
  );
};
