import React from "react";
import styles from "@styles/components/Panel.module.scss";

const TopPanel = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.topPanel}>{children}</div>;
};

export default TopPanel;
