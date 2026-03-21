import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

const HeaderShell = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const HeaderInner = styled.div`
  width: min(${({ theme }) => theme.layout.contentMax}, calc(100% - 32px));
  margin-top: 16px;
  padding: 16px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  pointer-events: auto;
  backdrop-filter: blur(16px);
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(247, 247, 245, 0.92)' : 'rgba(247, 247, 245, 0.68)'};
  border: 1px solid rgba(43, 42, 42, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100% - 24px);
    padding: 14px 16px;
    gap: 12px;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Brand = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.98rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const NavItem = styled(NavLink)`
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.subpage.text};
  opacity: 0.7;

  &.active,
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.subpage.accent};
  }
`;

function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  return (
    <HeaderShell>
      <HeaderInner $scrolled={scrolled}>
        <Brand to="/">
          DONGJAE KANG
        </Brand>
        <Nav>
          <NavItem to="/about">
            About
          </NavItem>
          <NavItem to="/research">
            Research
          </NavItem>
          <NavItem to="/activities">
            Activities
          </NavItem>
          <NavItem to="/archive">
            Archive
          </NavItem>
        </Nav>
      </HeaderInner>
    </HeaderShell>
  );
}

export default Header;
