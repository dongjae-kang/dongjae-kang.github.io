import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { activities, communityEvents } from '../data/activities';
const allActivities = [...activities, ...communityEvents];

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

const Photo = styled.div`
  aspect-ratio: ${({ $portrait }) => ($portrait ? 'auto' : '3 / 2')};
  max-width: ${({ $portrait }) => ($portrait ? '360px' : 'none')};
  border-radius: 4px;
  background: #f0ede8;
  border: 1px solid rgba(61, 90, 62, 0.12);
  color: ${({ theme }) => theme.colors.subpage.muted};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: ${({ $hasImage }) => ($hasImage ? '0' : '20px')};
  overflow: hidden;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: ${({ $portrait }) => ($portrait ? 'auto' : '100%')};
  object-fit: ${({ $portrait }) => ($portrait ? 'contain' : 'cover')};
  border-radius: 3px;
`;

const TitleBlock = styled.div`
  display: grid;
  gap: 8px;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.6rem, 5vw, 4rem);
  line-height: 1.05;
  font-weight: 500;
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Description = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
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

const PlaceholderTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
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

  a,
  span {
    color: ${({ theme }) => theme.colors.subpage.copper};
    font-weight: 400;
  }
`;

const DetailSection = styled.section`
  display: grid;
  gap: 14px;
`;

const VideoWrap = styled.div`
  display: grid;
  gap: 12px;

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    border-radius: 4px;
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
  border-radius: 3px;
  border: 1px solid rgba(61, 90, 62, 0.14);
`;

function ActivityDetail() {
  const { id } = useParams();
  const item = allActivities.find((entry) => entry.id === id);

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

          <Photo $hasImage={!!(item.media?.cover || item.media?.photos?.[0])} $portrait={!!item.media?.portrait}>
            {item.media?.cover || item.media?.photos?.[0] ? (
              <PhotoImage
                src={item.media?.cover || item.media?.photos?.[0]}
                alt={`${item.title} visual`}
                $portrait={!!item.media?.portrait}
              />
            ) : (
              <>
                <SectionLabel>{item.date}</SectionLabel>
                <PlaceholderTitle>{item.title}</PlaceholderTitle>
                <MediaNote>Photos coming soon.</MediaNote>
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
            <DetailSection>
              <SectionLabel>Links</SectionLabel>
              <Links>
                {item.links.map((link) => {
                  const isExternal = /^https?:\/\//.test(link.url);

                  if (isExternal) {
                    return (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    );
                  }

                  return (
                    <Link key={link.url} to={link.url}>
                      {link.label}
                    </Link>
                  );
                })}
              </Links>
            </DetailSection>
          )}

          {item.id === 'valedictorian' && (
            <DetailSection>
              <SectionLabel>Video</SectionLabel>
              <VideoWrap>
                <iframe
                  src="https://www.youtube.com/embed/U7m4LpyHffk?start=4502"
                  title="KAIST Valedictorian speech"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <p>Speech starts at 1:15:02</p>
              </VideoWrap>
            </DetailSection>
          )}

          {item.media?.photos?.length > 1 && (
            <DetailSection>
              <SectionLabel>Gallery</SectionLabel>
              <Gallery>
                {item.media.photos.slice(1).map((photo, index) => (
                  <GalleryImage key={photo} src={photo} alt={`${item.title} archive ${index + 2}`} />
                ))}
              </Gallery>
            </DetailSection>
          )}

          {!item.media?.photos?.length && item.id !== 'valedictorian' && (
            <ArchiveNote>Photos coming soon.</ArchiveNote>
          )}
        </Container>
      </Page>
    </PageTransition>
  );
}

export default ActivityDetail;
