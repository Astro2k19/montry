import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  type: string;
  path: string;
}

export const Button: React.FC<ButtonProps> = ({ text, type, path }) => {
  const buttonOptions: any = {
    background: {
      violet: "#7F3DFF",
      transViolet: "#EEE5FF",
    },
    color: {
      violet: "#EEE5FF",
      transViolet: "#7F3DFF",
    },
  };

  const styles = {
    background: buttonOptions.background[type],
    color: buttonOptions.color[type],
  };

  return (
    <Link to={path} className={"button"} style={styles}>
      {text}
    </Link>
  );
};
