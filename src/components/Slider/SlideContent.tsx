import React from "react";
import styles from "@styles/components/Slider.module.scss";

interface ISlideContent {
  title: string;
  text: string;
}

export const SlideContent: React.FC<ISlideContent> = ({ title, text }) => {
  return (
    <div className={styles.content}>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};
