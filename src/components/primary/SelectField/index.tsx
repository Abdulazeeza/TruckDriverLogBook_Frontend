/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select, { SingleValue } from "react-select";
import { Controller, FieldValues, Path } from "react-hook-form";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { ISelectProps, OptionType, SelectFieldProps } from "./types";
import { cleanObject } from "../../../utils";
import { ExclamtionCircleIcon } from "../../../assets/icons";

// -------------------- Custom Styles --------------------
const customStyles = ({
  borderColor = "#9797974d",
  borderRadius = "4px",
  height = "50px",
  borderHoverColor = "#19ae57",
}: ISelectProps) => ({
  control: (provided: any) => ({
    ...provided,
    borderRadius,
    borderColor,
    boxShadow: "none",
    height,
    "&:hover": { borderColor: borderHoverColor },
    "&:focus": { border: `2px solid ${borderHoverColor}` },
    "&:focus-within": { border: `2px solid ${borderHoverColor}` },
  }),
  placeholder: (provided: any) => ({ ...provided, fontSize: "14px" }),
  option: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,
    backgroundColor: state.isFocused ? borderHoverColor : "white",
    color: state.isFocused ? "white" : "black",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({ ...provided, color: "#333" }),
});

// -------------------- Helper --------------------
const getOptionFromValue = (
  val: string | OptionType | undefined
): OptionType | null => {
  if (!val) return null;
  if (typeof val === "string") return { label: val, value: val };
  return val;
};

// -------------------- SelectField Component --------------------
type InputFieldProps<TFieldValues extends FieldValues = FieldValues> =
  SelectFieldProps & {
    name: Path<TFieldValues>;
    control?: any;
    onChange?: (value: any, label?: string) => void;
  };

export const SelectField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  onChange,
  ...props
}: InputFieldProps<TFieldValues>) => {
  if (control) {
    return (
      <Controller
        name={name as Path<TFieldValues>}
        control={control}
        render={({ field }) => (
          <BaseSelectField
            {...props}
            {...field}
            onChange={(value, label) => {
              field.onChange(value);
              onChange?.(value, label);
            }}
          />
        )}
      />
    );
  }

  return <BaseSelectField name={name} onChange={onChange} {...props} />;
};

// -------------------- BaseSelectField --------------------
const BaseSelectField: React.FC<
  SelectFieldProps & { onChange?: (value: any, label?: string) => void }
> = ({
  name = "",
  options = [],
  label = null,
  labelStyles = {},
  labelClassNames = "",
  isRequired = false,
  errorMessage,
  borderColor = "#9797974d",
  borderRadius = "4px",
  height = "50px",
  borderHoverColor = "#19ae57",
  floatError = true,
  valueKey = "value",
  labelKey = "label",
  value,
  onChange = () => {},
  selectInputRef,
  ...rest
}) => {
  const serializeOptions = () =>
    options.map((option) =>
      cleanObject({
        label: typeof option === "object" ? option[labelKey] : option,
        value: typeof option === "object" ? option[valueKey] : option,
      })
    );

  const selectedOption = getOptionFromValue(value);

  return (
    <span className={styles.selectContainer}>
      {label && (
        <label
          htmlFor={name}
          data-testid="label"
          className={labelClassNames}
          style={labelStyles}
        >
          {isRequired && <span className="text-danger">*</span>}
          {label}
        </label>
      )}

      <Select<OptionType>
        name={name}
        options={serializeOptions()}
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={(selected: SingleValue<OptionType>) =>
          onChange(selected?.value, selected?.label)
        }
        styles={customStyles({
          borderColor,
          borderRadius,
          height,
          borderHoverColor,
        })}
        ref={selectInputRef}
        {...rest}
      />

      {(floatError || errorMessage) && (
        <span
          className={`${errorMessage ? "!visible" : "!invisible"} ${
            styles["error-message"]
          }`}
          data-testid="error-message"
        >
          {errorMessage && (
            <motion.span initial={{ x: -10 }} animate={{ x: 0 }}>
              <ExclamtionCircleIcon />
              <span>{errorMessage}</span>
            </motion.span>
          )}
        </span>
      )}
    </span>
  );
};
