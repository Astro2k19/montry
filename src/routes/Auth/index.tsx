import { motion } from "framer-motion";
import { Slider } from "../../components/Slider";
import { Button } from "../../components/Button";
import styles from "@styles/routes/Auth.module.scss";

export const Auth = () => {
  Slider;

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
        <Button text={"Sign Up"} type={"violet"} path={"/signup"} />
        <Button text={"Login"} type={"transViolet"} path={"/login"} />
      </div>
    </motion.div>
  );
};
