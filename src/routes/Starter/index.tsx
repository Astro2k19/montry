import React from "react";
import styles from "@styles/routes/Starter.module.scss";
import { motion } from "framer-motion";
import { Button } from "@components/Button";
import {useNavigate} from "react-router";

export const Starter: React.FC = () => {

    const navigate = useNavigate();

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
      <Button text={"Get Started"} type={"transViolet"}  clickHandler={() => navigate('/auth')} />
    </motion.div>
  );
};
