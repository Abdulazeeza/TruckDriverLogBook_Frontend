import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Spinner } from "../../../assets/icons";

interface ILoaderWrapper {
  children: ReactNode;
  isLoading: boolean;
}

export const LoaderWrapper = ({ children, isLoading }: ILoaderWrapper) => {
  return (
    <>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner className="animate-spin" size={20} />
        </div>
      ) : (
        children
      )}
    </>
  );
};
