import React from "react";
import styles from './Starter.module.scss';
import {Button} from "../../components/Button";
import {Link} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";

export const Starter: React.FC = () => {

    return (
        <motion.div
            className={styles.root}
            animate={{y: 0}}
            transition={{
                delay: 0.3,
                x: {duration: 0.3},
                default: {ease: "easeInOut"}
            }}
            exit={{y: '-100vh', transition: {duration: 0.3} }}
        >
            <div className={styles.intro}>montra</div>
            <Button text={'Get Started'} type={'transViolet'}/>
        </motion.div>
    );
}

