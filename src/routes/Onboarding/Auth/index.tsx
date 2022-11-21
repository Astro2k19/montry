import { motion } from "framer-motion";
import { Slider } from "../../../components/Slider";
import { Button, ButtonType } from "../../../components/Button";
import styles from "@styles/routes/Auth.module.scss";
import { useNavigate } from "react-router";

export const Auth = () => {
  const navigate = useNavigate();

  const goTo = (path: string) => navigate(path);

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
          clickHandler={() => goTo("/signup")}
        />
        <Button
          text={"Login"}
          type={ButtonType.TRANS_VIOLET}
          clickHandler={() => goTo("/login")}
        />
      </div>
    </motion.div>
  );
};
