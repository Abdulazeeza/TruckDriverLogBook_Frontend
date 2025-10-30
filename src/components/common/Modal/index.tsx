import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { CancelIcon } from "../../../assets/icons";

export const Modal = ({
  children,
  width = "500px",
  height = "100%",
  isActive = false,
  closeViaOverlay = true,
  position = "center",
  closeModal = () => {},
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  isActive: boolean;
  closeViaOverlay?: boolean;
  position?: "center" | "left" | "right";
  closeModal?: () => void;
}) => {
  // Lock background scroll when modal is active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function to re-enable scroll on modal close
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  // Render modal only if it's active
  if (!isActive) return null;

  return (
    <div className={`${styles["modal"]} ${styles[position]}`}>
      {/* back layer */}
      <div
        onClick={() => {
          if (closeViaOverlay) closeModal();
        }}
        className={styles["modal__backdrop"]}
      ></div>

      {/* modal section */}
      <motion.div
        initial={{
          y: position === "center" ? -50 : 0,
          x: position === "right" ? 500 : position === "left" ? -500 : 0,
        }}
        animate={{
          y: 0,
          x: 0,
        }}
        className={`${styles["modal__container"]}`}
        style={{ width: width, height: height }}
      >
        <CancelIcon
          size={25}
          className="ms-auto d-block cursor-pointer mb-3"
          onClick={closeModal}
        />

        {children}
      </motion.div>
    </div>
  );
};
