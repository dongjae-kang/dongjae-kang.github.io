import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

function PageTransition({ children }) {
  return (
    <MotionDiv variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </MotionDiv>
  );
}

export default PageTransition;
