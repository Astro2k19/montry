import React from "react";
import styles from "@styles/components/Slider.module.scss";
import { ISlide, SliderContext } from "./index";
import { Slide } from "./Slide";

export const SliderList: React.FC = () => {
  // @ts-ignore
  const { sliderList } = React.useContext(SliderContext);

  return (
    <div className={styles.list}>
      {sliderList.map((item: ISlide, index: number) => (
        <Slide key={index} {...item} />
      ))}
    </div>
  );
};
