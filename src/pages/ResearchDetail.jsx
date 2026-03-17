import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Tag from '../components/Tag';
import PageTransition from '../components/PageTransition';
import { research } from '../data/research';

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

const Thumbnail = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.layout.radius};
  background: ${({ theme }) => theme.colors.subpage.placeholder};
  display: grid;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  color: ${({ theme }) => theme.colors.subpage.muted};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.h1};
`;

const Year = styled.p`
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

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  a {
    color: ${({ theme }) => theme.colors.subpage.accent};
  }
`;

function ResearchDetail() {
  const { id } = useParams();
  const item = research.find((entry) => entry.id === id);

  if (!item) {
    return (
      <PageTransition>
        <Page>
          <Container>
            <Back to="/research">Back to Research</Back>
            <Title>Project not found</Title>
          </Container>
        </Page>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Page>
        <Container>
          <Back to="/research">Back to Research</Back>
          <Thumbnail>{item.title} thumbnail</Thumbnail>
          <div>
            <Title>{item.title}</Title>
            <Year>{item.year}</Year>
          </div>
          <Description>{item.fullDesc}</Description>
          <TagList>
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
          {item.links.length > 0 && (
            <Links>
              {item.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </Links>
          )}
        </Container>
      </Page>
    </PageTransition>
  );
}

export default ResearchDetail;
