import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const FooterWrap = styled.footer`
  width: 100%;
  padding: 32px 24px 40px;
  background: ${({ $home, theme }) => ($home ? theme.colors.home.base : 'transparent')};
`;

const FooterInner = styled.div`
  width: min(${({ theme }) => theme.layout.contentMax}, calc(100% - 16px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: ${({ $home }) => ($home ? 'rgba(245, 240, 232, 0.8)' : 'rgba(43, 42, 42, 0.7)')};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const FooterLink = styled.a`
  opacity: 0.82;
`;

function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <FooterWrap $home={isHome}>
      <FooterInner $home={isHome}>
        <ContactRow>
          <FooterLink href="mailto:dk3500@columbia.edu">dk3500@columbia.edu</FooterLink>
          <FooterLink
            href="https://linkedin.com/in/jackkang3780"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </FooterLink>
          <FooterLink
            href="https://github.com/dongjae-kang"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </FooterLink>
        </ContactRow>
        <span>{new Date().getFullYear()}</span>
      </FooterInner>
    </FooterWrap>
  );
}

export default Footer;
