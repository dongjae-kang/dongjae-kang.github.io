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
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const Thumbnail = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.layout.radius};
  background:
    linear-gradient(135deg, rgba(30, 91, 67, 0.16), rgba(221, 232, 224, 0.8));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 20px;
  border: 1px solid rgba(30, 91, 67, 0.14);
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.layout.radius};
`;

const MediaLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const MediaNote = styled.span`
  max-width: 30ch;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: 800;
`;

const Year = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Description = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
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
    color: ${({ theme }) => theme.colors.subpage.accent};
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 500;
  }
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
  border-radius: ${({ theme }) => theme.layout.radius};
  border: 1px solid rgba(30, 91, 67, 0.14);
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
          <Thumbnail>
            {item.thumbnail ? (
              <ThumbnailImage src={item.thumbnail} alt={`${item.title} visual`} />
            ) : (
              <>
                <MediaLabel>Research Visual</MediaLabel>
                <MediaNote>
                  Project image, paper figure, or product screenshot to be added.
                </MediaNote>
              </>
            )}
          </Thumbnail>
          <div>
            <Title>{item.title}</Title>
            <Year>{item.year}</Year>
          </div>
          <Description>{item.fullDesc}</Description>
          <TagList>
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
          {item.gallery?.length > 1 && (
            <Gallery>
              {item.gallery.slice(1).map((image, index) => (
                <GalleryImage
                  key={image}
                  src={image}
                  alt={`${item.title} archive ${index + 2}`}
                />
              ))}
            </Gallery>
          )}
          {item.links.length > 0 && (
            <Links>
              {item.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </Links>
          )}
        </Container>
      </Page>
    </PageTransition>
  );
}

export default ResearchDetail;
