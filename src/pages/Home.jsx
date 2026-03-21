import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowDown } from 'react-icons/fi';
import Graph from '../components/Graph';
import PageTransition from '../components/PageTransition';
import { research } from '../data/research';
import { activities } from '../data/activities';

function useFadeIn(threshold = 0.15) {
  const [node, setNode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [setNode, isVisible];
}

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(7px);
  }
`;

const fadeUpStyles = css`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '18px')});
  transition:
    opacity 0.75s ease,
    transform 0.75s ease;
`;

const Page = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.subpage.background};
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 108px 0 44px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    inset: 5% auto auto 50%;
    width: min(88vw, 900px);
    height: min(72vw, 860px);
    transform: translateX(-50%);
    background:
      radial-gradient(circle at 48% 44%, rgba(154, 184, 158, 0.22) 0%, rgba(154, 184, 158, 0.1) 24%, rgba(196, 149, 106, 0.08) 48%, transparent 76%);
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 96px 0 36px;
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  width: min(${({ theme }) => theme.layout.contentMax}, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  justify-items: center;
  gap: 16px;
  text-align: center;
`;

const MobileMapLegend = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
`;

const MobileMapChip = styled.span`
  padding: 6px 10px;
  border: 1px solid rgba(27, 61, 47, 0.12);
  border-radius: 4px;
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.muted};
  background: rgba(247, 247, 245, 0.8);
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 5.1vw, 4.95rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.02em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(2.7rem, 14vw, 4.2rem);
  }
`;

const Tagline = styled.p`
  max-width: 1020px;
  font-size: clamp(1rem, 1.2vw, 1.12rem);
  color: ${({ theme }) => theme.colors.subpage.muted};

  @media (min-width: 1024px) {
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 480px;
    font-size: 1rem;
    white-space: normal;
  }
`;

const ScrollCue = styled.button`
  display: grid;
  gap: 8px;
  justify-items: center;
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  svg {
    font-size: 1.05rem;
    animation: ${({ $stopped }) => ($stopped ? 'none' : css`${bounce} 2.5s ease-in-out infinite`)};
  }
`;

const Story = styled.div`
  padding: 24px 0 120px;
`;

const StoryInner = styled.div`
  width: min(${({ theme }) => theme.layout.contentMax}, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  gap: 88px;
`;

const NarrativeSection = styled.section`
  display: grid;
  gap: 28px;
  align-content: start;
  padding-top: 28px;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
  ${fadeUpStyles};
`;

const SectionHeader = styled.div`
  display: grid;
  gap: 12px;
  max-width: 44rem;
`;

const SectionNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 0.86;
  color: rgba(196, 149, 106, 0.35);
`;

const SectionEyebrow = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1.08;
`;

const SectionBody = styled.p`
  font-size: 1.12rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.subpage.text};
`;

const ResearchGrid = styled.div`
  display: grid;
  grid-template-columns: 0.78fr 1.22fr;
  gap: 40px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ResearchList = styled.div`
  display: grid;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const ResearchRow = styled(Link)`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.8fr) auto 128px;
  gap: 16px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};
  transition: ${({ theme }) => theme.transitions.hover};

  &:hover {
    background: rgba(27, 61, 47, 0.03);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr) auto;
    row-gap: 8px;
  }
`;

const ResearchTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.55rem;
  line-height: 1.08;
  font-weight: 500;
`;

const ResearchSummary = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.98rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
  }
`;

const ResearchYear = styled.span`
  justify-self: end;
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ResearchPreview = styled.div`
  width: 120px;
  aspect-ratio: 3 / 2;
  justify-self: end;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  background: ${({ $hasImage }) => ($hasImage ? '#d8ddd8' : 'transparent')};
  opacity: ${({ $hasImage }) => ($hasImage ? 0 : 0)};
  transform: translateX(${({ $hasImage }) => ($hasImage ? '10px' : '0')});
  transition: opacity 0.2s ease, transform 0.2s ease;

  ${ResearchRow}:hover & {
    opacity: ${({ $hasImage }) => ($hasImage ? 1 : 0)};
    transform: translateX(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const ResearchPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ViewAllLink = styled(Link)`
  width: fit-content;
  color: ${({ theme }) => theme.colors.subpage.copper};
  font-size: 0.88rem;
  letter-spacing: 0.06em;
  margin-top: 18px;
