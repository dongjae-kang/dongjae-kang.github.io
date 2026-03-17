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
    transform: translateY(8px);
  }
`;

const fadeUpStyles = css`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '20px')});
  transition:
    opacity 0.75s ease,
    transform 0.75s ease;
`;

const Page = styled.main`
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.home.text};
  background:
    radial-gradient(ellipse at 18% 25%, rgba(15, 61, 46, 0.7) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 15%, rgba(92, 61, 46, 0.15) 0%, transparent 45%),
    radial-gradient(ellipse at 55% 65%, rgba(74, 93, 58, 0.5) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 80%, rgba(92, 61, 46, 0.1) 0%, transparent 40%),
    radial-gradient(ellipse at 85% 75%, rgba(13, 26, 20, 0.9) 0%, transparent 60%),
    linear-gradient(160deg, #0d1a14 0%, #081711 100%);
`;

const Hero = styled.section`
  min-height: 100vh;
  padding: 100px 0 40px;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 96px 0 36px;
  }
`;

const HeroInner = styled.div`
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
    margin-top: -4px;
  }
`;

const MobileMapChip = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(245, 240, 232, 0.1);
  background: rgba(10, 24, 18, 0.38);
  font-size: 0.76rem;
  letter-spacing: 0.03em;
  color: rgba(245, 240, 232, 0.82);
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-wrap: balance;
`;

const Tagline = styled.p`
  max-width: 820px;
  font-size: clamp(1.08rem, 1.8vw, 1.28rem);
  color: rgba(245, 240, 232, 0.86);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 480px;
  }
`;

const ScrollCue = styled.button`
  display: grid;
  gap: 8px;
  justify-items: center;
  margin-top: 8px;
  color: rgba(245, 240, 232, 0.72);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  svg {
    font-size: 1.15rem;
    animation: ${({ $stopped }) => ($stopped ? 'none' : css`${bounce} 2.5s ease-in-out infinite`)};
  }
`;

const Story = styled.div`
  width: min(${({ theme }) => theme.layout.contentMax}, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  gap: 88px;
  padding: 16px 0 120px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 88px;
    padding-bottom: 88px;
  }
`;

const NarrativeSection = styled.section`
  min-height: 56vh;
  display: grid;
  align-items: center;
  gap: 28px;
  ${fadeUpStyles};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
  }
`;

const NarrativeGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $layout = 'media' }) =>
    $layout === 'media' ? '1.15fr 0.85fr' : '0.85fr 1.15fr'};
  gap: 40px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SectionCopy = styled.div`
  display: grid;
  gap: 18px;
  align-content: start;
`;

const SectionNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 7vw, 5.5rem);
  line-height: 0.8;
  color: rgba(154, 184, 158, 0.3);
`;

const SectionEyebrow = styled.span`
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(245, 240, 232, 0.62);
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1.05;
`;

const SectionBody = styled.p`
  max-width: 38rem;
  color: rgba(245, 240, 232, 0.82);
  font-size: 1.02rem;
`;

const ResearchStack = styled.div`
  display: grid;
  gap: 18px;
`;

const FeatureLink = styled(Link)`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 18px;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid rgba(245, 240, 232, 0.1);
  background: rgba(13, 26, 20, 0.34);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureThumb = styled.div`
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(154, 184, 158, 0.18), rgba(13, 26, 20, 0.28)),
    rgba(13, 26, 20, 0.28);
  border: 1px solid rgba(245, 240, 232, 0.08);
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeatureContent = styled.div`
  display: grid;
  gap: 10px;
  align-content: center;
`;

const FeatureMeta = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(245, 240, 232, 0.6);
`;

const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
`;

const FeatureText = styled.p`
  color: rgba(245, 240, 232, 0.78);
`;

const EvidencePanel = styled.div`
  display: grid;
  gap: 18px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(245, 240, 232, 0.1);
  background:
    linear-gradient(180deg, rgba(245, 240, 232, 0.06), rgba(13, 26, 20, 0.28)),
    rgba(13, 26, 20, 0.28);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
`;

const EvidenceLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 240, 232, 0.58);
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  display: grid;
  gap: 4px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(245, 240, 232, 0.05);
  border: 1px solid rgba(245, 240, 232, 0.08);
`;

const MetricValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  line-height: 0.9;
`;

const MetricLabel = styled.span`
  font-size: 0.82rem;
  color: rgba(245, 240, 232, 0.68);
