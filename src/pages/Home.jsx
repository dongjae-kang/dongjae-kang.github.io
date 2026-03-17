import { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Graph from '../components/Graph';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { homeNarrative } from '../data/homeNarrative';

const mobileMapGuide = [
  {
    title: 'Platforms & Public Discourse',
    body: 'Misinformation, content moderation, and how platforms shape what people see.',
  },
  {
    title: 'Leadership & Governance',
    body: 'Student government, coalitions, and institutional work that turns ideas into action.',
  },
  {
    title: 'Equity, Innovation & Opportunity',
    body: 'AI policy, equitable development, and the public case for wider opportunity.',
  },
];

const HomePage = styled.main`
  min-height: 100vh;
  padding-top: 120px;
  color: ${({ theme }) => theme.colors.home.text};
  background:
    radial-gradient(circle at top, rgba(154, 199, 175, 0.08), transparent 36%),
    #081711;
  background-image:
    radial-gradient(ellipse at 14% 16%, rgba(60, 122, 94, 0.6) 0%, transparent 42%),
    radial-gradient(ellipse at 80% 18%, rgba(27, 90, 67, 0.54) 0%, transparent 40%),
    radial-gradient(ellipse at 72% 72%, rgba(83, 148, 117, 0.38) 0%, transparent 42%),
    radial-gradient(ellipse at 28% 70%, rgba(15, 61, 46, 0.92) 0%, transparent 52%),
    radial-gradient(ellipse at 46% 38%, rgba(130, 191, 161, 0.16) 0%, transparent 34%);
`;

const Inner = styled.div`
  width: min(1320px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  gap: 32px;
  align-items: center;
`;

const Intro = styled.section`
  display: grid;
  gap: 18px;
  padding: 8px 0 8px;
  max-width: 900px;
`;

const Eyebrow = styled.span`
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(243, 247, 240, 0.66);
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.7rem, 5vw, 5rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 0.95;
  max-width: 11ch;
  text-wrap: balance;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
`;

const Tagline = styled.p`
  max-width: 760px;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(243, 247, 240, 0.84);
`;

const Quote = styled.p`
  max-width: 680px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2.3rem);
  line-height: 1.04;
  color: ${({ theme }) => theme.colors.home.text};
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  padding: 12px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.home.text};
  color: ${({ theme }) => theme.colors.home.base};
  font-weight: 500;
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid rgba(154, 199, 175, 0.3);
  color: ${({ theme }) => theme.colors.home.text};
  background: rgba(8, 23, 17, 0.18);
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const MobileMapGuide = styled.section`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    gap: 12px;
  }
`;

const MobileGuideKicker = styled.span`
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(243, 247, 240, 0.62);
`;

const MobileGuideGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const MobileGuideCard = styled.div`
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(216, 234, 223, 0.12);
  background: rgba(8, 23, 17, 0.16);
  backdrop-filter: blur(14px);
`;

const MobileGuideTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1;
`;

const MobileGuideBody = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(243, 247, 240, 0.72);
`;

const StorySection = styled.section`
  display: grid;
  gap: 24px;
  padding: 24px 0 8px;
`;

const SectionHeader = styled.div`
  display: grid;
  gap: 10px;
  max-width: 760px;
`;

const SectionKicker = styled.span`
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(243, 247, 240, 0.62);
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3.1rem);
  font-weight: 600;
  line-height: 0.98;
  max-width: 12ch;
`;

const SectionText = styled.p`
  max-width: 760px;
  color: rgba(243, 247, 240, 0.78);
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const StoryCard = styled(Link)`
  display: grid;
  gap: 14px;
  padding: 22px;
  border-radius: 24px;
  border: 1px solid rgba(216, 234, 223, 0.12);
  background: rgba(8, 23, 17, 0.22);
  backdrop-filter: blur(16px);
`;

const StoryLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(243, 247, 240, 0.58);
`;

const StoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 0.98;
`;

const StoryBody = styled.p`
  color: rgba(243, 247, 240, 0.76);
`;

const FeatureSection = styled.section`
  display: grid;
  gap: 24px;
  padding: 32px 0 80px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Link)`
  display: grid;
  gap: 18px;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid rgba(216, 234, 223, 0.12);
  background: rgba(8, 23, 17, 0.18);
`;

const FeatureImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 16px;
`;

const FeatureMeta = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(243, 247, 240, 0.58);
`;

const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 0.98;
`;

const FeatureDesc = styled.p`
  color: rgba(243, 247, 240, 0.76);
`;

function Home() {
  const storyRef = useRef(null);

  return (
    <PageTransition>
      <HomePage>
        <Inner>
          <Intro>
            <Eyebrow>{homeNarrative.eyebrow}</Eyebrow>
            <Name>Dongjae (Jack) Kang</Name>
            <Quote>{homeNarrative.quote}</Quote>
            <Tagline>{homeNarrative.intro}</Tagline>
            <CtaRow>
              <PrimaryButton onClick={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                {homeNarrative.cta.primary}
              </PrimaryButton>
              <SecondaryButton to="/research">{homeNarrative.cta.secondary}</SecondaryButton>
            </CtaRow>
            <TagRow>
              <Tag $variant="dark">Columbia SIPA</Tag>
              <Tag $variant="dark">Platform Governance</Tag>
              <Tag $variant="dark">Misinformation</Tag>
              <Tag $variant="dark">Equitable Development</Tag>
            </TagRow>
          </Intro>
          <MobileMapGuide>
            <MobileGuideKicker>Read The Map</MobileGuideKicker>
            <MobileGuideGrid>
              {mobileMapGuide.map((cluster) => (
                <MobileGuideCard key={cluster.title}>
                  <MobileGuideTitle>{cluster.title}</MobileGuideTitle>
                  <MobileGuideBody>{cluster.body}</MobileGuideBody>
                </MobileGuideCard>
              ))}
            </MobileGuideGrid>
          </MobileMapGuide>
          <Graph />
          <StorySection ref={storyRef}>
            <SectionHeader>
              <SectionKicker>Follow The Story</SectionKicker>
              <SectionTitle>{homeNarrative.title}</SectionTitle>
              <SectionText>
                The map above shows the network. The sections below explain the person inside it:
                where the work starts, what questions drive it, and how research turns into public
                action.
              </SectionText>
            </SectionHeader>
            <StoryGrid>
              {homeNarrative.chapters.map((chapter) => (
                <StoryCard key={chapter.title} to={chapter.link}>
                  <StoryLabel>{chapter.label}</StoryLabel>
                  <StoryTitle>{chapter.title}</StoryTitle>
                  <StoryBody>{chapter.body}</StoryBody>
                </StoryCard>
              ))}
            </StoryGrid>
          </StorySection>
          <FeatureSection>
            <SectionHeader>
              <SectionKicker>Selected Work</SectionKicker>
              <SectionTitle>Research, prototypes, and public-facing leadership</SectionTitle>
            </SectionHeader>
            <FeatureGrid>
              {homeNarrative.featured.map((item) => (
                <FeatureCard key={item.title} to={item.link}>
                  <FeatureImage src={item.image} alt={`${item.title} feature`} />
                  <div>
                    <FeatureMeta>
                      {item.label} · {item.meta}
                    </FeatureMeta>
                    <FeatureTitle>{item.title}</FeatureTitle>
                  </div>
                  <FeatureDesc>{item.description}</FeatureDesc>
                </FeatureCard>
              ))}
            </FeatureGrid>
          </FeatureSection>
        </Inner>
      </HomePage>
    </PageTransition>
  );
}

export default Home;
