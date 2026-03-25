import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import profileSquare from '../assets/images/profile-square.jpg';
import profileFull from '../assets/images/profile-full.jpg';

const Page = styled.main`
  min-height: 100vh;
  padding: 140px 24px 80px;
  background: ${({ theme }) => theme.colors.subpage.background};
`;

const Container = styled.div`
  width: min(${({ theme }) => theme.layout.pageMax}, 100%);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.h1};
  letter-spacing: 0.02em;
  margin-bottom: 40px;
`;

const Intro = styled.section`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 32px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PhotoColumn = styled.div`
  display: grid;
  gap: 14px;
`;

const Photo = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 160px;
    height: 160px;
  }
`;

const SecondaryPhoto = styled.div`
  width: 220px;
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Bio = styled.div`
  display: grid;
  gap: 24px;
  max-width: ${({ theme }) => theme.layout.textMax};

  p {
    font-size: 1.04rem;
    line-height: 1.78;
  }

  a {
    color: ${({ theme }) => theme.colors.subpage.copper};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.16em;
  }
`;

const Divider = styled.hr`
  margin: 48px 0 28px;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

/* ─── JOURNEY SECTION ─── */
const JourneyTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 28px;
`;

const Timeline = styled.div`
  display: grid;
  gap: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.subpage.border};
`;

const TimelineRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 4px;
  }
`;

const TimelineInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

const TimelineRole = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.35;
`;

const TimelineOrg = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-top: 2px;
`;

const TimelineDetail = styled.div`
  display: grid;
  gap: 2px;
  margin-top: 4px;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
  opacity: 0.8;
`;

const TimelinePeriod = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.subpage.muted};
  letter-spacing: 0.06em;
  white-space: nowrap;
  flex-shrink: 0;
`;

const TimelineCategory = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

/* ─── CONTACTS ─── */
const Contacts = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  margin-top: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid rgba(27, 61, 47, 0.2);
  border-radius: 4px;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.subpage.accent};
  background: rgba(27, 61, 47, 0.04);
  transition: ${({ theme }) => theme.transitions.hover};
  white-space: nowrap;

  svg {
    flex-shrink: 0;
    font-size: 0.95rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.subpage.accent};
    background: rgba(27, 61, 47, 0.08);
  }
`;

const journey = [
  {
    category: 'Education',
    items: [
      { role: 'Master of Public Administration', org: 'Columbia University, School of International and Public Affairs (SIPA)', detail: 'Concentration: Technology, Policy, and Innovation', period: '2025 - Present' },
      { role: 'Bachelor of Science in Industrial and Systems Engineering', org: 'KAIST (Korea Advanced Institute of Science and Technology)', detail: 'Double Major: Business and Technology Management\nMinor: Science and Technology Policy', period: '2018 - 2025' },
    ],
  },
  {
    category: 'Publications',
    items: [
      { role: 'CrisisNews: A Dataset Mapping Two Decades of News Articles on Online Problematic Behavior at Scale', org: 'Jeanne Choi*, Dongjae Kang* (*co-first authors), Yubin Choi, Juhoon Lee, Joseph Seering, Under Review', period: '2025' },
      { role: 'Understanding Social Media Crisis: A Data-driven Analysis of Online Problematic Behavior', org: 'Jeanne Choi*, Dongjae Kang* (*co-first authors), Joseph Seering, CHI 2025 Workshop Paper', period: '2025' },
    ],
  },
  {
    category: 'Research Experience',
    items: [
      { role: 'Research Assistant', org: 'KAIST Collaborative Social Technologies Lab (Prof. Joseph Seering)', period: '2024 - 2025' },
      { role: 'Undergraduate Researcher', org: 'ISTI-CNR (Italy) x KAIST, International collaboration on fault-tolerant Systems-of-Systems', period: '2024 - 2025' },
      { role: 'Research Assistant', org: 'KAIST di-Lab (Prof. KyungRyul Park)', period: '2024' },
    ],
  },
  {
    category: 'Leadership & Public Service',
    items: [
      { role: 'Founding Board / VP of Research Lab', org: 'Columbia AI Club at SIPA', period: '2025 - Present' },
      { role: 'President', org: 'KAIST Undergraduate Student Council (34th)', period: '2022 - 2023' },
      { role: 'Member', org: 'Daejeon Youth Policy Coordination Committee', period: '2023 - 2025' },
      { role: 'Youth Representative', org: 'Seoul Jungnang-gu Participatory Budget Committee', period: '2017 - 2018' },
    ],
  },
  {
    category: 'Professional',
    items: [
      { role: 'Event Assistant, UN General Assembly High-Level Week', org: 'Permanent Mission of the Republic of Korea to the United Nations', period: 'Sep 2025' },
      { role: 'Member, Young Engineers Honor Society (YEHS)', org: 'National Academy of Engineering of Korea', period: '2024 - 2025' },
      { role: 'Sergeant, Technical & Administrative Specialist', org: 'Korea Army Training Center (Honorable Discharge)', period: '2021 - 2022' },
    ],
  },
  {
    category: 'Honors & Awards',
    items: [
      { role: 'KAIST Q-Day Presidential Award', org: 'Recognized for trust-based communication and excellence in creative education and research', period: '2024' },
      { role: 'KAIST College of Engineering Leadership Award', org: 'Accomplishments beyond coursework including publications and social service', period: '2024' },
      { role: 'KAIST Honors Scholarships (Department Honors / Highest Honors)', org: 'Exceptional academic performance', period: '2020, 2023' },
      { role: 'KAIST Inseong Fellow', org: 'Significant service and positive impact on university community', period: '2020' },
      { role: 'KAIST Valedictorian, Freshman Graduation', org: 'Selected as sole speaker representing entire freshman class', period: '2018' },
      { role: 'National Science and Technology Scholarship', org: 'Full tuition throughout undergraduate studies', period: '2018 - 2023' },
    ],
  },
];