`;

const EvidenceBody = styled.p`
  color: rgba(245, 240, 232, 0.78);
`;

const EvidenceList = styled.div`
  display: grid;
  gap: 10px;
`;

const EvidenceItem = styled.div`
  padding-top: 10px;
  border-top: 1px solid rgba(245, 240, 232, 0.08);
  color: rgba(245, 240, 232, 0.78);
`;

const EvidenceLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  a {
    color: ${({ theme }) => theme.colors.home.text};
    opacity: 0.8;
  }
`;

const ActivitySection = styled.div`
  display: grid;
  gap: 24px;
`;

const ActivityRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ActivityCard = styled(Link)`
  display: grid;
  gap: 12px;
`;

const ActivityVisual = styled.div`
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(245, 240, 232, 0.08);
  background:
    linear-gradient(145deg, rgba(74, 93, 58, 0.36), rgba(13, 26, 20, 0.42)),
    rgba(13, 26, 20, 0.32);
  display: flex;
  align-items: flex-end;
  padding: 16px;
`;

const ActivityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ActivityPlaceholder = styled.div`
  display: grid;
  gap: 6px;
`;

const ActivityKicker = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 240, 232, 0.62);
`;

const ActivityTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  line-height: 1.05;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.home.text};
`;

const ActivityMeta = styled.div`
  display: grid;
  gap: 4px;
`;

const ActivityName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
`;

const ActivityDate = styled.span`
  color: rgba(245, 240, 232, 0.62);
  font-size: 0.82rem;
`;

const SectionLink = styled(Link)`
  width: fit-content;
  font-size: 0.88rem;
  color: rgba(154, 184, 158, 0.96);
  letter-spacing: 0.02em;
