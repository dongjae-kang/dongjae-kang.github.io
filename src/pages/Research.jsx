import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
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
  scroll-margin-top: 108px;
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

const AssetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const AssetItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const CourseworkGrid = styled(Grid)`
  margin-top: 8px;
`;

const CourseworkCard = styled.article`
  display: grid;
  gap: 18px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  border-radius: 4px;
  background: #fdfcfa;
`;

const CourseworkVisual = styled.div`
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

const CourseworkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CourseworkHeader = styled.div`
  display: grid;
  gap: 8px;
`;

const CourseworkTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1.08;
  font-weight: 600;
`;

const CourseworkSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
  line-height: 1.5;
`;

const CourseworkMeta = styled.div`
  display: grid;
  gap: 4px;
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.88rem;
`;

const CourseworkActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CourseworkAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.subpage.accent};
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: #fff;
`;

function Research() {
  const location = useLocation();
  const projectsRef = useRef(null);
  const courseworkRef = useRef(null);
  const section = new URLSearchParams(location.search).get('section');

  useEffect(() => {
    if (section === 'coursework') {
      courseworkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [section]);

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Research</Title>
          <Intro>
            Core research projects in misinformation and platform governance, followed by a smaller
            selection of coursework projects in policy analysis, urban governance, and
            technology policy design.
          </Intro>

          <SectionNav>
            <SectionNavLink to="/research" $active={!section}>
              Projects
            </SectionNavLink>
            <SectionNavLink to="/research?section=coursework" $active={section === 'coursework'}>
              Coursework & Papers
            </SectionNavLink>
          </SectionNav>

          <Grid ref={projectsRef}>
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
                {item.materials?.length > 0 && (
                  <AssetRow>
                    {item.materials.map((material) => (
                      <AssetItem key={`${item.id}-${material.label}`}>{material.label}</AssetItem>
                    ))}
                  </AssetRow>
                )}
                <TagList>
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </Card>
            ))}
          </Grid>

          <Section id="coursework" ref={courseworkRef}>
            <SectionTitle>Coursework</SectionTitle>
            <SectionText>
              Course projects from Columbia SIPA demonstrating policy analysis, urban
              governance, and technology policy design.
            </SectionText>

            <CourseworkGrid>
              {coursework.map((item) => (
                <CourseworkCard key={item.id}>
                  <CourseworkVisual>
                    {item.thumbnail ? (
                      <CourseworkImage src={item.thumbnail} alt={`${item.title} preview`} />
                    ) : (
                      <Placeholder>
                        <Kicker>Coursework</Kicker>
                        <PlaceholderText>Project image coming soon.</PlaceholderText>
                      </Placeholder>
                    )}
                  </CourseworkVisual>

                  <CourseworkHeader>
                    <CourseworkTitle>{item.title}</CourseworkTitle>
                    <CourseworkSubtitle>{item.subtitle}</CourseworkSubtitle>
                  </CourseworkHeader>

                  <CourseworkMeta>
                    <span>{item.course}</span>
                    <span>{item.professor}</span>
                    <span>{item.semester}</span>
                  </CourseworkMeta>

                  <TagList>
                    <Tag>{item.type}</Tag>
                    {item.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>

                  <Summary>{item.summary}</Summary>

                  <CourseworkActions>
                    {item.pdf && (
                      <CourseworkAction href={item.pdf} target="_blank" rel="noopener noreferrer">
                        View PDF
                      </CourseworkAction>
                    )}
                    {item.pdfs?.map((pdf) => (
                      <CourseworkAction key={pdf.file} href={pdf.file} target="_blank" rel="noopener noreferrer">
                        {pdf.label}
                      </CourseworkAction>
                    ))}
                    {item.liveDemo && (
                      <CourseworkAction href={item.liveDemo} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </CourseworkAction>
                    )}
                  </CourseworkActions>
                </CourseworkCard>
              ))}
            </CourseworkGrid>
          </Section>
        </Container>
      </Page>
    </PageTransition>
  );
}

export default Research;
