import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { research } from '../data/research';
import { coursework } from '../data/coursework';

const AsideWrapper = styled.div`
  width: 220px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Aside = styled.aside`
  position: fixed;
  top: 80px;
  width: 220px;
  height: calc(100vh - 80px);
  padding: 24px 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.subpage.border};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.light.background};
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const SideSection = styled.div`
  margin-bottom: 20px;
`;

const SideSectionTitle = styled.a`
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $active }) => $active ? 'rgba(27, 61, 47, 0.85)' : '#999'};
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.15s;
  &:hover { color: #1a1a1a; }
`;

const SideItems = styled.div`
  display: grid;
  gap: 1px;
`;

const SideItem = styled(Link)`
  font-size: 0.74rem;
  color: ${({ $active }) => $active ? 'rgba(27, 61, 47, 0.9)' : '#777'};
  background: ${({ $active }) => $active ? 'rgba(27, 61, 47, 0.06)' : 'transparent'};
  font-weight: ${({ $active }) => $active ? '500' : '400'};
  padding: 4px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.12s;
  line-height: 1.35;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover { color: #1a1a1a; background: rgba(27, 61, 47, 0.04); }
`;

function ResearchSidebar({ onScrollTo }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isDetailPage = currentPath.startsWith('/research/');
  const currentId = isDetailPage ? currentPath.replace('/research/', '') : null;

  const handleScroll = (sectionId) => {
    if (onScrollTo) {
      onScrollTo(sectionId);
    }
  };

  return (
    <AsideWrapper>
    <Aside>
      <SideSection>
        <SideSectionTitle
          $active={!isDetailPage}
          onClick={() => handleScroll('projects')}
        >
          Projects
        </SideSectionTitle>
        <SideItems>
          {research.map((item) => (
            <SideItem
              key={item.id}
              to={`/research/${item.id}`}
              $active={currentId === item.id}
            >
              {item.title}
            </SideItem>
          ))}
        </SideItems>
      </SideSection>

      <SideSection>
        <SideSectionTitle onClick={() => handleScroll('coursework')}>
          Coursework & Papers
        </SideSectionTitle>
        <SideItems>
          {coursework.map((item) => (
            <SideItem
              key={item.id}
              to={`/research/${item.id}`}
              $active={currentId === item.id}
            >
              {item.title}
            </SideItem>
          ))}
        </SideItems>
      </SideSection>
    </Aside>
    </AsideWrapper>
  );
}

export default ResearchSidebar;
