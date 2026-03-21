import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

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

const NavGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: static;
  }
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

const Submenu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 220px;
  padding: 12px 14px;
  border: 1px solid rgba(43, 42, 42, 0.08);
  border-radius: 4px;
  background: rgba(247, 247, 245, 0.98);
  backdrop-filter: blur(16px);
  display: grid;
  gap: 8px;
  opacity: 0;
  transform: translateY(6px);
  pointer-events: none;
  transition: ${({ theme }) => theme.transitions.hover};

  ${NavGroup}:hover &,
  ${NavGroup}:focus-within & {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SubmenuLink = styled(Link)`
  display: grid;
  gap: 2px;
  padding: 2px 0;

  &:hover {
    color: ${({ theme }) => theme.colors.subpage.accent};
  }
`;

const SubmenuTitle = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SubmenuText = styled.span`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.82rem;
  line-height: 1.5;
  letter-spacing: 0;
  text-transform: none;
`;

const menus = [
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Research',
    to: '/research',
    submenu: [
      {
        label: 'Projects',
        to: '/research',
        text: 'Core research projects in misinformation and platform governance.',
      },
      {
        label: 'Coursework',
        to: '/research?section=coursework',
        text: 'Selected papers and course-based work kept under the same umbrella.',
      },
    ],
  },
  {
    label: 'Activities',
    to: '/activities',
    submenu: [
      {
        label: 'Activities',
        to: '/activities',
        text: 'Talks, diplomacy, leadership, and public-facing work.',
      },
      {
        label: 'Archive',
        to: '/activities?section=archive',
        text: 'Lighter visits and records kept inside Activities, not as a separate front door.',
      },
    ],
  },
];

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
          {menus.map((item) => (
            <NavGroup key={item.label}>
              <NavItem to={item.to}>
                {item.label}
              </NavItem>
              {item.submenu && (
                <Submenu>
                  {item.submenu.map((subitem) => (
                    <SubmenuLink key={subitem.label} to={subitem.to}>
                      <SubmenuTitle>{subitem.label}</SubmenuTitle>
                      <SubmenuText>{subitem.text}</SubmenuText>
                    </SubmenuLink>
                  ))}
                </Submenu>
              )}
            </NavGroup>
          ))}
        </Nav>
      </HeaderInner>
    </HeaderShell>
  );
}

export default Header;
