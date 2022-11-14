import { SliderList } from "./SliderList";
import { Dots } from "./Controls/Dots";
import firstSlide from "@assets/slider/illustration.svg";
import secondSlide from "@assets/slider/illustration2.svg";
import thirdSlide from "@assets/slider/illustration3.svg";
import styles from "@styles/components/Slider.module.scss";
import React from "react";

export interface ISlide {
  url: string;
  title: string;
  text: string;
}

export const SliderContext = React.createContext({});

export const Slider = () => {
  const [slide, setSlide] = React.useState<number>(0);
  const [sliderList, setSliderList] = React.useState<ISlide[]>([]);
  const [touchPosition, setTouchPosition] = React.useState<number>();

  React.useEffect(() => {
    setSliderList([
      {
        url: firstSlide,
        title: "Gain total control of your money",
        text: "Become your own money manager and make every cent count",
      },
      {
        url: firstSlide,
        title: "Know where your money goes",
        text: "Track your transaction easily, with categories and financial report",
      },
      {
        url: firstSlide,
        title: "Planning ahead",
        text: "Setup your budget for each category so you in control",
      },
    ]);
  }, []);

  const changeSlide = (direction: number) => {
    const newSlide =
      slide + direction < 0
        ? sliderList.length - 1
        : (slide + direction) % sliderList.length;

    setSlide(newSlide);
  };

  const changeSpecificSlide = (index: number) => {
    setSlide(index % sliderList.length);
  };

  const onTouchStart = (event: React.TouchEvent) => {
    // event.touche

    console.log(event);
  };

  const onTouchMove = (event: React.TouchEvent) => {
    console.log(event);
  };

  return (
    <SliderContext.Provider value={{ slide, sliderList, changeSpecificSlide }}>
      <div
        className={styles.slider}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <SliderList />
        <Dots />
      </div>
    </SliderContext.Provider>
  );
};
