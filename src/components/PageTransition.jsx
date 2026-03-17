import styled, { keyframes } from 'styled-components';

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TransitionWrap = styled.div`
  animation: ${fadeSlideIn} 0.6s ease-out both;
`;

function PageTransition({ children }) {
  return <TransitionWrap>{children}</TransitionWrap>;
}

export default PageTransition;
