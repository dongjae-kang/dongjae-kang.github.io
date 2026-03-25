import { useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
`;

const ContentWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  max-width: 95vw;
  max-height: 90vh;
  cursor: default;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Image = styled.img`
  max-width: ${({ $hasInfo }) => ($hasInfo ? '65vw' : '90vw')};
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;

  @media (max-width: 768px) {
    max-width: 90vw;
    max-height: 60vh;
  }
`;

const Video = styled.video`
  max-width: ${({ $hasInfo }) => ($hasInfo ? '65vw' : '90vw')};
  max-height: 85vh;
  border-radius: 4px;

  @media (max-width: 768px) {
    max-width: 90vw;
    max-height: 60vh;
  }
`;

const InfoPanel = styled.div`
  width: 260px;
  flex-shrink: 0;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90vw;
    max-height: 30vh;
    padding: 16px;
  }
`;

const InfoTitle = styled.h3`
  color: rgba(255, 255, 255, 0.92);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.3;
`;

const InfoDate = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
`;

const InfoDivider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const PieceList = styled.div`
  display: grid;
  gap: 8px;
`;

const Piece = styled.span`
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.82rem;
  line-height: 1.4;
`;

const ArtistList = styled.div`
  display: grid;
  gap: 6px;
`;

const Artist = styled.div`
  display: grid;
  gap: 1px;
`;

const ArtistName = styled.span`
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.8rem;
`;

const ArtistRole = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const InfoLink = styled.a`
  color: rgba(196, 149, 106, 0.8);
  font-size: 0.78rem;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.16em;

  &:hover {
    color: rgba(196, 149, 106, 1);
  }
`;

const NavButton = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
  z-index: 10000;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
`;

const PrevButton = styled(NavButton)`
  left: 20px;
`;

const NextButton = styled(NavButton)`
  right: 20px;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10000;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
`;

const Counter = styled.span`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  z-index: 10000;
`;

function Lightbox({ images, index, onClose, onPrev, onNext, programInfo }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const current = images[index];
  const src = typeof current === 'string' ? current : current?.src;
  const isVideo = typeof current !== 'string' && current?.type === 'video';
  const hasInfo = !!programInfo;

  return (
    <Overlay onClick={onClose}>
      {images.length > 1 && onPrev && (
        <PrevButton onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          ‹
        </PrevButton>
      )}

      <ContentWrap onClick={(e) => e.stopPropagation()}>
        <ImageContainer>
          {isVideo ? (
            <Video src={src} controls autoPlay muted playsInline $hasInfo={hasInfo} />
          ) : (
            <Image src={src} alt={`Image ${index + 1}`} $hasInfo={hasInfo} />
          )}
        </ImageContainer>

        {hasInfo && (
          <InfoPanel>
            {programInfo.title && <InfoTitle>{programInfo.title}</InfoTitle>}
            {programInfo.date && <InfoDate>{programInfo.date}</InfoDate>}
            {programInfo.program && (
              <>
                <InfoDivider />
                <PieceList>
                  {programInfo.program.pieces.map((piece) => (
                    <Piece key={piece}>{piece}</Piece>
                  ))}
                </PieceList>
                <ArtistList>
                  {programInfo.program.artists.map((artist) => (
                    <Artist key={artist.name}>
                      <ArtistName>{artist.name}</ArtistName>
                      <ArtistRole>{artist.role}</ArtistRole>
                    </Artist>
                  ))}
                </ArtistList>
              </>
            )}
            {programInfo.link && (
              <>
                <InfoDivider />
                <InfoLink href={programInfo.link} target="_blank" rel="noopener noreferrer">
                  Program details
                </InfoLink>
              </>
            )}
          </InfoPanel>
        )}
      </ContentWrap>

      {images.length > 1 && onNext && (
        <NextButton onClick={(e) => { e.stopPropagation(); onNext(); }}>
          ›
        </NextButton>
      )}

      <CloseButton onClick={onClose}>×</CloseButton>

      {images.length > 1 && (
        <Counter>
          {index + 1} / {images.length}
        </Counter>
      )}
    </Overlay>
  );
}

export default Lightbox;
