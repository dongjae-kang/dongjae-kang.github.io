import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { activities } from '../data/activities';
import { archive } from '../data/archive';

const featuredOrder = [
  'un-youth-forum',
  'kgsa-career',
  'valedictorian',
  'hyc-mixer',
  'upenn-mixer',
  'un-ga-hlw',
  'chi-2025',
  'student-council',
  'columbia-ai-club',
];

const Page = styled.main`
  min-height: 100vh;
  padding: 140px 24px 80px;
`;

const Container = styled.div`
  width: min(${({ theme }) => theme.layout.contentMax}, 100%);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.h1};
  margin-bottom: 16px;
`;

const Intro = styled.div`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-bottom: 32px;
  font-size: 1.04rem;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};

`;

const SectionNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
`;

const SectionNavLink = styled(Link)`
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.subpage.accent : theme.colors.subpage.muted};
  border-bottom: 1px solid
    ${({ $active }) =>
      $active ? 'rgba(27, 61, 47, 0.36)' : 'rgba(43, 42, 42, 0.08)'};
  padding-bottom: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  margin-top: 56px;
  padding-top: 28px;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
  scroll-margin-top: 108px;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1.08;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SectionText = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-bottom: 24px;
`;

const Card = styled(Link)`
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  border-radius: 4px;
  background: #fdfcfa;
  transition: ${({ theme }) => theme.transitions.hover};

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.subpage.accent};
    background: rgba(27, 61, 47, 0.04);
  }
`;

const Photo = styled.div`
  position: relative;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 3px;
  background:
    ${({ $hasImage }) =>
      $hasImage
        ? '#d9dfd9'
        : 'linear-gradient(160deg, rgba(27, 61, 47, 0.92), rgba(45, 90, 61, 0.76) 52%, rgba(154, 184, 158, 0.54))'};
  border: 1px solid rgba(196, 149, 106, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $hasImage }) => ($hasImage ? 'rgba(13, 26, 20, 0.12)' : 'transparent')};
    mix-blend-mode: multiply;
    pointer-events: none;
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  display: grid;
  gap: 4px;
  text-align: center;
  justify-items: center;
`;

const PhotoKicker = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(247, 247, 245, 0.72);
`;

const PhotoTitle = styled.span`
  max-width: 14ch;
  color: rgba(247, 247, 245, 0.9);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PhotoText = styled.span`
  max-width: 24ch;
  color: rgba(247, 247, 245, 0.62);
  font-size: 0.74rem;
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 500;
  line-height: 1.08;
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ArchiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ArchiveCard = styled.article`
  display: grid;
  gap: 12px;
`;

const ArchivePhoto = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  background:
    ${({ $hasImage }) =>
      $hasImage
        ? '#d9dfd9'
        : 'linear-gradient(160deg, rgba(27, 61, 47, 0.92), rgba(45, 90, 61, 0.76) 52%, rgba(154, 184, 158, 0.54))'};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $hasImage }) => ($hasImage ? 'rgba(13, 26, 20, 0.12)' : 'transparent')};
    mix-blend-mode: multiply;
    pointer-events: none;
  }
`;

const ArchiveImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArchivePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 18px;
  color: rgba(247, 247, 245, 0.84);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ArchiveMeta = styled.div`
  display: grid;
  gap: 2px;
`;

const ArchiveTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  line-height: 1.08;
  font-weight: 500;
`;

const ArchiveCaption = styled.span`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.84rem;
`;

function Activities() {
  const location = useLocation();
  const activitiesRef = useRef(null);
  const archiveRef = useRef(null);
  const visibleIds = new Set(featuredOrder);
  const orderedActivities = [
    ...featuredOrder
      .map((id) => activities.find((item) => item.id === id))
      .filter(Boolean),
    ...activities.filter((item) => !visibleIds.has(item.id) && !['ces', 'stanford'].includes(item.id)),
  ];
  const section = new URLSearchParams(location.search).get('section');

  useEffect(() => {
    if (section === 'archive') {
      archiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [section]);

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Activities</Title>
          <Intro>
            Talks, diplomacy, student leadership, and community-building across research and
            public life. Lighter records stay below as a smaller archive, not as a separate front
            page.
          </Intro>

          <SectionNav>
            <SectionNavLink to="/activities" $active={!section}>
              Activities
            </SectionNavLink>
            <SectionNavLink to="/activities?section=archive" $active={section === 'archive'}>
              Archive
            </SectionNavLink>
          </SectionNav>

          <Grid ref={activitiesRef}>
            {orderedActivities.map((item) => (
              <Card key={item.id} to={`/activities/${item.id}`}>
                <Photo $hasImage={!!(item.media?.cover || item.media?.photos?.[0])}>
                  {item.media?.cover || item.media?.photos?.[0] ? (
                    <PhotoImage
                      src={item.media?.cover || item.media?.photos?.[0]}
                      alt={`${item.title} preview`}
                    />
                  ) : (
                    <Placeholder>
                      <PhotoKicker>{item.date}</PhotoKicker>
                      <PhotoTitle>{item.title}</PhotoTitle>
                      <PhotoText>Photos coming soon.</PhotoText>
                    </Placeholder>
                  )}
                </Photo>

                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <DateText>{item.date}</DateText>
                </div>

                <Summary>{item.summary}</Summary>
                <TagList>
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </Card>
            ))}
          </Grid>

          <Section ref={archiveRef} id="archive">
            <SectionTitle>Archive</SectionTitle>
            <SectionText>
              A smaller visual record of visits, campus scenes, and lighter intervals that belong
              on the site, but not at the same level as the main professional work.
            </SectionText>

            <ArchiveGrid>
              {archive.map((item) => (
                <ArchiveCard key={item.id}>
                  <ArchivePhoto $hasImage={!!item.image}>
                    {item.image ? (
                      <ArchiveImage src={item.image} alt={item.title} />
                    ) : (
                      <ArchivePlaceholder>{item.title}</ArchivePlaceholder>
                    )}
                  </ArchivePhoto>
                  <ArchiveMeta>
                    <ArchiveTitle>{item.title}</ArchiveTitle>
                    <ArchiveCaption>
                      {item.date} · {item.location}
                    </ArchiveCaption>
                  </ArchiveMeta>
                </ArchiveCard>
              ))}
            </ArchiveGrid>
          </Section>
        </Container>
      </Page>
    </PageTransition>
  );
}

export default Activities;
