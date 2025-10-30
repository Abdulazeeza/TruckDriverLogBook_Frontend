import { Button, InputField } from "../../primary";
import styles from "./styles.module.scss";
import { useLoginDriverForm } from "./useLoginDriverForm";
import { useValidation } from "./useValidation";

export const LoginDriverForm = () => {
  const { isPending, formData, setFormData, handleLoginDriver } =
    useLoginDriverForm();
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useValidation({ ...formData });

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(handleLoginDriver)}
    >
      <h5>LOGIN DRIVER</h5>

      <InputField
        control={control}
        name="driver_id"
        label="Driver ID"
        placeholder="Enter driver ID"
        isRequired
        value={formData?.driver_id}
        onKeyUp={() => errors.driver_id !== undefined && trigger("driver_id")}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, driver_id: val }));
        }}
        errorMessage={errors?.driver_id?.message}
      />

      <Button
        className="mt-auto"
        type="submit"
        isLoading={isPending}
        isDisabled={isPending}
      >
        Log In
      </Button>
    </form>
  );
};