function About() {
  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>About</Title>
          <Intro>
            <PhotoColumn>
              <Photo aria-label="Dongjae Kang profile photo">
                <PhotoImage src={profileSquare} alt="Dongjae (Jack) Kang" />
              </Photo>
              <SecondaryPhoto aria-label="Dongjae Kang full portrait">
                <PhotoImage src={profileFull} alt="Dongjae (Jack) Kang portrait" />
              </SecondaryPhoto>
            </PhotoColumn>
            <Bio>
              <p>
                Dongjae (Jack) Kang is an MPA student at Columbia SIPA, concentrating in
                Technology, Policy and Innovation. He majored in Industrial Engineering at KAIST,
                with a double major in Business and a minor in Science and Technology Policy. He
                graduated as KAIST&apos;s <Link to="/activities/valedictorian">Valedictorian</Link>,
                delivering the commencement address at a ceremony attended by the President of
                Korea.
              </p>
              <p>
                At KAIST&apos;s Collaborative Social Technologies Lab (2024-2025), he co-authored a
                study analyzing two decades of social media crisis patterns, and presented the work
                at the <Link to="/research/crisisnews">ACM CHI 2025 Workshop</Link> in Yokohama.
                At Columbia, he led a team building <Link to="/research/prism">PRISM</Link>, a
                platform that visualizes how news stories spread across different sources, and is
                currently researching content moderation remedies and AI-driven misinformation
                dynamics.
              </p>
              <p>
                As President of the KAIST Undergraduate Student Council (2022-2023), he rebuilt
                the organization after three years of inactivity and coordinated dialogue among
                universities nationwide, the National Assembly, and government ministries on
                Korea&apos;s R&amp;D budget policy. This led to an invitation to write{' '}
                <a
                  href="https://www.joongang.co.kr/article/25215586"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  a column
                </a>{' '}
                in one of Korea&apos;s leading newspapers. He has served on participatory governance
                committees in Seoul (2017-2018) and Daejeon (2023-2025), supported diplomatic
                operations during the UN General Assembly High-Level Week in 2025, and is a
                founding board member of the Columbia AI Club at SIPA.
              </p>
              <p>
                His research interests include platform governance, misinformation, and content
                moderation. He aims to study how platforms shape society and how policy can guide
                them responsibly, and put that research into practice.
              </p>
            </Bio>

            <Contacts>
              <ContactButton href="mailto:dk3500@columbia.edu">
                <FiMail />
                dk3500@columbia.edu
              </ContactButton>
              <ContactButton
                href="https://linkedin.com/in/jackkang3780"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin />
                LinkedIn
              </ContactButton>
              <ContactButton
                href="https://github.com/dongjae-kang"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub />
                GitHub
              </ContactButton>
            </Contacts>
          </Intro>

          <Divider />

          <JourneyTitle>Experience</JourneyTitle>
          {journey.map((section) => (
            <div key={section.category}>
              <TimelineCategory>{section.category}</TimelineCategory>
              <Timeline>
                {section.items.map((item) => (
                  <TimelineRow key={`${item.role}-${item.period}`}>
                    <TimelineInfo>
                      <TimelineRole>{item.role}</TimelineRole>
                      <TimelineOrg>{item.org}</TimelineOrg>
                      {item.detail && (
                        <TimelineDetail>
                          {item.detail.split('\n').map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </TimelineDetail>
                      )}
                    </TimelineInfo>
                    <TimelinePeriod>{item.period}</TimelinePeriod>
                  </TimelineRow>
                ))}
              </Timeline>
            </div>
          ))}

        </Container>
      </Page>
    </PageTransition>
  );
}

export default About;
