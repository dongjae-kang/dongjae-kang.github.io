import styled from 'styled-components';
import Graph from '../components/Graph';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';

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
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  gap: 24px;
  align-items: center;
`;

const Intro = styled.section`
  display: grid;
  gap: 16px;
  padding: 8px 0 40px;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.02;
  max-width: 12ch;
  text-wrap: balance;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
`;

const Tagline = styled.p`
  max-width: 680px;
  font-size: 1.15rem;
  font-weight: 400;
  color: rgba(243, 247, 240, 0.84);
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

function Home() {
  return (
    <PageTransition>
      <HomePage>
        <Inner>
          <Graph />
          <Intro>
            <Name>Dongjae (Jack) Kang</Name>
            <Tagline>
              Researching how technology shapes public discourse and how governance can make it
              more equitable.
            </Tagline>
            <TagRow>
              <Tag $variant="dark">Columbia SIPA</Tag>
              <Tag $variant="dark">Platform Governance</Tag>
              <Tag $variant="dark">Misinformation</Tag>
              <Tag $variant="dark">HCI</Tag>
            </TagRow>
          </Intro>
        </Inner>
      </HomePage>
    </PageTransition>
  );
}

export default Home;
