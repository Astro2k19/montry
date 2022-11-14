import React from "react";
import { ISlide } from "./index";
import { SlideImage } from "./SlideImage";
import { SlideContent } from "./SlideContent";
import styles from "@styles/components/Slider.module.scss";

export const Slide: React.FC<ISlide> = ({ url, title, text }) => {
  return (
    <div className={styles.slide}>
      <SlideImage url={url} />
      <SlideContent title={title} text={text} />
    </div>
  );
};
