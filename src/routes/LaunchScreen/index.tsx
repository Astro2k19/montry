import React from "react";
import styles from "@styles/routes/Starter.module.scss";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router";
import { AUTH_SCREEN, DASHBOARD_SCREEN } from "@/navigation/CONSTANTS";
import { useAppSelector } from "@/redux/hooks";
import { useIsUserSetupQuery } from "@/redux/api/apiSetup";
import { Navigate } from "react-router-dom";

export const LaunchScreen: React.FC = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const { data: isSetup } = useIsUserSetupQuery({ uid: authUser?.uid });
  const navigate = useNavigate();

  if (authUser && isSetup) {
    return <Navigate to={DASHBOARD_SCREEN} replace={true} />;
  }

  return (
    <motion.div
      className={styles.root}
      animate={{ y: 0 }}
      transition={{
        delay: 0.3,
        x: { duration: 0.3 },
        default: { ease: "easeInOut" },
      }}
      exit={{ y: "-100vh", transition: { duration: 0.3 } }}
    >
      <div className={styles.intro}>montra</div>
      <Button
        text={"Get Started"}
        type={"transViolet"}
        clickHandler={() => navigate(AUTH_SCREEN)}
      />
    </motion.div>
  );
};