`;

function Home() {
  const storyRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [setResearchNode, isResearchVisible] = useFadeIn(0.2);
  const [setLeadershipNode, isLeadershipVisible] = useFadeIn(0.2);
  const [setActivitiesNode, isActivitiesVisible] = useFadeIn(0.2);
  const featuredResearch = research.filter((item) => ['crisisnews', 'prism'].includes(item.id));
  const featuredActivities = activities.filter((item) =>
    ['chi-2025', 'un-ga-hlw', 'upenn-mixer'].includes(item.id)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHasScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageTransition>
      <Page>
        <Hero>
          <HeroInner>
            <Graph />
            <MobileMapLegend aria-hidden="true">
              <MobileMapChip>Public Discourse</MobileMapChip>
              <MobileMapChip>Governance</MobileMapChip>
              <MobileMapChip>AI &amp; Equity</MobileMapChip>
            </MobileMapLegend>
            <Name>Dongjae (Jack) Kang</Name>
            <Tagline>
              Researching how technology shapes public discourse and how governance can make it
              more equitable.
            </Tagline>
            <ScrollCue
              $stopped={hasScrolled}
              onClick={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Scroll to explore</span>
              <FiArrowDown />
            </ScrollCue>
          </HeroInner>
        </Hero>

        <Story ref={storyRef}>
          <NarrativeSection ref={setResearchNode} $visible={isResearchVisible}>
            <NarrativeGrid $layout="media">
              <ResearchStack>
                {featuredResearch.map((item) => (
                  <FeatureLink key={item.id} to={`/research/${item.id}`}>
                    <FeatureThumb>
                      {item.thumbnail ? <FeatureImage src={item.thumbnail} alt={item.title} /> : null}
                    </FeatureThumb>
                    <FeatureContent>
                      <FeatureMeta>Research · {item.year}</FeatureMeta>
                      <FeatureTitle>{item.title}</FeatureTitle>
                      <FeatureText>{item.summary}</FeatureText>
                    </FeatureContent>
                  </FeatureLink>
                ))}
              </ResearchStack>

              <SectionCopy>
                <SectionNumber>01</SectionNumber>
                <SectionEyebrow>Research</SectionEyebrow>
                <SectionTitle>How public discourse is shaped, and how it can be governed.</SectionTitle>
                <SectionBody>
                  He studies misinformation, platform governance, and the design of information
                  systems. That work includes CrisisNews, a study of 93,250 news articles across
                  two decades of social media crises, and PRISM, a prototype that visualizes how a
                  story spreads across different sources rather than asking users to trust a single
                  outlet. The work is empirical, but the question is public: what kinds of
                  platforms make collective judgment harder, and what kinds make it more possible.
                </SectionBody>
                <SectionLink to="/research">View all research →</SectionLink>
              </SectionCopy>
            </NarrativeGrid>
          </NarrativeSection>

          <NarrativeSection ref={setLeadershipNode} $visible={isLeadershipVisible}>
            <NarrativeGrid $layout="copy">
              <SectionCopy>
                <SectionNumber>02</SectionNumber>
                <SectionEyebrow>Leadership</SectionEyebrow>
                <SectionTitle>Research is one line of work. Institutions are another.</SectionTitle>
                <SectionBody>
                  As President of KAIST&apos;s Undergraduate Student Council, he rebuilt an
                  organization that had been inactive for three years. When Korea announced a 16%
                  cut to the national R&amp;D budget, he coordinated dialogue across universities,
                  National Assembly members, and government ministries. The method was not
                  confrontation for its own sake. It was dialogue, patience, and enough credibility
                  to keep people at the table.
                </SectionBody>
              </SectionCopy>

              <EvidencePanel>
                <EvidenceLabel>Council Record</EvidenceLabel>
                <MetricGrid>
                  <MetricCard>
                    <MetricValue>52.06%</MetricValue>
                    <MetricLabel>Election turnout</MetricLabel>
                  </MetricCard>
                  <MetricCard>
                    <MetricValue>88.93%</MetricValue>
                    <MetricLabel>Approval in election</MetricLabel>
                  </MetricCard>
                  <MetricCard>
                    <MetricValue>3.87 / 4.3</MetricValue>
                    <MetricLabel>Highest satisfaction score on record</MetricLabel>
                  </MetricCard>
                </MetricGrid>
                <EvidenceBody>
                  The council became a site of institution-building rather than simple protest. It
                  also connected to earlier and later committee work in Seoul, Daejeon, and
                  Columbia.
                </EvidenceBody>
                <EvidenceList>
                  <EvidenceItem>Participatory Budget Committee, Seoul Jungnang-gu (2017-2018)</EvidenceItem>
                  <EvidenceItem>Youth Policy Coordination Committee, Daejeon (2023-2025)</EvidenceItem>
                  <EvidenceItem>Founding board member, Columbia AI Club at SIPA</EvidenceItem>
                </EvidenceList>
                <EvidenceLinks>
                  <a
                    href="https://www.joongang.co.kr/article/25215586"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    JoongAng Ilbo column
                  </a>
                  <a
                    href="https://herald.kaist.ac.kr/news/articleView.html?idxno=20910"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    KAIST Herald article
                  </a>
                </EvidenceLinks>
              </EvidencePanel>
            </NarrativeGrid>
          </NarrativeSection>

          <NarrativeSection ref={setActivitiesNode} $visible={isActivitiesVisible}>
            <ActivitySection>
              <SectionCopy>
                <SectionNumber>03</SectionNumber>
                <SectionEyebrow>From Yokohama to New York</SectionEyebrow>
                <SectionTitle>Research, diplomacy, and community work in motion.</SectionTitle>
              </SectionCopy>

              <ActivityRow>
                {featuredActivities.map((item) => (
                  <ActivityCard key={item.id} to={`/activities/${item.id}`}>
                    <ActivityVisual>
                      {item.media?.cover || item.media?.photos?.[0] ? (
                        <ActivityImage
                          src={item.media?.cover || item.media?.photos?.[0]}
                          alt={item.title}
                        />
                      ) : (
                        <ActivityPlaceholder>
                          <ActivityKicker>{item.date}</ActivityKicker>
                          <ActivityTitle>{item.title}</ActivityTitle>
                        </ActivityPlaceholder>
                      )}
                    </ActivityVisual>
                    <ActivityMeta>
                      <ActivityName>{item.title}</ActivityName>
                      <ActivityDate>{item.date}</ActivityDate>
                    </ActivityMeta>
                  </ActivityCard>
                ))}
              </ActivityRow>

              <SectionBody>
                From presenting CrisisNews at ACM CHI in Yokohama to supporting diplomatic
                operations during the UN General Assembly High-Level Week in New York, his work
                moves across research, policy, and community settings. Some moments are formal,
                others are logistical, and some are simply about helping people orient inside an
                institution. Together they describe the same pattern: studying systems, then
                working inside them.
              </SectionBody>
              <SectionLink to="/activities">View all activities →</SectionLink>
            </ActivitySection>
          </NarrativeSection>
        </Story>
      </Page>
    </PageTransition>
  );
}

export default Home;
