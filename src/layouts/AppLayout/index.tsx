import { AppHeader } from "../../components/secondary";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default AppLayout;
