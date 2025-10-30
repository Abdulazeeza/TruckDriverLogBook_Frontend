import globalStyles from "@/assets/styles/globalStyles.module.scss";
import { LoginDriverForm } from "../../../components/secondary";

const LoginDriver = () => {
  return (
    <div className={globalStyles.pageWrapper}>
      <LoginDriverForm />
    </div>
  );
};

export default LoginDriver;
