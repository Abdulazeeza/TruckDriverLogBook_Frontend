import type { ReactNode, MouseEventHandler } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  isDisabled?: boolean;
  showSpinner?: boolean;
  variantColor?: string;
  LoaderView?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