`;

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: 0.84fr 1.16fr;
  gap: 40px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const RoleList = styled.div`
  display: grid;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const RoleRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px 20px;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const RoleTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.38rem;
  line-height: 1.08;
  font-weight: 500;
`;

const RoleYear = styled.span`
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const RoleSummary = styled.p`
  grid-column: 1 / -1;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 18px;

  a {
    color: ${({ theme }) => theme.colors.subpage.copper};
    font-size: 0.88rem;
    letter-spacing: 0.06em;
  }
`;

const ActivityIntro = styled.div`
  display: grid;
  gap: 12px;
  max-width: 46rem;
`;

const ActivityStrip = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 260px);
  gap: 18px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-snap-type: x proximity;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(27, 61, 47, 0.16);
  }
`;

const ActivityCard = styled(Link)`
  display: grid;
  gap: 10px;
  scroll-snap-align: start;
`;

const ActivityVisual = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  background:
    ${({ $hasImage }) =>
      $hasImage
        ? '#dbe1db'
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

const ActivityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ActivityLocation = styled.span`
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 1;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f7f7f5;
`;

const ActivityMeta = styled.div`
  display: grid;
  gap: 4px;
`;

const ActivityTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.45rem;
  line-height: 1.08;
  font-weight: 500;
`;

const ActivityDate = styled.span`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.84rem;
`;

const researchOrder = ['crisisnews', 'prism', 'beyond-removal', 'multi-agent-sim'];
const activityRailOrder = [
  'chi-2025',
  'un-ga-hlw',
  'un-youth-forum',
  'kgsa-career',
  'upenn-mixer',
  'hyc-mixer',
  'valedictorian',
];

