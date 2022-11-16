import React from "react";
import styles from "@styles/routes/Starter.module.scss";
import { motion } from "framer-motion";
import { Button } from "@components/Button";

export const Starter: React.FC = () => {
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
      <Button text={"Get Started"} type={"transViolet"} path={"auth"} />
    </motion.div>
  );
};
