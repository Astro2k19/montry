import styles from "@styles/components/Slider.module.scss";
import React from "react";
import {SliderContext} from "../index";
import {Dot} from "./Dot";

export const Dots: React.FC = () => {
    const {sliderList} = React.useContext(SliderContext);

    console.log(sliderList)

    if (!sliderList.length) return <></>;

    return <ul className={styles.dots}>
        {
            Array(sliderList.length).fill(undefined).map((_, index) => {
                return <Dot key={index} number={index}/>
            })
        }
    </ul>;
};
