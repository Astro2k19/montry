import React from "react";
import { BiArrowBack } from "react-icons/all";
import styles from "@styles/components/TopBar.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router";

interface ITopBar {
  text: string;
  type: string;
}

export enum TopBarTypes {
  DARK = "dark",
  LIGHT = "light",
}

const cx = classNames.bind(styles);

export const TopBar: React.FC<ITopBar> = ({
  text,
  type = TopBarTypes.DARK,
}) => {
  const navigate = useNavigate();

  const classes = cx(styles.bar, {
    white: type === TopBarTypes.LIGHT,
  });

  const goBack = () => navigate(-1);

  return (
    <header className={classes}>
      <button className={styles.buttonBack} onClick={goBack}>
        <BiArrowBack />
      </button>
      <div className={styles.barText}>{text}</div>
    </header>
  );
};
