import React from "react";
import styles from "@styles/components/Panel.module.scss";

const BottomPanel = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.bottomPanel}>{children}</div>;
};

export default BottomPanel;
