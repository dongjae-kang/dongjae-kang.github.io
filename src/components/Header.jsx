import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

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
  padding-bottom: 12px;
  margin-bottom: -12px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: static;
    padding-bottom: 0;
    margin-bottom: 0;

    &::after {
      display: none;
    }
  }
`;

const NavItem = styled(NavLink)`
  display: inline-flex;
  align-items: center;
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

const Chevron = styled.span`
  margin-left: 4px;
  font-size: 0.6em;
  opacity: 0.5;
  transform: translateY(-1px);
`;

const Submenu = styled.div`
  position: absolute;
  top: calc(100% - 4px);
  right: 0;
  min-width: 190px;
  padding: 8px 0;
  border: 1px solid rgba(154, 184, 158, 0.16);
  border-radius: 4px;
  background: rgba(27, 61, 47, 0.92);
  backdrop-filter: blur(16px);
  display: grid;
  gap: 0;
  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: opacity 0.18s ease, transform 0.18s ease;

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

const SubmenuButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 20px;
  text-align: left;
  color: rgba(247, 247, 245, 0.72);
  opacity: 1;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    color: rgba(247, 247, 245, 1);
    background: rgba(154, 184, 158, 0.08);
  }
`;

const SubmenuTitle = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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
        label: 'Main Research',
        to: '/research',
        section: null,
      },
      {
        label: 'Coursework & Papers',
        to: '/research',
        section: 'coursework',
      },
    ],
  },
  {
    label: 'Activities',
    to: '/activities',
    submenu: [
      {
        label: 'Main Activities',
        to: '/activities',
        section: null,
      },
      {
        label: 'Archive',
        to: '/activities',
        section: 'archive',
      },
    ],
  },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSubmenuNavigation = (item) => {
    const target = item.section ? `${item.to}?section=${item.section}` : item.to;
    navigate(target);

    if (!item.section) {
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
      return;
    }

    window.setTimeout(() => {
      const id = item.section;
      const sectionNode = document.getElementById(id);
      sectionNode?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 90);
  };

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
                {item.submenu && <Chevron>▾</Chevron>}
              </NavItem>
              {item.submenu && (
                <Submenu>
                  {item.submenu.map((subitem) => (
                    <SubmenuButton
                      key={subitem.label}
                      type="button"
                      onClick={() => handleSubmenuNavigation(subitem)}
                    >
                      <SubmenuTitle>{subitem.label}</SubmenuTitle>
                    </SubmenuButton>
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
