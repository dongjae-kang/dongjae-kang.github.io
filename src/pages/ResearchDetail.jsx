import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { research } from '../data/research';

const Page = styled.main`
  min-height: 100vh;
  padding: 140px 24px 80px;
`;

const Container = styled.div`
  width: min(${({ theme }) => theme.layout.pageMax}, 100%);
  margin: 0 auto;
  display: grid;
  gap: 28px;
`;

const Back = styled(Link)`
  width: fit-content;
  color: ${({ theme }) => theme.colors.subpage.copper};
`;

const Thumbnail = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  background: #f0ede8;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: ${({ $hasImage }) => ($hasImage ? '0' : '20px')};
  border: 1px solid rgba(61, 90, 62, 0.12);
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
`;

const SectionLabel = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 1.1rem;
  padding-left: 12px;
  border-left: 3px solid ${({ theme }) => theme.colors.subpage.copper};
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const MediaNote = styled.span`
  max-width: 30ch;
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const TitleBlock = styled.div`
  display: grid;
  gap: 8px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 500;
  line-height: 1.05;
`;

const Year = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Description = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MetaBlock = styled.div`
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  background: #fdfcfa;
`;

const MetaText = styled.p`
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  a {
    color: ${({ theme }) => theme.colors.subpage.copper};
    font-weight: 400;
  }
`;

const DetailSection = styled.section`
  display: grid;
  gap: 14px;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid rgba(61, 90, 62, 0.14);
`;

function ResearchDetail() {
  const { id } = useParams();
  const item = research.find((entry) => entry.id === id);

  if (!item) {
    return (
      <PageTransition>
        <Page>
          <Container>
            <Back to="/research">Back to Research</Back>
            <Title>Project not found</Title>
          </Container>
        </Page>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Page>
        <Container>
          <Back to="/research">Back to Research</Back>

          <Thumbnail $hasImage={!!item.thumbnail}>
            {item.thumbnail ? (
              <ThumbnailImage src={item.thumbnail} alt={`${item.title} visual`} />
            ) : (
              <>
                <SectionLabel>Research Visual</SectionLabel>
                <MediaNote>Project image, paper figure, or product screenshot to be added.</MediaNote>
              </>
            )}
          </Thumbnail>

          <TitleBlock>
            <Title>{item.title}</Title>
            <Year>{item.year}</Year>
          </TitleBlock>

          <Description>{item.description}</Description>

          <MetaGrid>
            <MetaBlock>
              <SectionLabel>Collaborators</SectionLabel>
              <MetaText>{item.collaborators.join(' · ')}</MetaText>
            </MetaBlock>
            <MetaBlock>
              <SectionLabel>Tags</SectionLabel>
              <TagList>
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
            </MetaBlock>
          </MetaGrid>

          {item.gallery?.length > 1 && (
            <DetailSection>
              <SectionLabel>Gallery</SectionLabel>
              <Gallery>
                {item.gallery.slice(1).map((image, index) => (
                  <GalleryImage key={image} src={image} alt={`${item.title} archive ${index + 2}`} />
                ))}
              </Gallery>
            </DetailSection>
          )}

          {item.links.length > 0 && (
            <DetailSection>
              <SectionLabel>Links</SectionLabel>
              <Links>
                {item.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </Links>
            </DetailSection>
          )}
        </Container>
      </Page>
    </PageTransition>
  );
}

export default ResearchDetail;
