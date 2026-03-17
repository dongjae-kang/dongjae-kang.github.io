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
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  pointer-events: auto;
  backdrop-filter: blur(18px);
  background: ${({ $homeDark, $scrolled }) =>
    $homeDark
      ? $scrolled
        ? 'rgba(13, 26, 20, 0.76)'
        : 'rgba(13, 26, 20, 0.34)'
      : $scrolled
        ? 'rgba(245, 240, 232, 0.9)'
        : 'rgba(245, 240, 232, 0.74)'};
  border: 1px solid
    ${({ $homeDark }) => ($homeDark ? 'rgba(154, 184, 158, 0.18)' : 'rgba(61, 90, 62, 0.12)')};
  box-shadow: ${({ $scrolled, $homeDark }) =>
    $scrolled
      ? $homeDark
        ? '0 14px 40px rgba(0, 0, 0, 0.2)'
        : '0 12px 30px rgba(21, 54, 41, 0.08)'
      : 'none'};

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
  color: ${({ $homeDark, theme }) =>
    $homeDark ? theme.colors.home.text : theme.colors.subpage.text};
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
  color: ${({ $homeDark, theme }) =>
    $homeDark ? theme.colors.home.text : theme.colors.subpage.text};
  opacity: 0.7;

  &.active,
  &:hover {
    opacity: 1;
  }
`;

function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const isHome = location.pathname === '/';
  const homeDark = isHome && !heroPassed;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (isHome) {
        setHeroPassed(y > Math.max(window.innerHeight * 0.74, 520));
      } else {
        setHeroPassed(false);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <HeaderShell>
      <HeaderInner $homeDark={homeDark} $scrolled={scrolled}>
        <Brand to="/" $homeDark={homeDark}>
          DONGJAE KANG
        </Brand>
        <Nav>
          <NavItem to="/about" $homeDark={homeDark}>
            About
          </NavItem>
          <NavItem to="/research" $homeDark={homeDark}>
            Research
          </NavItem>
          <NavItem to="/activities" $homeDark={homeDark}>
            Activities
          </NavItem>
        </Nav>
      </HeaderInner>
    </HeaderShell>
  );
}

export default Header;
