import styled from 'styled-components';

const FooterWrap = styled.footer`
  width: 100%;
  padding: 32px 24px 40px;
  background: transparent;
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
  color: rgba(43, 42, 42, 0.68);
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
  padding-top: 20px;

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

  &:hover {
    opacity: 1;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.subpage.accent};
  }
`;

function Footer() {
  return (
    <FooterWrap>
      <FooterInner>
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
