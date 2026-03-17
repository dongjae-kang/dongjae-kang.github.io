import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { research } from '../data/research';

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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: grid;
  gap: 18px;
  padding: 24px;
  border: 1px solid rgba(61, 90, 62, 0.12);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(154, 184, 158, 0.12), rgba(255, 255, 255, 0.72)),
    ${({ theme }) => theme.colors.subpage.background};
  transition: ${({ theme }) => theme.transitions.hover};

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(61, 90, 62, 0.28);
    box-shadow: 0 18px 36px ${({ theme }) => theme.colors.subpage.cardShadow};
  }
`;

const Thumbnail = styled.div`
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 14px;
  background:
    linear-gradient(135deg, rgba(61, 90, 62, 0.16), rgba(225, 219, 210, 0.8));
  border: 1px solid rgba(61, 90, 62, 0.12);
  display: flex;
  align-items: flex-end;
  padding: 16px;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  display: grid;
  gap: 6px;
`;

const Kicker = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const PlaceholderText = styled.span`
  max-width: 26ch;
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const CardHeader = styled.div`
  display: grid;
  gap: 6px;
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1.05;
  font-weight: 600;
`;

const Year = styled.p`
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

function Research() {
  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Research</Title>
          <Intro>Research in misinformation, platform governance, and technology policy.</Intro>

          <Grid>
            {research.map((item) => (
              <Card key={item.id} to={`/research/${item.id}`}>
                <Thumbnail>
                  {item.thumbnail ? (
                    <ThumbnailImage src={item.thumbnail} alt={`${item.title} preview`} />
                  ) : (
                    <Placeholder>
                      <Kicker>Research Archive</Kicker>
                      <PlaceholderText>{item.title} visual will be added here.</PlaceholderText>
                    </Placeholder>
                  )}
                </Thumbnail>

                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <Year>{item.year}</Year>
                </CardHeader>

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

export default Research;
