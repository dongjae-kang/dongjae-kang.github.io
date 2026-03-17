import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { activities } from '../data/activities';

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

const Photo = styled.div`
  aspect-ratio: 3 / 2;
  border-radius: 18px;
  background:
    linear-gradient(145deg, rgba(61, 90, 62, 0.14), rgba(225, 219, 210, 0.82));
  border: 1px solid rgba(61, 90, 62, 0.12);
  color: ${({ theme }) => theme.colors.subpage.muted};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 20px;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
`;

const TitleBlock = styled.div`
  display: grid;
  gap: 8px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.6rem, 5vw, 4rem);
  line-height: 0.92;
  font-weight: 600;
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Description = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
`;

const MediaLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const MediaNote = styled.span`
  max-width: 30ch;
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const PlaceholderTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 0.92;
  max-width: 14ch;
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
    color: ${({ theme }) => theme.colors.subpage.accent};
    font-weight: 500;
  }
`;

const VideoWrap = styled.div`
  display: grid;
  gap: 12px;

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    border-radius: 18px;
  }
`;

const ArchiveNote = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
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
  border-radius: 18px;
  border: 1px solid rgba(61, 90, 62, 0.14);
`;

function ActivityDetail() {
  const { id } = useParams();
  const item = activities.find((entry) => entry.id === id);

  if (!item) {
    return (
      <PageTransition>
        <Page>
          <Container>
            <Back to="/activities">Back to Activities</Back>
            <Title>Activity not found</Title>
          </Container>
        </Page>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Page>
        <Container>
          <Back to="/activities">Back to Activities</Back>

          <Photo>
            {item.media?.cover || item.media?.photos?.[0] ? (
              <PhotoImage
                src={item.media?.cover || item.media?.photos?.[0]}
                alt={`${item.title} visual`}
              />
            ) : (
              <>
                <MediaLabel>{item.date}</MediaLabel>
                <PlaceholderTitle>{item.title}</PlaceholderTitle>
                <MediaNote>Photo archive forthcoming.</MediaNote>
              </>
            )}
          </Photo>

          <TitleBlock>
            <Title>{item.title}</Title>
            <DateText>{item.date}</DateText>
          </TitleBlock>

          <Description>{item.description}</Description>

          <TagList>
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>

          {item.links?.length > 0 && (
            <Links>
              {item.links.map((link) => {
                const isExternal = /^https?:\/\//.test(link.url);

                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </Links>
          )}

          {item.id === 'valedictorian' && (
            <VideoWrap>
              <iframe
                src="https://www.youtube.com/embed/U7m4LpyHffk?start=4502"
                title="KAIST Valedictorian speech"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p>Speech starts at 1:15:02</p>
            </VideoWrap>
          )}

          {item.media?.photos?.length > 1 && (
            <Gallery>
              {item.media.photos.slice(1).map((photo, index) => (
                <GalleryImage key={photo} src={photo} alt={`${item.title} archive ${index + 2}`} />
              ))}
            </Gallery>
          )}

          {!item.media?.photos?.length && item.id !== 'valedictorian' && (
            <ArchiveNote>
              This entry is already part of the site, but its visual archive has not been uploaded
              yet.
            </ArchiveNote>
          )}
        </Container>
      </Page>
    </PageTransition>
  );
}

export default ActivityDetail;
