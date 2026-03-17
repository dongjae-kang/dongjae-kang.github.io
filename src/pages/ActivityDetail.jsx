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
  background:
    linear-gradient(135deg, rgba(30, 91, 67, 0.14), rgba(221, 232, 224, 0.82));
  border: 1px solid rgba(30, 91, 67, 0.14);
  color: ${({ theme }) => theme.colors.subpage.muted};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 20px;
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

const MediaLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subpage.accent};
`;

const MediaNote = styled.span`
  max-width: 30ch;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.subpage.text};
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

const ArchiveNote = styled.p`
  max-width: ${({ theme }) => theme.layout.textMax};
  color: ${({ theme }) => theme.colors.subpage.muted};
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
          <Photo>
            <MediaLabel>Activity Media</MediaLabel>
            <MediaNote>
              {item.media?.photos?.length
                ? `${item.media.photos.length} photos in archive`
                : 'Photo archive in progress. Media will be added as the site is updated.'}
            </MediaNote>
          </Photo>
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
          {!item.media?.photos?.length && item.id !== 'valedictorian' && (
            <ArchiveNote>
              This entry is live, but its visual archive has not been uploaded yet. Text content and
              metadata are finalized from the current project brief.
            </ArchiveNote>
          )}
        </Container>
      </Page>
    </PageTransition>
  );
}

export default ActivityDetail;
