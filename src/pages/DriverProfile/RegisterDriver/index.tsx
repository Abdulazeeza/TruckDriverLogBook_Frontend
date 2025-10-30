import globalStyles from "@/assets/styles/globalStyles.module.scss";
import { RegisterDriverForm } from "../../../components/secondary";

const RegisterDriver = () => {
  return (
    <div className={globalStyles.pageWrapper}>
      <RegisterDriverForm />
    </div>
  );
};

export default RegisterDriver;
