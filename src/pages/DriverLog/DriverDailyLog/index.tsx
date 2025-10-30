import globalStyles from "@/assets/styles/globalStyles.module.scss";
import { Button } from "../../../components/primary";
import { useDriverDailyLog } from "./useDriverDailyLog";
import {
  DriverDailyLogForm,
  DriverLogTable,
} from "../../../components/secondary";
import { LoaderWrapper } from "../../../components/common";
import { Modal } from "../../../components/common/Modal";

const DriverDailyLog = () => {
  const { isPending, driversLogs, isDriverLog, setIsDriverLog } =
    useDriverDailyLog();

  return (
    <>
      <div className={globalStyles.pageWrapper}>
        <div className="d-flex align-items-center justify-content-between mt-5">
          <h5>Driver Daily Log</h5>
          <Button onClick={() => setIsDriverLog(true)}>Add Driver Log</Button>
        </div>

        <LoaderWrapper isLoading={isPending}>
          <div className={`${globalStyles.tableWrapper} mt-2`}>
            <DriverLogTable driversLogs={driversLogs} />
          </div>
        </LoaderWrapper>
      </div>

      <Modal
        isActive={isDriverLog}
        width="600"
        closeModal={() => setIsDriverLog(false)}
      >
        <DriverDailyLogForm closeModal={() => setIsDriverLog(false)} />
      </Modal>
    </>
  );
};
export default DriverDailyLog;
