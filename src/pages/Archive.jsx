import styled from 'styled-components';
import PageTransition from '../components/PageTransition';
import { archive } from '../data/archive';

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

const Intro = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
  margin-bottom: 32px;
  font-size: 1.04rem;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subpage.border};
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

const Card = styled.article`
  display: grid;
  gap: 12px;
`;

const Photo = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
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

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
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

const Meta = styled.div`
  display: grid;
  gap: 2px;
`;

const ArchiveTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  line-height: 1.08;
  font-weight: 500;
`;

const Caption = styled.span`
  color: ${({ theme }) => theme.colors.subpage.muted};
  font-size: 0.84rem;
`;

function Archive() {
  return (
    <PageTransition>
      <Page>
        <Container>
          <Title>Archive</Title>
          <Intro>
            A lighter record of visits, campus scenes, and intervals outside the formal work.
          </Intro>

          <Grid>
            {archive.map((item) => (
              <Card key={item.id}>
                <Photo $hasImage={!!item.image}>
                  {item.image ? <Image src={item.image} alt={item.title} /> : <Placeholder>{item.title}</Placeholder>}
                </Photo>
                <Meta>
                  <ArchiveTitle>{item.title}</ArchiveTitle>
                  <Caption>
                    {item.date} · {item.location}
                  </Caption>
                </Meta>
              </Card>
            ))}
          </Grid>
        </Container>
      </Page>
    </PageTransition>
  );
}

export default Archive;
