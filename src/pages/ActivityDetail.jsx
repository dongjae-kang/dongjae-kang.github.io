import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { activities } from '../data/activities';

const Page = styled.main`
  min-height: 100vh;
  padding: 140px 24px 80px;
`;

const Container = styled.div`
  width: min(${({ theme }) => theme.layout.pageMax}, 100%);
  margin: 0 auto;
  display: grid;
  gap: 28px;
`;

const Back = styled(Link)`
  width: fit-content;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const Photo = styled.div`
  aspect-ratio: 3 / 2;
  border-radius: ${({ theme }) => theme.layout.radius};
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  color: ${({ theme }) => theme.colors.subpage.muted};
  display: grid;
  place-items: center;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.h1};
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Description = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const VideoWrap = styled.div`
  display: grid;
  gap: 12px;

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    border-radius: ${({ theme }) => theme.layout.radius};
  }
`;

function ActivityDetail() {
  const { id } = useParams();
  const item = activities.find((entry) => entry.id === id);

  if (!item) {
    return (
      <PageTransition>
        <Page>
          <Container>
            <Back to="/activities">Back to Activities</Back>
            <Title>Activity not found</Title>
          </Container>
        </Page>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Page>
        <Container>
          <Back to="/activities">Back to Activities</Back>
          <Photo>{item.title} media</Photo>
          <div>
            <Title>{item.title}</Title>
            <DateText>{item.date || 'Date to be added'}</DateText>
          </div>
          <Description>{item.fullDesc}</Description>
          <TagList>
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
          {item.id === 'valedictorian' && (
            <VideoWrap>
              <iframe
                src="https://www.youtube.com/embed/U7m4LpyHffk?start=4502"
                title="KAIST Valedictorian speech"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p>Speech starts at 1:15:02</p>
            </VideoWrap>
          )}
        </Container>
      </Page>
    </PageTransition>
  );
}

export default ActivityDetail;
