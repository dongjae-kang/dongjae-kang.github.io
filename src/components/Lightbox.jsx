import { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  align-items: stretch;
  width: ${({ $hasInfo }) => ($hasInfo ? '92vw' : 'auto')};
  max-width: 95vw;
  max-height: 90vh;
  cursor: default;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: auto;
    gap: 16px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  flex: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;

  @media (max-width: 768px) {
    max-width: 90vw;
    max-height: 60vh;
  }
`;

const Video = styled.video`
  max-width: 100%;
  max-height: 85vh;
  border-radius: 4px;

  @media (max-width: 768px) {
    max-width: 90vw;
    max-height: 60vh;
  }
`;

const InfoPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90vw;
    flex: none;
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

const InfoDescription = styled.p`
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.8rem;
  line-height: 1.5;
`;

const InfoPoster = styled.img`
  width: 100%;
  border-radius: 3px;
  object-fit: contain;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 3px;
  overflow: hidden;

  .leaflet-container {
    width: 100%;
    height: 100%;
    background: #f0ede8;
  }

  @media (max-width: 768px) {
    display: none;
  }
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

const ThumbnailStrip = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  max-width: 80vw;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 3px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  border: 2px solid ${({ $active }) => ($active ? 'rgba(196, 149, 106, 0.8)' : 'transparent')};
  transition: opacity 0.15s ease, border-color 0.15s ease;
  flex-shrink: 0;

  &:hover {
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  }
`;

const ThumbnailVideo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 3px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  border: 2px solid ${({ $active }) => ($active ? 'rgba(196, 149, 106, 0.8)' : 'transparent')};
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.7rem;
  flex-shrink: 0;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  }
`;

function Lightbox({ images, index, onClose, onPrev, onNext, onGoTo, programInfo }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

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

  useEffect(() => {
    if (!programInfo?.mapCoords || !mapRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    const [lat, lng] = programInfo.mapCoords;
    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 14,
      zoomControl: true,
      attributionControl: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);
    L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: '#4A90D9',
      color: '#fff',
      weight: 2,
      fillOpacity: 0.9,
    }).addTo(map).bindTooltip(programInfo.title, {
      permanent: true,
      direction: 'top',
      offset: [0, -10],
      className: 'map-label',
    });
    mapInstanceRef.current = map;
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [programInfo?.mapCoords, programInfo?.title]);

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

      <ContentWrap $hasInfo={hasInfo} onClick={(e) => e.stopPropagation()}>
        <ImageContainer>
          {isVideo ? (
            <Video src={src} controls autoPlay muted playsInline />
          ) : (
            <Image src={src} alt={`Image ${index + 1}`} />
          )}
        </ImageContainer>

        {hasInfo && (
          <InfoPanel>
            {programInfo.poster && <InfoPoster src={programInfo.poster} alt={programInfo.title || ''} />}
            {programInfo.title && <InfoTitle>{programInfo.title}</InfoTitle>}
            {programInfo.date && <InfoDate>{programInfo.date}</InfoDate>}
            {programInfo.location && <InfoDate>{programInfo.location}</InfoDate>}
            {programInfo.description && (
              <>
                <InfoDivider />
                <InfoDescription>{programInfo.description}</InfoDescription>
              </>
            )}
            {programInfo.program && (
              <>
                <InfoDivider />
                <PieceList>
                  {programInfo.program.pieces.map((piece) => (
                    <Piece key={piece}>{piece}</Piece>
                  ))}
                </PieceList>
                <InfoDivider />
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
            {programInfo.session && (
              <>
                <InfoDivider />
                <PieceList>
                  <Piece>{programInfo.session}</Piece>
                </PieceList>
              </>
            )}
            {programInfo.mapCoords && (
              <>
                <InfoDivider />
                <MapContainer ref={mapRef} />
              </>
            )}
            {programInfo.mapUrl && (
              <>
                {!programInfo.mapCoords && <InfoDivider />}
                <InfoLink href={programInfo.mapUrl} target="_blank" rel="noopener noreferrer">
                  View on Google Maps
                </InfoLink>
              </>
            )}
            {programInfo.link && (
              <>
                <InfoDivider />
                <InfoLink href={programInfo.link} target="_blank" rel="noopener noreferrer">
                  {programInfo.linkLabel || 'Program details'}
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
        <ThumbnailStrip onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => {
            const thumbSrc = typeof img === 'string' ? img : img?.src;
            const isVid = typeof img !== 'string' && img?.type === 'video';
            if (isVid) {
              return (
                <ThumbnailVideo
                  key={i}
                  $active={i === index}
                  onClick={() => onGoTo?.(i)}
                >
                  ▶
                </ThumbnailVideo>
              );
            }
            return (
              <Thumbnail
                key={i}
                src={thumbSrc}
                alt={`Thumbnail ${i + 1}`}
                $active={i === index}
                onClick={() => onGoTo?.(i)}
              />
            );
          })}
        </ThumbnailStrip>
      )}
    </Overlay>
  );
}

export default Lightbox;
