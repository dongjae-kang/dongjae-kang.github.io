import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { activities } from '../data/activities';

const Page = styled.main`
  min-height: 100vh;
  padding: 140px 24px 80px;
`;

const Container = styled.div`
  width: min(1160px, 100%);
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

const Card = styled.article`
  padding: 20px;
  border: 1px solid rgba(30, 91, 67, 0.12);
  border-radius: ${({ theme }) => theme.layout.radius};
  background:
    linear-gradient(180deg, rgba(154, 199, 175, 0.12), rgba(255, 255, 255, 0.72));
  display: grid;
  gap: 18px;
  transition: ${({ theme }) => theme.transitions.hover};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(30, 91, 67, 0.28);
    box-shadow: 0 18px 36px ${({ theme }) => theme.colors.subpage.cardShadow};
  }
`;

const Photo = styled.div`
  aspect-ratio: 3 / 2;
  border-radius: ${({ theme }) => theme.layout.radius};
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  border: 1px solid rgba(30, 91, 67, 0.14);
  color: ${({ theme }) => theme.colors.subpage.muted};
  display: grid;
  place-items: center;
`;

const CardTitle = styled.h2`
  font-size: 1.08rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
`;

const DateText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Activities() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Activities</Title>
          <Intro>
            Talks, leadership roles, institutional work, and public-facing moments across research,
            governance, and community building.
          </Intro>
          <Grid>
            {activities.map((item) => (
              <Card key={item.id} onClick={() => navigate(`/activities/${item.id}`)}>
                <Photo>{item.title} photo</Photo>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <DateText>{item.date || 'Date to be added'}</DateText>
                </div>
                <p>{item.shortDesc}</p>
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
