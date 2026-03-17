import styled from 'styled-components';
import Graph from '../components/Graph';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';

const HomePage = styled.main`
  min-height: 100vh;
  padding-top: 120px;
  color: ${({ theme }) => theme.colors.home.text};
  background: #1a1a1a;
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(27, 61, 47, 0.92) 0%, transparent 52%),
    radial-gradient(ellipse at 80% 20%, rgba(92, 61, 46, 0.88) 0%, transparent 42%),
    radial-gradient(ellipse at 60% 80%, rgba(74, 93, 58, 0.78) 0%, transparent 46%),
    radial-gradient(ellipse at 42% 32%, rgba(27, 61, 47, 0.52) 0%, transparent 38%);
`;

const Inner = styled.div`
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  gap: 32px;
  align-items: center;
`;

const Intro = styled.section`
  display: grid;
  gap: 16px;
  padding-bottom: 24px;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  letter-spacing: 0.02em;
  line-height: 1.08;
`;

const Tagline = styled.p`
  max-width: 680px;
  font-size: 1.15rem;
  font-weight: 300;
  color: rgba(245, 240, 232, 0.88);
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
