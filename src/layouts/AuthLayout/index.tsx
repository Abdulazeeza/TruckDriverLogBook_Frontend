import { AuthHeaderNav } from "../../components/secondary";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <AuthHeaderNav />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
