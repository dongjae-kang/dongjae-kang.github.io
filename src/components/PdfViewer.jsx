import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: 12px;
`;

const ViewerWrapper = styled.div`
  width: 100%;
  aspect-ratio: ${({ $portrait }) => ($portrait ? '8.5 / 11' : '16 / 10')};
  max-height: 80vh;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  border-radius: 4px;
  overflow: hidden;
  background: #f5f5f5;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.subpage.accent : theme.colors.subpage.border};
  border-radius: 4px;
  color: ${({ theme, $active }) =>
    $active ? '#fff' : theme.colors.subpage.accent};
  background: ${({ $active }) =>
    $active ? 'rgba(27, 61, 47, 0.85)' : '#fff'};
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.subpage.accent};
  }
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.subpage.border};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.subpage.accent};
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  &:hover {
    border-color: ${({ theme }) => theme.colors.subpage.accent};
  }
`;

function PdfViewer({ pdfs, portrait = true }) {
  const pdfList = Array.isArray(pdfs) ? pdfs : [{ label: 'Document', url: pdfs }];
  const [activeIndex, setActiveIndex] = useState(0);
  const activePdf = pdfList[activeIndex];

  return (
    <Container>
      <ViewerWrapper $portrait={portrait}>
        <Iframe
          src={`${activePdf.url}#toolbar=1&navpanes=0`}
          title={activePdf.label || 'PDF document'}
          loading="lazy"
        />
      </ViewerWrapper>
      <Controls>
        {pdfList.length > 1 &&
          pdfList.map((pdf, i) => (
            <ViewButton
              key={pdf.url}
              $active={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            >
              {pdf.label}
            </ViewButton>
          ))}
        <ExternalLink
          href={activePdf.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in new tab
        </ExternalLink>
      </Controls>
    </Container>
  );
}

export default PdfViewer;
