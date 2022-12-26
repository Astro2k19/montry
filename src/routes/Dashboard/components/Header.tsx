import React from "react";
import { Avatar } from "@/routes/Dashboard/components/Avatar";
import styles from "@styles/components/Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Avatar />
    </header>
  );
};
