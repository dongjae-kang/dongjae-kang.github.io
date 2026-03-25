import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowDown } from 'react-icons/fi';
import Graph from '../components/Graph';
import PageTransition from '../components/PageTransition';
import { research } from '../data/research';
import { activities, communityEvents } from '../data/activities';
const allActivities = [...activities, ...communityEvents];

function useFadeIn(threshold = 0.12) {
  const [node, setNode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [setNode, isVisible];
}

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
`;

const fadeUp = css`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '16px')});
  transition: opacity 0.65s ease, transform 0.65s ease;
`;

/* ─── PAGE SHELL ─── */
const Page = styled.main`
  background: ${({ theme }) => theme.colors.subpage.background};
  color: ${({ theme }) => theme.colors.subpage.text};
  overflow-x: hidden;
`;

/* ─── HERO ─── */
const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 108px 24px 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-align: start;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(960px, 90vw);
    height: min(800px, 80vh);
    transform: translate(-50%, -54%);
    background:
      radial-gradient(ellipse at 30% 40%, rgba(27, 61, 47, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 35%, rgba(196, 149, 106, 0.07) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 60%, rgba(74, 122, 94, 0.09) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 96px 16px 36px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1060px;
  display: grid;
  justify-items: center;
  gap: 16px;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.02em;
`;

const Tagline = styled.p`
  max-width: 820px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.subpage.muted};

  @media (min-width: 1024px) {
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    white-space: normal;
  }
`;

const ScrollCue = styled.button`
  display: grid;
  gap: 6px;
  justify-items: center;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.5;
  svg {
    font-size: 1rem;
    animation: ${({ $stopped }) => ($stopped ? 'none' : css`${bounce} 2.5s ease-in-out infinite`)};
  }
`;

/* ─── NARRATIVE ─── */
const Narrative = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 0 24px 100px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 16px 72px;
  }
`;

const Section = styled.section`
  padding: 72px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  ${fadeUp};

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 48px 0;
    min-height: auto;
    scroll-snap-align: none;
  }
`;

const SectionLead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
`;

const SectionNum = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  color: rgba(27, 61, 47, 0.24);
`;

const SectionLabel = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 2.8vw, 2.5rem);
  font-weight: 600;
  line-height: 1.12;
  margin-bottom: 16px;
  max-width: 620px;

  @media (min-width: 1024px) {
    white-space: nowrap;
  }
`;

const SectionBody = styled.p`
  max-width: 680px;
  font-size: 0.96rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-bottom: 28px;
`;

/* ─── RESEARCH LIST (text + line, like mockup) ─── */
const ListWrap = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
  max-width: 100%;
  overflow: hidden;
`;

const ListRow = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};
  transition: background 0.15s;

  &:hover {
    background: rgba(27, 61, 47, 0.03);
  }
`;

const ListInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

const ListTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.3;
`;

const ListDesc = styled.p`
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-top: 3px;
  line-height: 1.55;
`;

const ListYear = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
  letter-spacing: 0.06em;
  white-space: nowrap;
  flex-shrink: 0;
`;

const ViewAll = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.subpage.accent};
  font-size: 0.84rem;
  margin-top: 18px;
`;

/* ─── LEADERSHIP ROLES (same style as research list) ─── */
const RoleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const RoleInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

const RoleTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.3;
`;

const RoleDesc = styled.p`
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-top: 3px;
  line-height: 1.55;
`;

const RoleLinks = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 6px;
  a {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.subpage.accent};
  }
`;

/* ─── ACTIVITIES STRIP ─── */
const StripWrap = styled.div`
  overflow: hidden;
  max-width: 100%;
`;

const Strip = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-thumb { background: rgba(27, 61, 47, 0.18); border-radius: 3px; }
`;

const ActCard = styled(Link)`
  flex: 0 0 200px;
  display: grid;
  gap: 8px;
`;

