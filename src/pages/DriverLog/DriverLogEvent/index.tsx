import { LoaderWrapper } from "../../../components/common";
import { Button } from "../../../components/primary";
import globalStyles from "@/assets/styles/globalStyles.module.scss";
import { useDriverLogEvent } from "./useDriverLogEvent";
import {
  DriverEventForm,
  DriverEventTable,
  DriverlogDetails,
  EventMap,
} from "../../../components/secondary";
import { Modal } from "../../../components/common/Modal";

const DriverLogEvent = () => {
  const {
    isPending,
    driversEvents,
    driversEventsForPlot,
    driverLogDetails,
    isRecordEvent,
    setIsRecordEvent,
  } = useDriverLogEvent();

  return (
    <>
      <div className={globalStyles.pageWrapper}>
        <LoaderWrapper isLoading={isPending}>
          <div className="my-5">
            <DriverlogDetails driverLogDetails={driverLogDetails} />
          </div>

          <div className="d-flex align-items-end justify-content-between">
            <h5 className="mb-0">Driver's Event Map</h5>
            <Button onClick={() => setIsRecordEvent(true)}>
              Record New Event{" "}
            </Button>
          </div>

          <div className={`${globalStyles.tableWrapper} mt-2 mb-5`}>
            <EventMap driverEvents={driversEventsForPlot} />
          </div>

          <h5>Driver's Event Table</h5>
          <div className={`${globalStyles.tableWrapper} mt-2`}>
            <DriverEventTable driversEvents={driversEvents} />
          </div>
        </LoaderWrapper>
      </div>

      <Modal
        isActive={isRecordEvent}
        width="600"
        closeModal={() => setIsRecordEvent(false)}
      >
        <DriverEventForm
          closeModal={() => setIsRecordEvent(false)}
          start_time={driversEvents?.[driversEvents?.length - 1]?.end_time}
        />
      </Modal>
    </>
  );
};
export default DriverLogEvent;
