import styles from "@styles/components/Slider.module.scss";
import React from "react";

interface ISlideImage {
  url: string;
}

export const SlideImage: React.FC<ISlideImage> = ({ url }) => {
  return <img src={url} alt="" />;
};