const ActVisual = styled.div`
  position: relative;
  height: 140px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  background: ${({ $hasImage }) =>
    $hasImage
      ? '#dbe1db'
      : 'linear-gradient(155deg, rgba(27,61,47,0.88), rgba(45,90,61,0.72) 50%, rgba(154,184,158,0.5))'};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $hasImage }) => ($hasImage ? 'rgba(13,26,20,0.12)' : 'transparent')};
    mix-blend-mode: multiply;
    pointer-events: none;
  }
`;

const ActImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ActLocation = styled.span`
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 1;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f7f7f5;
`;

const ActName = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
`;

const ActDate = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

/* ─── HOVER PREVIEW ─── */
const FloatingPreview = styled.div`
  position: fixed;
  top: ${({ $y }) => `${$y}px`};
  left: ${({ $x }) => `${$x}px`};
  width: 280px;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid rgba(27, 61, 47, 0.14);
  background: #d8ddd8;
  box-shadow: 0 12px 36px rgba(27, 61, 47, 0.14);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 40;

  @media (max-width: 1024px) { display: none; }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* ─── DATA ─── */
const researchOrder = ['crisisnews', 'prism', 'beyond-removal', 'multi-agent-sim'];
const activityOrder = ['chi-2025', 'un-ga-hlw', 'un-youth-forum', 'kgsa-career', 'upenn-mixer', 'hyc-mixer', 'valedictorian'];

