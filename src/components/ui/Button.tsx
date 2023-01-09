import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  type: string;
  icon?: string;
  disabled?: boolean;
  clickHandler: (event: React.MouseEvent) => void;
}

export enum ButtonType {
  VIOLET = "violet",
  TRANS_VIOLET = "transViolet",
  WHITE = "white",
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type,
  clickHandler,
  icon,
  disabled = false,
}) => {
  const classes = classNames("button", {
    violet: type === ButtonType.VIOLET,
    transViolet: type === ButtonType.TRANS_VIOLET,
    white: type === ButtonType.WHITE,
  });

  return (
    <motion.button
      className={classes}
      onClick={clickHandler}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <img src={icon} alt="icon" />}
      {text}
    </motion.button>
  );
};
