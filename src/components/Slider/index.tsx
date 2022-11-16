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
  const [touchStartPosition, setTouchStartPosition] = React.useState<
    number | null
  >(0);

  React.useEffect(() => {
    setSliderList([
      {
        url: firstSlide,
        title: "Gain total control of your money",
        text: "Become your own money manager and make every cent count",
      },
      {
        url: secondSlide,
        title: "Know where your money goes",
        text: "Track your transaction easily, with categories and financial report",
      },
      {
        url: thirdSlide,
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
    const touchStart = event.touches[0].pageX;
    setTouchStartPosition(touchStart);
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (touchStartPosition === null) return;

    const touchMove = event.touches[0].pageX;
    const difference = touchStartPosition - touchMove;

    if (difference > 5) {
      changeSlide(1);
    } else if (difference < -5) {
      changeSlide(-1);
    }

    setTouchStartPosition(null);
  };

  return (
    <div
      className={styles.slider}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <SliderContext.Provider
        value={{ slide, sliderList, changeSpecificSlide }}
      >
        <SliderList />
        <Dots />
      </SliderContext.Provider>
    </div>
  );
};
