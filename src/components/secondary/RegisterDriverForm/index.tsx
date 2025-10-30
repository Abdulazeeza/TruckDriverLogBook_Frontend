import { Button, InputField } from "../../primary";
import styles from "../LoginDriverForm/styles.module.scss";
import { useRegisterDriverForm } from "./useRegisterDriverForm";
import { useValidation } from "./useValidation";

export const RegisterDriverForm = () => {
  const { isPending, formData, setFormData, handleRegisterDriver } =
    useRegisterDriverForm();
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useValidation({ ...formData });

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(handleRegisterDriver)}
    >
      <h5>REGISTER DRIVER</h5>

      <InputField
        control={control}
        name="first_name"
        label="First Name"
        placeholder="Enter first name"
        isRequired
        value={formData?.first_name}
        onKeyUp={() => errors.first_name !== undefined && trigger("first_name")}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, first_name: val }));
        }}
        errorMessage={errors?.first_name?.message}
      />

      <InputField
        control={control}
        name="last_name"
        label="Last Name"
        placeholder="Enter first name"
        isRequired
        value={formData?.last_name}
        onKeyUp={() => errors.last_name !== undefined && trigger("last_name")}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, last_name: val }));
        }}
        errorMessage={errors?.last_name?.message}
      />

      <InputField
        control={control}
        name="vehicle_number"
        label="Vehicle Number"
        placeholder="Enter vehicle number"
        isRequired
        value={formData?.vehicle_number}
        onKeyUp={() =>
          errors.vehicle_number !== undefined && trigger("vehicle_number")
        }
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, vehicle_number: val }));
        }}
        errorMessage={errors?.vehicle_number?.message}
      />

      <InputField
        control={control}
        name="co_driver_id"
        label="Co-Driver ID"
        placeholder="Enter co-driver ID"
        value={formData?.co_driver_id}
        onKeyUp={() =>
          errors.co_driver_id !== undefined && trigger("co_driver_id")
        }
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, co_driver_id: val }));
        }}
        errorMessage={errors?.co_driver_id?.message}
      />

      <Button
        className="mt-auto"
        type="submit"
        isLoading={isPending}
        isDisabled={isPending}
      >
        Register
      </Button>
    </form>
  );
};
