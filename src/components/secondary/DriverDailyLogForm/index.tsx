import { Button, InputField } from "../../primary";
import styles from "../LoginDriverForm/styles.module.scss";
import { useDriverDailyLogForm } from "./useDriverDailyLogForm";
import { useValidation } from "./useValidation";

export const DriverDailyLogForm = ({ closeModal = () => {} }) => {
  const { isPending, formData, setFormData, handleCreateDriverDailyLog } =
    useDriverDailyLogForm({ closeModal });
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useValidation({ ...formData });

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(handleCreateDriverDailyLog)}
    >
      <h5>CREATE DRIVER'S LOG</h5>

      <div className="d-flex gap-2">
        <InputField
          control={control}
          name="commodity"
          label="Commodity"
          placeholder="Enter commodity"
          parentClassNames="w-50"
          isRequired
          value={formData?.commodity}
          onKeyUp={() => errors.commodity !== undefined && trigger("commodity")}
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, commodity: val }));
          }}
          errorMessage={errors?.commodity?.message}
        />

        <InputField
          control={control}
          name="shipper_company"
          label="Shipper Company"
          placeholder="Enter shipper company"
          isRequired
          parentClassNames="w-50"
          value={formData?.shipper_company}
          onKeyUp={() =>
            errors.shipper_company !== undefined && trigger("shipper_company")
          }
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, shipper_company: val }));
          }}
          errorMessage={errors?.shipper_company?.message}
        />
      </div>
      <div className="d-flex gap-2">
        <InputField
          control={control}
          name="current_location"
          label="Current Location"
          parentClassNames="w-50"
          placeholder="Enter current location"
          value={formData?.current_location}
          onKeyUp={() =>
            errors.current_location !== undefined && trigger("current_location")
          }
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, current_location: val }));
          }}
          errorMessage={errors?.current_location?.message}
        />

        <InputField
          control={control}
          name="pickup_location"
          label="Pickup Location"
          placeholder="Enter pickup location"
          parentClassNames="w-50"
          value={formData?.pickup_location}
          onKeyUp={() =>
            errors.pickup_location !== undefined && trigger("pickup_location")
          }
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, pickup_location: val }));
          }}
          errorMessage={errors?.pickup_location?.message}
        />
      </div>

      <div className="d-flex gap-2">
        <InputField
          control={control}
          name="dropoff_location"
          label="Dropoff Location"
          parentClassNames="w-50"
          placeholder="Enter dropoff location"
          value={formData?.dropoff_location}
          onKeyUp={() =>
            errors.dropoff_location !== undefined && trigger("dropoff_location")
          }
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, dropoff_location: val }));
          }}
          errorMessage={errors?.dropoff_location?.message}
        />

        <InputField
          control={control}
          name="total_driving_miles"
          label="Total Driven Miles"
          placeholder="Enter driven miles"
          parentClassNames="w-50"
          // type="number"
          value={formData?.total_driving_miles}
          onKeyUp={() =>
            errors.total_driving_miles !== undefined &&
            trigger("total_driving_miles")
          }
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, total_driving_miles: val }));
          }}
          errorMessage={errors?.total_driving_miles?.message}
        />
      </div>

      <div className="d-flex gap-2">
        <InputField
          control={control}
          name="truck_miles"
          label="Truck Miles"
          placeholder="Enter truck miles"
          parentClassNames="w-50"
          type="number"
          value={formData?.truck_miles}
          onKeyUp={() =>
            errors.truck_miles !== undefined && trigger("truck_miles")
          }
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, truck_miles: val }));
          }}
          errorMessage={errors?.truck_miles?.message}
        />

        <InputField
          control={control}
          name="trailer_numbers"
          label="Trailer Number"
          placeholder="Enter trailer number"
          parentClassNames="w-50"
          onKeyUp={() =>
            errors.trailer_numbers !== undefined && trigger("trailer_numbers")
          }
          onChange={(val) => {
            setFormData((prev) => ({
              ...prev,
              trailer_numbers: val !== "" && val ? [val] : [],
            }));
          }}
          errorMessage={errors?.trailer_numbers?.message}
        />
      </div>

      <div className="d-flex gap-2">
        <InputField
          control={control}
          name="load_numbers"
          label="Load Number"
          placeholder="Enter load number"
          parentClassNames="w-50"
          onKeyUp={() =>
            errors.load_numbers !== undefined && trigger("load_numbers")
          }
          onChange={(val) => {
            setFormData((prev) => ({
              ...prev,
              load_numbers: val !== "" && val ? [val] : [],
            }));
          }}
          errorMessage={errors?.load_numbers?.message}
        />
      </div>

      <Button
        className="mt-auto"
        type="submit"
        isLoading={isPending}
        isDisabled={isPending}
      >
        Create Driver's Daily Log
      </Button>
    </form>
  );
};