function Home() {
  const storyRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [resRef, resVis] = useFadeIn();
  const [leadRef, leadVis] = useFadeIn();
  const [actRef, actVis] = useFadeIn();
  const [preview, setPreview] = useState({ visible: false, x: 0, y: 0, image: null });

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 100) setHasScrolled(true); };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = researchOrder.map((id) => research.find((r) => r.id === id)).filter(Boolean);
  const leaderRoles = [
    allActivities.find((a) => a.id === 'student-council'),
    allActivities.find((a) => a.id === 'columbia-ai-club'),
  ].filter(Boolean);
  const actItems = activityOrder.map((id) => allActivities.find((a) => a.id === id)).filter(Boolean);

  const showPreview = (e, item) => {
    if (!item.thumbnail || window.innerWidth < 1024) return;
    const w = 280, h = 175;
    let x = e.clientX + 24;
    let y = e.clientY - h / 2;
    if (x + w > window.innerWidth - 20) x = e.clientX - w - 24;
    y = Math.min(window.innerHeight - h - 20, Math.max(20, y));
    setPreview({ visible: true, x, y, image: item.thumbnail });
  };

  const hidePreview = () => setPreview((p) => ({ ...p, visible: false }));

  return (
    <PageTransition>
      <Page>
        {/* ── HERO ── */}
        <Hero>
          <HeroContent>
            <Graph />
            <Name>Dongjae (Jack) Kang</Name>
            <Tagline>
              Studying misinformation, platform governance, and the systems that shape what people believe.
            </Tagline>
            <ScrollCue
              type="button"
              $stopped={hasScrolled}
              onClick={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Scroll to explore</span>
              <FiArrowDown />
            </ScrollCue>
          </HeroContent>
        </Hero>

        {/* ── NARRATIVE ── */}
        <Narrative ref={storyRef}>

          {/* 01 — Research */}
          <Section ref={resRef} $visible={resVis}>
            <SectionLead>
              <SectionNum>01</SectionNum>
              <SectionLabel>Research</SectionLabel>
            </SectionLead>
            <SectionTitle>How platforms shape what people see, share, and believe.</SectionTitle>
            <SectionBody>
              His research examines how problematic behaviors emerge and escalate on social
              media platforms. At KAIST, he co-built CrisisNews, a dataset of 93,250 news
              articles spanning two decades of social media crises, and presented the work at
              ACM CHI 2025 in Yokohama. At Columbia, he led the development of PRISM, a
              platform that maps how the same news event is framed across the political
              spectrum.
            </SectionBody>

            <ListWrap>
              {items.map((item) => (
                <ListRow
                  key={item.id}
                  to={`/research/${item.id}`}
                  onMouseEnter={(e) => showPreview(e, item)}
                  onMouseMove={(e) => showPreview(e, item)}
                  onMouseLeave={hidePreview}
                >
                  <ListInfo>
                    <ListTitle>{item.title}</ListTitle>
                    <ListDesc>{item.summary}</ListDesc>
                  </ListInfo>
                  <ListYear>{item.year}</ListYear>
                </ListRow>
              ))}
            </ListWrap>
            <ViewAll to="/research">View all research →</ViewAll>
          </Section>

          {/* 02 — Leadership */}
          <Section ref={leadRef} $visible={leadVis}>
            <SectionLead>
              <SectionNum>02</SectionNum>
              <SectionLabel>Leadership</SectionLabel>
            </SectionLead>
            <SectionTitle>Research is one line of work. Institutions are another.</SectionTitle>
            <SectionBody>
              As President of KAIST&apos;s Undergraduate Student Council, he rebuilt the
              organization after three years of inactivity, achieving the highest satisfaction
              rating in council history. When Korea&apos;s government proposed a 16% R&amp;D budget
              cut, he led a coalition of 11 university student organizations in direct
              engagement with National Assembly members and Ministry officials. The experience
              led to an invitation to publish a column in JoongAng Ilbo, one of Korea&apos;s
              leading national newspapers.
            </SectionBody>

            <ListWrap>
              {leaderRoles.map((item) => (
                <RoleRow key={item.id}>
                  <RoleInfo>
                    <RoleTitle>{item.title}</RoleTitle>
                    <RoleDesc>{item.summary}</RoleDesc>
                    {item.id === 'student-council' && (
                      <RoleLinks>
                        <a href="https://www.joongang.co.kr/article/25215586" target="_blank" rel="noopener noreferrer">
                          JoongAng Ilbo column →
                        </a>
                        <a href="https://herald.kaist.ac.kr/news/articleView.html?idxno=20910" target="_blank" rel="noopener noreferrer">
                          KAIST Herald →
                        </a>
                      </RoleLinks>
                    )}
                  </RoleInfo>
                  <ListYear>{item.date}</ListYear>
                </RoleRow>
              ))}
            </ListWrap>
          </Section>

          {/* 03 — Activities */}
          <Section ref={actRef} $visible={actVis}>
            <SectionLead>
              <SectionNum>03</SectionNum>
              <SectionLabel>From Yokohama to the General Assembly</SectionLabel>
            </SectionLead>
            <SectionTitle>Studying how systems work, then working inside them.</SectionTitle>
            <SectionBody>
              He presented research at ACM CHI in Yokohama, supported Presidential
              Secretariat operations during the UN General Assembly High-Level Week, and was
              selected as a Respondent for the SDG 9 session at the 2026 UN ECOSOC Youth
              Forum. At Columbia, he organized career and networking events connecting 200+
              students across Ivy League campuses.
            </SectionBody>

            <StripWrap>
              <Strip>
                {actItems.map((item) => {
                  const cover = item.media?.cover || item.media?.photos?.[0];
                  return (
                    <ActCard key={item.id} to={`/activities/${item.id}`}>
                      <ActVisual $hasImage={!!cover}>
                        {cover && <ActImage src={cover} alt={item.title} />}
                        <ActLocation>{item.location}</ActLocation>
                      </ActVisual>
                      <ActName>{item.title}</ActName>
                      <ActDate>{item.date}</ActDate>
                    </ActCard>
                  );
                })}
              </Strip>
            </StripWrap>
            <ViewAll to="/activities">View all activities →</ViewAll>
          </Section>

        </Narrative>

        {/* Hover preview */}
        <FloatingPreview $visible={preview.visible} $x={preview.x} $y={preview.y}>
          {preview.image && <PreviewImg src={preview.image} alt="preview" />}
        </FloatingPreview>
      </Page>
    </PageTransition>
  );
}

export default Home;
