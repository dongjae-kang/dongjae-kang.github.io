import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { research } from '../data/research';

const Page = styled.main`
  min-height: 100vh;
  padding: 140px 24px 80px;
`;

const Container = styled.div`
  width: min(1100px, 100%);
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  padding: 24px;
  border: 1px solid rgba(30, 91, 67, 0.12);
  border-radius: ${({ theme }) => theme.layout.radius};
  background:
    linear-gradient(180deg, rgba(154, 199, 175, 0.14), rgba(255, 255, 255, 0.7));
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

const Thumbnail = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.layout.radius};
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.subpage.muted};
  border: 1px solid rgba(30, 91, 67, 0.14);
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 700;
`;

const Year = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Research() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Research</Title>
          <Intro>
            Research projects in platform governance, misinformation, AI policy, and interface
            design.
          </Intro>
          <Grid>
            {research.map((item) => (
              <Card key={item.id} onClick={() => navigate(`/research/${item.id}`)}>
                <Thumbnail>{item.title} thumbnail</Thumbnail>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <Year>{item.year}</Year>
                </div>
                <Desc>{item.shortDesc}</Desc>
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

export default Research;
