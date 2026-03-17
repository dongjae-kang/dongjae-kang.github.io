import { m } from 'framer-motion';

const MotionDiv = m.div;

const variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.45, ease: 'easeOut' },
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
