import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import Lightbox from '../components/Lightbox';
import { activities } from '../data/activities';
import { archive } from '../data/archive';

const featuredOrder = [
  'un-youth-forum',
  'kgsa-career',
  'valedictorian',
  'hyc-mixer',
  'upenn-mixer',
  'un-ga-hlw',
  'chi-2025',
  'student-council',
  'columbia-ai-club',
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

const Intro = styled.div`
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  margin-top: 56px;
  padding-top: 28px;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
  scroll-margin-top: 108px;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 1.08;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SectionText = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-bottom: 24px;
`;

const Card = styled(Link)`
  display: grid;
  gap: 16px;
  padding: 20px;
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

const Photo = styled.div`
  position: relative;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 3px;
  background:
    ${({ $hasImage }) =>
      $hasImage
        ? '#d9dfd9'
        : 'linear-gradient(160deg, rgba(27, 61, 47, 0.92), rgba(45, 90, 61, 0.76) 52%, rgba(154, 184, 158, 0.54))'};
  border: 1px solid rgba(196, 149, 106, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $hasImage }) => ($hasImage ? 'rgba(13, 26, 20, 0.12)' : 'transparent')};
    mix-blend-mode: multiply;
    pointer-events: none;
  }
`;

const PhotoImage = styled.img`
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

const PhotoKicker = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(247, 247, 245, 0.72);
`;

const PhotoTitle = styled.span`
  max-width: 14ch;
  color: rgba(247, 247, 245, 0.9);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PhotoText = styled.span`
  max-width: 24ch;
  color: rgba(247, 247, 245, 0.62);
  font-size: 0.74rem;
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 500;
  line-height: 1.08;
`;

const DateText = styled.p`
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

const ArchiveGrid = styled.div`
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

const ArchiveCard = styled.article`
  display: grid;
  gap: 12px;
`;

const ArchivePhoto = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: transform 0.15s ease;
  background:
    ${({ $hasImage }) =>
      $hasImage
        ? '#d9dfd9'
        : 'linear-gradient(160deg, rgba(27, 61, 47, 0.92), rgba(45, 90, 61, 0.76) 52%, rgba(154, 184, 158, 0.54))'};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $hasImage }) => ($hasImage ? 'rgba(13, 26, 20, 0.12)' : 'transparent')};
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  ${({ $clickable }) =>
    $clickable &&
    `&:hover {
      transform: scale(1.02);
    }`};
`;

const ArchiveImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArchivePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 18px;
  color: rgba(247, 247, 245, 0.84);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ArchiveMeta = styled.div`
  display: grid;
  gap: 2px;
`;

const ArchiveTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  line-height: 1.08;
  font-weight: 500;
`;

const ArchiveCaption = styled.span`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.84rem;
`;

const ArchiveDescription = styled.p`
  color: ${({ theme }) => theme.colors.subpage.text};
  font-size: 0.88rem;
  line-height: 1.5;
  margin-top: 4px;
`;

const ArchiveLink = styled.a`
  color: ${({ theme }) => theme.colors.subpage.copper};
  font-size: 0.82rem;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.16em;
  margin-top: 2px;
  width: fit-content;
`;

const PhotoCount = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 3px 8px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.52);
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  z-index: 1;
`;

function Activities() {
  const location = useLocation();
  const activitiesRef = useRef(null);
  const archiveRef = useRef(null);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });
  const visibleIds = new Set(featuredOrder);

  const openLightbox = useCallback((images, index = 0) => {
    setLightbox({ open: true, images, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, open: false }));
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  }, []);
  const orderedActivities = [
    ...featuredOrder
      .map((id) => activities.find((item) => item.id === id))
      .filter(Boolean),
    ...activities.filter((item) => !visibleIds.has(item.id) && !['ces', 'stanford'].includes(item.id)),
  ];
  const section = new URLSearchParams(location.search).get('section');

  useEffect(() => {
    if (section === 'archive') {
      archiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [section]);

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Activities</Title>
          <Intro>
            Talks, diplomacy, student leadership, and community-building across research and
            public life. Lighter records stay below as a smaller archive, not as a separate front
            page.
          </Intro>

          <SectionNav>
            <SectionNavLink to="/activities" $active={!section}>
              Activities
            </SectionNavLink>
            <SectionNavLink to="/activities?section=archive" $active={section === 'archive'}>
              Archive
            </SectionNavLink>
          </SectionNav>

          <Grid ref={activitiesRef}>
            {orderedActivities.map((item) => (
              <Card key={item.id} to={`/activities/${item.id}`}>
                <Photo $hasImage={!!(item.media?.cover || item.media?.photos?.[0])}>
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
                <TagList>
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </Card>
            ))}
          </Grid>

          <Section ref={archiveRef} id="archive">
            <SectionTitle>Archive</SectionTitle>
            <SectionText>
              Concerts, golf, campus moments, and other scenes from life in New York and beyond.
            </SectionText>

            <ArchiveGrid>
              {archive.map((item) => {
                const coverSrc = item.photos?.[0]?.src || null;
                const hasPhotos = item.photos?.length > 0;
                return (
                  <ArchiveCard key={item.id}>
                    <ArchivePhoto
                      $hasImage={!!coverSrc}
                      $clickable={hasPhotos}
                      onClick={() => hasPhotos && openLightbox(item.photos, 0)}
                    >
                      {coverSrc ? (
                        <ArchiveImage src={coverSrc} alt={item.title} />
                      ) : (
                        <ArchivePlaceholder>{item.title}</ArchivePlaceholder>
                      )}
                      {item.photos?.length > 1 && (
                        <PhotoCount>{item.photos.length} photos</PhotoCount>
                      )}
                    </ArchivePhoto>
                    <ArchiveMeta>
                      <ArchiveTitle>{item.title}</ArchiveTitle>
                      <ArchiveCaption>
                        {item.date} · {item.location}
                      </ArchiveCaption>
                      {item.description && (
                        <ArchiveDescription>{item.description}</ArchiveDescription>
                      )}
                      {item.link && (
                        <ArchiveLink href={item.link.url} target="_blank" rel="noopener noreferrer">
                          {item.link.label}
                        </ArchiveLink>
                      )}
                    </ArchiveMeta>
                  </ArchiveCard>
                );
              })}
            </ArchiveGrid>
          </Section>
        </Container>

        {lightbox.open && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={closeLightbox}
            onPrev={lightbox.images.length > 1 ? prevImage : null}
            onNext={lightbox.images.length > 1 ? nextImage : null}
          />
        )}
      </Page>
    </PageTransition>
  );
}

export default Activities;
