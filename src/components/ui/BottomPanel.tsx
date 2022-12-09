import React from "react";
import styles from "@styles/components/BottomPanel.module.scss";

const BottomPanel = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.panel}>{children}</div>;
};

export default BottomPanel;
