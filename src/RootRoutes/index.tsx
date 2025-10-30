import { Route, Routes } from "react-router-dom";
import { pages } from "../pages";
import { pathConstants } from "./pathContants";
import { layouts } from "../layouts";

const RootRoutes = () => {
  return (
    <Routes>
      {/* Start Access section */}
      <Route element={<layouts.AuthLayout />}>
        <Route
          path={pathConstants.REGISTER_DRIVER}
          element={<pages.RegisterDriver />}
        />
        <Route
          path={pathConstants.LOGIN_DRIVER}
          element={<pages.LoginDriver />}
        />
      </Route>
      {/* End Access section */}

      {/* Start app section */}
      <Route element={<layouts.AppLayout />}>
        <Route
          path={pathConstants.DRIVER_LOG({ driver_id: ":driver_id" })}
          element={<pages.DriverDailyLog />}
        />
        <Route
          path={pathConstants.DRIVER_LOG_EVENT({
            driver_id: ":driver_id",
            log_id: ":log_id",
          })}
          element={<pages.DriverLogEvent />}
        />
      </Route>
      {/* End appp section */}
    </Routes>
  );
};

export default RootRoutes;
