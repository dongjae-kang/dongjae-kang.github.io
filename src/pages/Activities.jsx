import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { activities } from '../data/activities';

const featuredOrder = [
  'upenn-mixer',
  'kgsa-career',
  'valedictorian',
  'student-council',
  'chi-2025',
  'un-ga-hlw',
  'un-youth-forum',
  'columbia-ai-club',
  'participatory-budget',
  'youth-policy',
  'hyc-mixer',
  'ces',
  'stanford',
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

const Intro = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-bottom: 40px;
  font-size: 1.04rem;
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
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: ${({ theme }) => theme.transitions.hover};

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.subpage.copper};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
`;

const Photo = styled.div`
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(196, 149, 106, 0.18), rgba(225, 219, 210, 0.82));
  border: 1px solid rgba(196, 149, 106, 0.14);
  display: flex;
  align-items: flex-end;
  padding: 16px;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  display: grid;
  gap: 6px;
`;

const PhotoKicker = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.copper};
`;

const PhotoTitle = styled.span`
  max-width: 13ch;
  color: ${({ theme }) => theme.colors.subpage.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.35rem, 2.2vw, 1.7rem);
  line-height: 1.05;
`;

const PhotoText = styled.span`
  max-width: 24ch;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 500;
  line-height: 1.05;
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const Preview = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease;

  ${Card}:hover & {
    max-height: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: 60px;
  }
`;

const PreviewText = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Activities() {
  const orderedActivities = [
    ...featuredOrder
      .map((id) => activities.find((item) => item.id === id))
      .filter(Boolean),
    ...activities.filter((item) => !featuredOrder.includes(item.id)),
  ];

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Activities</Title>
          <Intro>
            Talks, committee work, diplomacy, student leadership, and community-building across
            research and public life.
          </Intro>

          <Grid>
            {orderedActivities.map((item) => (
              <Card key={item.id} to={`/activities/${item.id}`}>
                <Photo>
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

                <Preview>
                  <PreviewText>{item.description}</PreviewText>
                </Preview>

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
