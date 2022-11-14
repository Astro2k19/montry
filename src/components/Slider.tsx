import {motion} from "framer-motion";
import illustration from '../assets/Illustration.svg';

export const Slider = () => {

    return (
        <div className='slider'>
            <div className="slider__image">
                <img src={illustration} alt=""/>
            </div>
            <div className="slider__content content-slider">
                <h2 className='content-slider__title'>Gain total control
                    of your money
                </h2>
                <div className="content-slider__text">Become your own money manager and make every cent count</div>
                <ul className="slider__dots slider-dots">
                    <li className='slider-dots__item'></li>
                    <li className='slider-dots__item'></li>
                    <li className='slider-dots__item'></li>
                </ul>
            </div>
        </div>
    );
}

