import styles from "./styles.module.scss";
import { Button } from "../../primary";
import { useNavigate } from "react-router-dom";
import { pathConstants } from "../../../RootRoutes/pathContants";

export const AuthHeaderNav = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <h2>Truck Driver Log Center</h2>
      <nav className="d-flex">
        <Button onClick={() => navigate(pathConstants.LOGIN_DRIVER)}>
          Log In
        </Button>
        <Button
          variantColor="btn--primary-outline"
          className="ms-2"
          onClick={() => navigate(pathConstants.REGISTER_DRIVER)}
        >
          Register
        </Button>
      </nav>
    </header>
  );
};
