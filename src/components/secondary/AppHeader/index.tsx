import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";

export const AppHeader = () => {
  const { driver_id } = useParams();
  return (
    <header className={styles.header}>
      <h2>Truck Driver Log Center</h2>

      <h4>
        Driver ID: <span className={styles.title}>{driver_id}</span>
      </h4>
    </header>
  );
};
