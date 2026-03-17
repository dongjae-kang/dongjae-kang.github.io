import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const FooterWrap = styled.footer`
  width: 100%;
  padding: 32px 24px 40px;
  background: ${({ $home }) => ($home ? '#1A1A1A' : 'transparent')};
`;

const FooterInner = styled.div`
  width: min(1180px, calc(100% - 16px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $home }) => ($home ? 'rgba(245, 240, 232, 0.8)' : 'rgba(43, 42, 42, 0.7)')};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <FooterWrap $home={isHome}>
      <FooterInner $home={isHome}>
        <span>Dongjae (Jack) Kang</span>
        <span>{new Date().getFullYear()}</span>
      </FooterInner>
    </FooterWrap>
  );
}

export default Footer;
