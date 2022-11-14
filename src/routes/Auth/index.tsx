import {motion} from "framer-motion";
import {Slider} from "../../components/Slider";
import {Button} from "../../components/Button";

export const Auth = () => {

    Slider

    return (
        <motion.div
            initial={{y: '100vh'}}
            animate={{y: 0}}
            transition={{
                delay: 0.3,
                x: {duration: 0.3},
                default: {ease: "easeInOut"}
            }}
        >
        <Slider />
            <Button text={'Sign Up'} type={'violet'} />
            <Button text={'Login'} type={'transViolet'} />
        </motion.div>
    );
}

