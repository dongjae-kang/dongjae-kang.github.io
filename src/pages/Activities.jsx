import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import Lightbox from '../components/Lightbox';
import { activities } from '../data/activities';

const tier1 = activities.filter((a) => a.tier === 1);
const tier2 = activities.filter((a) => a.tier === 2);
const tier3 = activities.filter((a) => a.tier === 3);

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

const SectionNavLink = styled.a`
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
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

/* ─── TIER 1: Full cards ─── */
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

/* ─── TIER 2: Medium cards ─── */
const Tier2Card = styled.article`
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  border-radius: 4px;
  background: #fdfcfa;
`;

const Tier2Photo = styled.div`
  position: relative;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
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
`;

const Tier2Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Tier2Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  line-height: 1.08;
  font-weight: 500;
`;

const Tier2Meta = styled.span`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.84rem;
`;

const Tier2Summary = styled.p`
  color: ${({ theme }) => theme.colors.subpage.text};
  font-size: 0.92rem;
  line-height: 1.5;
`;

const Tier2Link = styled.a`
  color: ${({ theme }) => theme.colors.subpage.copper};
  font-size: 0.82rem;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.16em;
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

/* ─── TIER 3: Photo-focused ─── */
const Tier3Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Tier3Card = styled.article`
  display: grid;
  gap: 8px;
`;

const Tier3Photo = styled.div`
  position: relative;
  aspect-ratio: 1;
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
    `&:hover { transform: scale(1.03); }`};
`;

const Tier3Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Tier3Placeholder = styled.div`
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

const Tier3Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  line-height: 1.15;
  font-weight: 500;
`;

const Tier3Meta = styled.span`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.78rem;
`;

function Activities() {
  const location = useLocation();
  const tier1Ref = useRef(null);
  const tier2Ref = useRef(null);
  const tier3Ref = useRef(null);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });

  const section = new URLSearchParams(location.search).get('section');

  useEffect(() => {
    if (section === 'community') {
      tier2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'life') {
      tier3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [section]);

  const openLightbox = useCallback((images, index = 0) => {
    const normalized = images.map((img) =>
      typeof img === 'string' ? { src: img } : img
    );
    setLightbox({ open: true, images: normalized, index });
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

  const getCover = (item) => item.media?.cover || item.media?.photos?.[0]?.src || item.media?.photos?.[0];
  const getPhotoCount = (item) => {
    const photos = item.media?.photos || [];
    return photos.length;
  };

  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Activities</Title>
          <Intro>
            Talks, research presentations, diplomacy, student leadership, and community events.
          </Intro>

          <SectionNav>
            <SectionNavLink
              $active={!section}
              onClick={() => tier1Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Activities
            </SectionNavLink>
            <SectionNavLink
              $active={section === 'community'}
              onClick={() => tier2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Community & Events
            </SectionNavLink>
            <SectionNavLink
              $active={section === 'life'}
              onClick={() => tier3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Off the Clock
            </SectionNavLink>
          </SectionNav>

          {/* ─── TIER 1 ─── */}
          <Grid ref={tier1Ref}>
            {tier1.map((item) => {
              const cover = getCover(item);
              return (
                <Card key={item.id} to={`/activities/${item.id}`}>
                  <Photo $hasImage={!!cover}>
                    {cover ? (
                      <PhotoImage src={cover} alt={`${item.title} preview`} />
                    ) : (
                      <Placeholder>
                        <PhotoKicker>{item.date}</PhotoKicker>
                        <PhotoTitle>{item.title}</PhotoTitle>
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
              );
            })}
          </Grid>

          {/* ─── TIER 2 ─── */}
          <Section ref={tier2Ref} id="community">
            <SectionTitle>Community & Events</SectionTitle>
            <SectionText>
              Event organizing, community leadership, and professional networks.
            </SectionText>

            <Grid>
              {tier2.map((item) => {
                const cover = getCover(item);
                const photoCount = getPhotoCount(item);
                return (
                  <Tier2Card key={item.id}>
                    <Tier2Photo
                      $hasImage={!!cover}
                      $clickable={photoCount > 0}
                      onClick={() =>
                        photoCount > 0 &&
                        openLightbox(
                          item.media.photos.map((p) => (typeof p === 'string' ? { src: p } : p)),
                          0
                        )
                      }
                    >
                      {cover ? (
                        <Tier2Image src={cover} alt={item.title} />
                      ) : (
                        <Placeholder>
                          <PhotoKicker>{item.date}</PhotoKicker>
                          <PhotoTitle>{item.title}</PhotoTitle>
                        </Placeholder>
                      )}
                      {photoCount > 1 && <PhotoCount>{photoCount} photos</PhotoCount>}
                    </Tier2Photo>
                    <div>
                      <Tier2Title>{item.title}</Tier2Title>
                      <Tier2Meta>{item.date} · {item.location}</Tier2Meta>
                    </div>
                    {item.summary && <Tier2Summary>{item.summary}</Tier2Summary>}
                    {item.links?.length > 0 &&
                      item.links.map((link) => (
                        <Tier2Link
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </Tier2Link>
                      ))}
                  </Tier2Card>
                );
              })}
            </Grid>
          </Section>

          {/* ─── TIER 3 ─── */}
          <Section ref={tier3Ref} id="life">
            <SectionTitle>Off the Clock</SectionTitle>
            <SectionText>
              Concerts, sports, campus moments, and other scenes from life in New York and beyond.
            </SectionText>

            <Tier3Grid>
              {tier3.map((item) => {
                const cover = getCover(item);
                const photos = item.media?.photos || [];
                const hasPhotos = photos.length > 0;
                return (
                  <Tier3Card key={item.id}>
                    <Tier3Photo
                      $hasImage={!!cover}
                      $clickable={hasPhotos}
                      onClick={() =>
                        hasPhotos &&
                        openLightbox(
                          photos.map((p) => (typeof p === 'string' ? { src: p } : p)),
                          0
                        )
                      }
                    >
                      {cover ? (
                        <Tier3Image src={cover} alt={item.title} />
                      ) : (
                        <Tier3Placeholder>{item.title}</Tier3Placeholder>
                      )}
                      {photos.length > 1 && <PhotoCount>{photos.length} photos</PhotoCount>}
                    </Tier3Photo>
                    <div>
                      <Tier3Title>{item.title}</Tier3Title>
                      <Tier3Meta>{item.date} · {item.location}</Tier3Meta>
                    </div>
                  </Tier3Card>
                );
              })}
            </Tier3Grid>
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
