import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { activities, communityEvents, offTheClock } from '../data/activities';

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

const SideScrollItem = styled.a`
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

const SubGroup = styled.div`
  margin-top: 6px;
  padding-left: 6px;
`;

const SubTitle = styled.div`
  font-size: 0.66rem;
  color: #aaa;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 3px;
  margin-top: 8px;
`;

function ActivitySidebar({ onScrollTo }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isDetailPage = currentPath.startsWith('/activities/');
  const currentId = isDetailPage ? currentPath.replace('/activities/', '') : null;

  const offTheClockCategories = Object.entries(offTheClock);

  const handleScroll = (sectionId) => {
    if (isDetailPage) {
      navigate('/activities');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else if (onScrollTo) {
      onScrollTo(sectionId);
    }
  };

  return (
    <AsideWrapper>
    <Aside>
      {/* TIER 1 */}
      <SideSection>
        <SideSectionTitle
          $active={!isDetailPage}
          onClick={() => handleScroll('tier1')}
        >
          Activities
        </SideSectionTitle>
        <SideItems>
          {activities.map((item) => (
            <SideItem
              key={item.id}
              to={`/activities/${item.id}`}
              $active={currentId === item.id}
            >
              {item.title.replace(/ — .*/, '')}
            </SideItem>
          ))}
        </SideItems>
      </SideSection>

      {/* TIER 2 */}
      <SideSection>
        <SideSectionTitle onClick={() => handleScroll('community')}>
          Community & Events
        </SideSectionTitle>
        <SideItems>
          {communityEvents.map((item) => (
            <SideScrollItem
              key={item.id}
              onClick={() => handleScroll(item.id)}
            >
              {item.title.replace(/ — .*/, '')}
            </SideScrollItem>
          ))}
        </SideItems>
      </SideSection>

      {/* TIER 3 */}
      <SideSection>
        <SideSectionTitle onClick={() => handleScroll('life')}>
          Off the Clock
        </SideSectionTitle>
        {offTheClockCategories.map(([key, category]) => (
          <SubGroup key={key}>
            <SubTitle>{category.label}</SubTitle>
            <SideItems>
              {category.items.filter((i) => i.media?.photos?.length > 0).map((item) => (
                <SideScrollItem
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                >
                  {item.title}
                </SideScrollItem>
              ))}
            </SideItems>
          </SubGroup>
        ))}
      </SideSection>
    </Aside>
    </AsideWrapper>
  );
}

export default ActivitySidebar;
