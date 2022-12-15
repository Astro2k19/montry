import styles from "@styles/components/Navigation.module.scss";
import React from "react";
import { Link } from "react-router-dom";

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

interface IAddAccount {
  path: string;
  children: React.ReactNode;
  classes: string;
}
export const AddAccount: React.FC<IAddAccount> = ({
  path,
  children,
  classes,
}) => {
  return (
    <Link to={path} className={classes}>
      {children}
    </Link>
  );
};
