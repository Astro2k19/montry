import React from "react";
import styles from "@styles/components/Slider.module.scss";
import {SliderContext} from "../index";
import classNames from "classnames/bind";

interface IDot {
    number: number
}

let cx = classNames.bind(styles);

export const Dot: React.FC<IDot> = ({number}) => {
    const {slide, changeSpecificSlide} = React.useContext(SliderContext);

    let classNames = cx({
        dot: true,
        active: slide == number,
    })

    return (
        <li className={classNames} onClick={() => changeSpecificSlide(number)}></li>
    );
}