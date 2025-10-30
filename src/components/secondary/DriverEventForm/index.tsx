import { Button, InputField, SelectField, TimeField } from "../../primary";
import styles from "../LoginDriverForm/styles.module.scss";
import { useDriverEventForm } from "./useDriverEventForm";
import { useValidation } from "./useValidation";

export const DriverEventForm = ({
  start_time = "00:00",
  closeModal = () => {},
}) => {
  const { isPending, formData, setFormData, handleAddDriverEvent } =
    useDriverEventForm({ start_time, closeModal });
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useValidation({ ...formData });

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(handleAddDriverEvent)}
    >
      <h5>RECORD EVENT</h5>

      <div className="d-flex gap-2">
        <TimeField
          control={control}
          name="start_time"
          label="Start Time"
          isRequired
          value={formData?.start_time}
          parentClassNames="w-50"
          onKeyUp={() =>
            errors.start_time !== undefined && trigger("start_time")
          }
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, start_time: val }));
          }}
          errorMessage={errors?.start_time?.message}
        />

        <TimeField
          control={control}
          name="end_time"
          label="End Time"
          isRequired
          value={formData?.end_time}
          parentClassNames="w-50"
          onKeyUp={() => errors.end_time !== undefined && trigger("end_time")}
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, end_time: val }));
          }}
          errorMessage={errors?.end_time?.message}
        />
      </div>

      <SelectField
        control={control}
        name="event_status"
        label="Event Status"
        value={formData?.remarks}
        options={[
          { name: "Off Duty", id: "OFF_DUTY" },
          { name: "On Duty", id: "ON_DUTY" },
          { name: "Driving", id: "DRIVING" },
          { name: "Sleeper Birth", id: "SLEEPER_BIRTH" },
        ]}
        valueKey="id"
        labelKey="name"
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, event_status: val }));
        }}
        errorMessage={errors?.event_status?.message}
      />

      <InputField
        control={control}
        name="remarks"
        label="Remarks"
        placeholder="Enter remarks"
        value={formData?.remarks}
        onKeyUp={() => errors.remarks !== undefined && trigger("remarks")}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, remarks: val }));
        }}
        errorMessage={errors?.remarks?.message}
      />

      <InputField
        control={control}
        name="location"
        label="Location"
        placeholder="Enter location"
        value={formData?.location}
        onKeyUp={() => errors.location !== undefined && trigger("location")}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, location: val }));
        }}
        errorMessage={errors?.location?.message}
      />

      <Button
        className="mt-auto"
        type="submit"
        isLoading={isPending}
        isDisabled={isPending}
      >
        Record Event
      </Button>
    </form>
  );
};
