'use client'

import { motion } from 'framer-motion'

interface AnimationContainerProps {
    children: React.ReactNode;
    delay?: number;
    reverse?: boolean;
    className?: string;
    animate?: any;
    initial?: any;
    exit?: any;
    mode?: string;
    transition?: any;
    onClick?: () => void;
}

const AnimationContainer = ({
    children,
    delay,
    reverse,
    className,
    animate,
    initial,
    exit,
    mode,
    transition,
    onClick
}: AnimationContainerProps) => {
    return (
        <motion.div
            className={className}
            initial={initial || { opacity: 0, y: reverse ? -20 : 20 }}
            animate={animate || { opacity: 1, y: 0 }}
            exit={exit}
            viewport={{ once: false }}
            transition={transition || {
                duration: 0.2,
                delay: delay,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 260,
                damping: 20
            }}
            onClick={onClick}
        >
            {children}
        </motion.div>

    )
}

export default AnimationContainer;