import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { research } from '../data/research';
import { coursework } from '../data/coursework';

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
  margin-bottom: 32px;
  font-size: 1.04rem;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  display: grid;
  gap: 20px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1.08;
  font-weight: 600;
`;

const SectionText = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const PaperList = styled.div`
  display: grid;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const PaperRow = styled.a`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px 20px;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};
  transition: ${({ theme }) => theme.transitions.hover};

  &:hover {
    background: rgba(27, 61, 47, 0.04);
  }
`;

const PaperTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.45rem;
  line-height: 1.08;
  font-weight: 500;
`;

const PaperYear = styled.span`
  justify-self: end;
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PaperMeta = styled.span`
  color: ${({ theme }) => theme.colors.subpage.accent};
  font-size: 0.84rem;
  letter-spacing: 0.06em;
`;

const PaperSummary = styled.p`
  grid-column: 1 / -1;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Card = styled(Link)`
  display: grid;
  gap: 18px;
  padding: 24px;
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

const Thumbnail = styled.div`
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 3px;
  background: #f0ede8;
  border: 1px solid rgba(196, 149, 106, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ThumbnailImage = styled.img`
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

const Kicker = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const PlaceholderText = styled.span`
  max-width: 26ch;
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CardHeader = styled.div`
  display: grid;
  gap: 6px;
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1.08;
  font-weight: 500;
`;

const Year = styled.p`
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

function Research() {
  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Research</Title>
          <Intro>
            Core research projects in misinformation and platform governance, followed by a smaller
            selection of coursework papers in urban policy and public problem-solving.
          </Intro>

          <Grid>
            {research.map((item) => (
              <Card key={item.id} to={`/research/${item.id}`}>
                <Thumbnail>
                  {item.thumbnail ? (
                    <ThumbnailImage src={item.thumbnail} alt={`${item.title} preview`} />
                  ) : (
                    <Placeholder>
                      <Kicker>Research Archive</Kicker>
                      <PlaceholderText>Project image coming soon.</PlaceholderText>
                    </Placeholder>
                  )}
                </Thumbnail>

                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <Year>{item.year}</Year>
                </CardHeader>

                <Summary>{item.summary}</Summary>
                <TagList>
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </Card>
            ))}
          </Grid>

          <Section id="coursework">
            <SectionTitle>Selected Coursework & Papers</SectionTitle>
            <SectionText>
              Course-based work in urban policy and public problem-solving, included here because
              it extends the same questions into a different format.
            </SectionText>

            <PaperList>
              {coursework.map((item) => (
                <PaperRow key={item.id} href={item.file} target="_blank" rel="noopener noreferrer">
                  <PaperTitle>{item.title}</PaperTitle>
                  <PaperYear>{item.year}</PaperYear>
                  <PaperMeta>{item.course}</PaperMeta>
                  <PaperSummary>{item.summary}</PaperSummary>
                </PaperRow>
              ))}
            </PaperList>
          </Section>
        </Container>
      </Page>
    </PageTransition>
  );
}

export default Research;
