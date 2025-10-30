import { LoaderIcon } from "../../../assets/icons";
import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  loadingText = "",
  className = "",
  isDisabled = false,
  showSpinner = true,
  variantColor = "btn--primary",
  LoaderView = (
    <span className="flex items-center">
      {showSpinner && <LoaderIcon className="text-white mr-2" />}
      {loadingText}
    </span>
  ),
  onClick,
  ...rest
}) => {
  return (
    <button
      className={`${styles[`${variantColor}`]} ${
        isDisabled ? styles["btn--disabled"] : ""
      } ${className}`}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      data-testid="button"
      {...rest}
    >
      {isLoading ? (
        LoaderView
      ) : (
        <span className="flex items-center">{children}</span>
      )}
    </button>
  );
};
