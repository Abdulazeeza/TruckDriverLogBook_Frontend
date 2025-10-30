import { Controller, FieldValues, Path } from "react-hook-form";
import { motion } from "motion/react";
import styles from "./styles.module.scss";
import { InputProps } from "./types";
import { useEffect, useState } from "react";
import { ExclamtionCircleIcon } from "../../../assets/icons";

type InputFieldProps<TFieldValues extends FieldValues = FieldValues> =
  InputProps<TFieldValues>;

export const InputField = <TFieldValues extends FieldValues = FieldValues>({
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
          <BaseInput
            {...props}
            {...field}
            onChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
          />
        )}
      />
    );
  }

  return (
    <BaseInput
      name={name}
      onChange={(value) => {
        onChange?.(value);
      }}
      {...props}
    />
  );
};

const BaseInput = <TFieldValues extends FieldValues = FieldValues>({
  label,
  labelClassNames,
  labelStyles,
  isRequired = false,
  isDisabled = false,
  errorMessage,
  classNames = "",
  parentClassNames = "",
  floatError = true,
  defaultValue = "",
  onChange,
  onKeyUp,
  name,
  type = "text",
  ...props
}: InputProps<TFieldValues>) => {
  const [inputVal, setInputVal] = useState(defaultValue);

  useEffect(() => {
    setInputVal(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    onChange?.(value);
  };

  return (
    <span className={`${styles["input-field"]} ${parentClassNames}`}>
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

      <input
        data-testid="input"
        id={name}
        type={type}
        name={name}
        className={`${
          errorMessage ? styles["error-border"] : ""
        } ${classNames}`}
        value={inputVal}
        onChange={handleChange}
        onKeyUp={onKeyUp}
        disabled={isDisabled}
        placeholder={props.placeholder}
        {...props}
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
