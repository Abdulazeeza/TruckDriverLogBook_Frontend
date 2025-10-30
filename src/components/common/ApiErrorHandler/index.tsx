import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import { useApiErrorHandler } from "./useApiErrorHandler";
import {
  CancelIcon,
  CheckMarkCircle,
  ExclamtionCircleIcon,
} from "../../../assets/icons";

const ApiErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { message, type, closeApiErrorHandler } = useApiErrorHandler();

  return (
    <>
      {children}
      {message ? (
        <motion.div
          initial={{ top: "10px" }}
          animate={{
            top: "50px",
          }}
          className={`${styles["api-error-handler"]} ${
            type === "success" ? styles["onsuccess"] : ""
          }`}
        >
          <div className="d-flex gap-2 align-items-center">
            {type === "success" ? (
              <CheckMarkCircle className="text-white" size={22} />
            ) : (
              <ExclamtionCircleIcon className="text-white" size={22} />
            )}

            <span className="text-white">{message}</span>
          </div>

          <span
            className={`text-white ${styles["api-error-handler__close"]}`}
            onClick={closeApiErrorHandler}
          >
            <CancelIcon size={25} />
          </span>
        </motion.div>
      ) : null}
    </>
  );
};
export default ApiErrorHandler;
