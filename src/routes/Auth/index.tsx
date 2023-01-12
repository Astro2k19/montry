import { motion } from "framer-motion";
import { Slider } from "@/components/Slider";
import { Button, ButtonType } from "@/components/ui/Button";
import styles from "@styles/routes/Auth.module.scss";
import { useNavigate } from "react-router";
import {
  DASHBOARD_SCREEN,
  LOGIN_SCREEN,
  SETUP_ACCOUNT_SCREEN,
  SIGNUP_SCREEN,
} from "@/navigation/CONSTANTS";
import { useAppSelector } from "@/redux/hooks";
import { useIsUserSetupQuery } from "@/redux/api/apiSetup";
import React from "react";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  const goTo = (path: string) => navigate(path);

  const { authUser } = useAppSelector((state) => state.auth);
  const { data: isSetup } = useIsUserSetupQuery({ uid: authUser?.uid });

  if (authUser && isSetup) {
    return <Navigate to={DASHBOARD_SCREEN} />;
  } else if (authUser && !isSetup) {
    return <Navigate to={SETUP_ACCOUNT_SCREEN} />;
  }

  React.useEffect(() => {
    if (authUser && isSetup) navigate(DASHBOARD_SCREEN, { replace: true });
  }, []);

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      transition={{
        delay: 0.3,
        x: { duration: 0.3 },
        default: { ease: "easeInOut" },
      }}
    >
      <Slider />
      <div className={styles.buttonsGroup}>
        <Button
          text={"Sign Up"}
          type={ButtonType.VIOLET}
          clickHandler={() => goTo(SIGNUP_SCREEN)}
        />
        <Button
          text={"Login"}
          type={ButtonType.TRANS_VIOLET}
          clickHandler={() => goTo(LOGIN_SCREEN)}
        />
      </div>
    </motion.div>
  );
};
