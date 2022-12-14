import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "@/scss/components/ScreenCurtain.module.scss";

interface IScreenCurtain {
  children: React.ReactNode;
  isOpen: boolean;
  closeCurtain: (event: React.MouseEvent) => void;
}

const ScreenCurtain = React.forwardRef<any, IScreenCurtain>(
  ({ children, isOpen, closeCurtain }, ref) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            key="backdrop"
            className={styles.curtainBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, zIndex: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // data-isopen={isOpen}
            onClick={closeCurtain}
          >
            <motion.div
              layout
              key="curtain"
              initial={{ translateY: 100 }}
              animate={{ translateY: 0, zIndex: 2 }}
              exit={{ translateY: 100 }}
              transition={{ duration: 0.3 }}
              className={styles.curtain}
              ref={ref}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
export default ScreenCurtain;
