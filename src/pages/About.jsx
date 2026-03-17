import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
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
  border-radius: ${({ theme }) => theme.layout.radius};
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(21, 54, 41, 0.14);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 160px;
    height: 160px;
  }
`;

const SecondaryPhoto = styled.div`
  width: 220px;
  aspect-ratio: 4 / 5;
  border-radius: ${({ theme }) => theme.layout.radius};
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(21, 54, 41, 0.1);

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

const Contacts = styled.section`
  display: grid;
  gap: 16px;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  color: ${({ theme }) => theme.colors.subpage.copper};
`;

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
          </Intro>
          <Divider />
          <Contacts>
            <ContactLink href="mailto:dk3500@columbia.edu">
              <FaEnvelope /> dk3500@columbia.edu
            </ContactLink>
            <ContactLink
              href="https://linkedin.com/in/jackkang3780"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin /> linkedin.com/in/jackkang3780
            </ContactLink>
            <ContactLink
              href="https://github.com/dongjae-kang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> github.com/dongjae-kang
            </ContactLink>
          </Contacts>
        </Container>
      </Page>
    </PageTransition>
  );
}

export default About;
