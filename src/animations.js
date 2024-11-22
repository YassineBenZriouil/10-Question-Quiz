import React from "react";
import { motion } from "framer-motion";

const animations = {
    initial: { opacity: 0, x: 100 },
    current: { opacity: 1, x: 0 },
    final: { opacity: 0, x: -100 },
};

const Animations = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="current"
            exit="final"
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
};

export default Animations;
