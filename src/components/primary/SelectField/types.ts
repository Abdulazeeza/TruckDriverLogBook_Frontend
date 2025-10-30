/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OptionType {
  label: string;
  value: string;
}
export interface ISelectProps {
  borderColor?: string;
  borderRadius?: string;
  height?: string;
  borderHoverColor?: string;
}

export interface SelectFieldProps extends ISelectProps {
  name?: string;
  label?: string | null;
  labelClassNames?: string;
  labelStyles?: React.CSSProperties;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  floatError?: boolean;
  options?: any[];
  valueKey?: string;
  labelKey?: string;
  value?: string;
  giveControl?: boolean;
  selectInputRef?: any;
  onChange?: (e1?: string, e2?: string) => void;
  onInputChange?: (e1: string) => void;
}