function Home() {
  const storyRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [researchRef, researchVisible] = useFadeIn();
  const [leadershipRef, leadershipVisible] = useFadeIn();
  const [activitiesRef, activitiesVisible] = useFadeIn();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHasScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredResearch = researchOrder
    .map((id) => research.find((item) => item.id === id))
    .filter(Boolean);

  const leadershipRoles = [
    activities.find((item) => item.id === 'student-council'),
    activities.find((item) => item.id === 'columbia-ai-club'),
  ].filter(Boolean);

  const activityStripItems = activityRailOrder
    .map((id) => activities.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <PageTransition>
      <Page>
        <Hero>
          <HeroInner>
            <Graph />
            <MobileMapLegend>
              <MobileMapChip>Research</MobileMapChip>
              <MobileMapChip>Themes</MobileMapChip>
              <MobileMapChip>Engagement</MobileMapChip>
            </MobileMapLegend>
            <Name>Dongjae (Jack) Kang</Name>
            <Tagline>
              Studying misinformation, platform governance, and the systems that shape what
              people believe.
            </Tagline>
            <ScrollCue
              type="button"
              $stopped={hasScrolled}
              onClick={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Scroll to explore</span>
              <FiArrowDown />
            </ScrollCue>
          </HeroInner>
        </Hero>

        <Story ref={storyRef}>
          <StoryInner>
            <NarrativeSection ref={researchRef} $visible={researchVisible}>
              <ResearchGrid>
                <SectionHeader>
                  <SectionNumber>01</SectionNumber>
                  <SectionEyebrow>Research</SectionEyebrow>
                  <SectionTitle>How platforms shape what people believe.</SectionTitle>
                  <SectionBody>
                    He studies misinformation, platform governance, and content moderation across
                    both empirical research and interface design. The work ranges from a dataset of
                    93,250 news articles to prototype systems for comparing how the same story
                    moves across sources.
                  </SectionBody>
                </SectionHeader>

                <div>
                  <ResearchList>
                    {featuredResearch.map((item) => (
                      <ResearchRow key={item.id} to={`/research/${item.id}`}>
                        <ResearchTitle>{item.title}</ResearchTitle>
                        <ResearchSummary>{item.summary}</ResearchSummary>
                        <ResearchYear>{item.year}</ResearchYear>
                        <ResearchPreview $hasImage={!!item.thumbnail}>
                          {item.thumbnail && (
                            <ResearchPreviewImage src={item.thumbnail} alt={`${item.title} preview`} />
                          )}
                        </ResearchPreview>
                      </ResearchRow>
                    ))}
                  </ResearchList>
                  <ViewAllLink to="/research">View all research →</ViewAllLink>
                </div>
              </ResearchGrid>
            </NarrativeSection>

            <NarrativeSection ref={leadershipRef} $visible={leadershipVisible}>
              <LeadershipGrid>
                <SectionHeader>
                  <SectionNumber>02</SectionNumber>
                  <SectionEyebrow>Leadership</SectionEyebrow>
                  <SectionTitle>Research is one line of work. Institutions are another.</SectionTitle>
                  <SectionBody>
                    As President of KAIST&apos;s Undergraduate Student Council, he rebuilt an
                    organization inactive for three years. When Korea announced a 16% R&amp;D budget
                    cut, he coordinated dialogue across universities, the National Assembly, and
                    government ministries. The method was not confrontation for its own sake. It
                    was dialogue, patience, and enough credibility to keep people at the table.
                  </SectionBody>
                </SectionHeader>

                <div>
                  <RoleList>
                    {leadershipRoles.map((item) => (
                      <RoleRow key={item.id}>
                        <RoleTitle>{item.title}</RoleTitle>
                        <RoleYear>{item.date}</RoleYear>
                        <RoleSummary>{item.summary}</RoleSummary>
                      </RoleRow>
                    ))}
                  </RoleList>
                  <LinkRow>
                    <a
                      href="https://www.joongang.co.kr/article/25215586"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      JoongAng Ilbo column →
                    </a>
                    <a
                      href="https://herald.kaist.ac.kr/news/articleView.html?idxno=20910"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      KAIST Herald →
                    </a>
                  </LinkRow>
                </div>
              </LeadershipGrid>
            </NarrativeSection>

            <NarrativeSection ref={activitiesRef} $visible={activitiesVisible}>
              <ActivityIntro>
                <SectionNumber>03</SectionNumber>
                <SectionEyebrow>Selected Activities</SectionEyebrow>
                <SectionTitle>From Yokohama to the General Assembly.</SectionTitle>
                <SectionBody>
                  He presented misinformation research at ACM CHI in Yokohama, supported
                  diplomatic operations during the UN General Assembly High-Level Week, and
                  organized networking events for 200+ students across Ivy League campuses. The
                  settings differ. The pattern is the same.
                </SectionBody>
              </ActivityIntro>

              <div>
                <ActivityStrip>
                  {activityStripItems.map((item) => {
                    const cover = item.media?.cover || item.media?.photos?.[0];

                    return (
                      <ActivityCard key={item.id} to={`/activities/${item.id}`}>
                        <ActivityVisual $hasImage={!!cover}>
                          {cover && <ActivityImage src={cover} alt={`${item.title} preview`} />}
                          <ActivityLocation>{item.location}</ActivityLocation>
                        </ActivityVisual>
                        <ActivityMeta>
                          <ActivityTitle>{item.title}</ActivityTitle>
                          <ActivityDate>{item.date}</ActivityDate>
                        </ActivityMeta>
                      </ActivityCard>
                    );
                  })}
                </ActivityStrip>
                <ViewAllLink to="/activities">View all activities →</ViewAllLink>
              </div>
            </NarrativeSection>
          </StoryInner>
        </Story>
      </Page>
    </PageTransition>
  );
}

export default Home;
