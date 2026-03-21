import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { activities } from '../data/activities';

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

  a {
    color: ${({ theme }) => theme.colors.subpage.accent};
    text-decoration: underline;
    text-underline-offset: 0.16em;
  }
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

function Activities() {
  const visibleIds = new Set(featuredOrder);
  const orderedActivities = [
    ...featuredOrder
      .map((id) => activities.find((item) => item.id === id))
      .filter(Boolean),
    ...activities.filter((item) => !visibleIds.has(item.id) && !['ces', 'stanford'].includes(item.id)),
  ];

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Activities</Title>
          <Intro>
            Talks, diplomacy, student leadership, and community-building across research and
            public life. Lighter visits and personal records sit separately in{' '}
            <Link to="/archive">Archive</Link>.
          </Intro>

          <Grid>
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
        </Container>
      </Page>
    </PageTransition>
  );
}

export default Activities;
