import {
  Control,
  FieldValues,
  Path,
  UseFormRegister,
  ControllerRenderProps,
} from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control?: Control<TFieldValues>;
  register?: UseFormRegister<TFieldValues>;
  name?: Path<TFieldValues>;
  label?: string;
  labelClassNames?: string;
  labelStyles?: React.CSSProperties;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  classNames?: string;
  parentClassNames?: string;
  errorMessageClassNames?: string;
  isTemplate?: boolean;
  floatError?: boolean;
  placeholder?: string;
  onChange?: ControllerRenderProps<
    TFieldValues,
    Path<TFieldValues>
  >["onChange"];
  onKeyUp?: () => void;
}
