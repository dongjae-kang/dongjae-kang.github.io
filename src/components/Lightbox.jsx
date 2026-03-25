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

const ImageContainer = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 85vh;
  cursor: default;
`;

const Image = styled.img`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;
`;

const Video = styled.video`
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 4px;
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

const Caption = styled.p`
  position: fixed;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.88rem;
  text-align: center;
  max-width: 600px;
  z-index: 10000;
`;

function Lightbox({ images, index, onClose, onPrev, onNext }) {
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
  const caption = typeof current === 'string' ? null : current?.caption;
  const isVideo = typeof current !== 'string' && current?.type === 'video';

  return (
    <Overlay onClick={onClose}>
      {images.length > 1 && onPrev && (
        <PrevButton onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          ‹
        </PrevButton>
      )}

      <ImageContainer onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <Video src={src} controls autoPlay muted playsInline />
        ) : (
          <Image src={src} alt={caption || `Image ${index + 1}`} />
        )}
      </ImageContainer>

      {images.length > 1 && onNext && (
        <NextButton onClick={(e) => { e.stopPropagation(); onNext(); }}>
          ›
        </NextButton>
      )}

      <CloseButton onClick={onClose}>×</CloseButton>

      {caption && <Caption>{caption}</Caption>}

      {images.length > 1 && (
        <Counter>
          {index + 1} / {images.length}
        </Counter>
      )}
    </Overlay>
  );
}

export default Lightbox;
