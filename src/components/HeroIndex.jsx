/* Concept C (review only): no graph. The five themes become one quiet line of words under the
   tagline, and every piece of work is a small picture beneath it. Pointing at a theme lights the
   work that belongs to it; pointing at a picture lights its themes. Static, no animation. */
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';
import { research } from '../data/research';
import { activities, communityEvents } from '../data/activities';

const imageById = new Map([
  ...research.map((item) => [item.id, item.thumbnail]),
  ...[...activities, ...communityEvents].map((item) => [item.id, item.media?.cover || item.media?.photos?.[0]]),
].filter(([, image]) => Boolean(image)));

const ORDER = [
  'prism-news', 'healthy-conversations', 'un-decision-tracing', 'misinfo-interviews', 'multi-agent-sim', 'crisisnews',
  'chi-2025', 'un-ga-hlw', 'un-youth-forum', 'student-council', 'valedictorian', 'kgsa-career', 'upenn-mixer', 'hyc-mixer', 'columbia-ai-club',
];

const Wrap = styled.div`
  width: min(960px, calc(100vw - 64px));
  margin: 0 auto 18px;
  display: grid;
  gap: 26px;
  justify-items: center;
`;

const Themes = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 0;
  font-size: 0.98rem;
  color: #2b2a2a;
`;

const Theme = styled.span`
  padding: 2px 2px;
  cursor: default;
  color: ${({ $dim }) => ($dim ? 'rgba(43, 42, 42, 0.35)' : '#1B3D2F')};
  background: ${({ $on }) => ($on ? 'linear-gradient(transparent 62%, rgba(74, 122, 94, 0.22) 62%)' : 'none')};
  transition: color 0.15s ease;
`;

const Dot = styled.span`
  margin: 0 14px;
  color: rgba(43, 42, 42, 0.3);
`;

const Strip = styled.div`
  display: grid;
  grid-template-columns: repeat(15, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
`;

const Tile = styled.button`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 2px;
  overflow: hidden;
  background: ${({ $type }) => ($type === 'research' ? 'rgba(45, 90, 61, 0.12)' : 'rgba(196, 149, 106, 0.16)')};
  opacity: ${({ $dim }) => ($dim ? 0.18 : 1)};
  transition: opacity 0.15s ease;
  cursor: ${({ $link }) => ($link ? 'pointer' : 'default')};
  border-bottom: 2px solid ${({ $type }) => ($type === 'research' ? '#2D5A3D' : '#C4956A')};

  img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.85); }
  span {
    position: absolute; inset: 0; display: grid; place-items: center; padding: 4px;
    font-size: 0.56rem; line-height: 1.2; color: #1B3D2F; text-align: center;
  }
`;

const Caption = styled.p`
  min-height: 1.4em;
  font-size: 0.82rem;
  color: rgba(43, 42, 42, 0.62);
`;

export default function HeroIndex() {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState(null);
  const [activeWork, setActiveWork] = useState(null);

  const { themes, works, themesOf } = useMemo(() => {
    const byId = new Map(graphData.nodes.map((n) => [n.id, n]));
    const map = new Map();
    graphData.edges.forEach(({ source, target }) => {
      const [work, theme] = byId.get(source)?.type === 'theme' ? [target, source] : [source, target];
      if (byId.get(theme)?.type !== 'theme' || byId.get(work)?.type === 'theme') return;
      if (!map.has(work)) map.set(work, new Set());
      map.get(work).add(theme);
    });
    return {
      themes: graphData.nodes.filter((n) => n.type === 'theme'),
      works: ORDER.map((id) => byId.get(id)).filter(Boolean),
      themesOf: map,
    };
  }, []);

  const workLit = (w) => {
    if (activeWork) return activeWork.id === w.id;
    if (activeTheme) return themesOf.get(w.id)?.has(activeTheme);
    return true;
  };
  const themeLit = (t) => {
    if (activeWork) return themesOf.get(activeWork.id)?.has(t.id);
    if (activeTheme) return activeTheme === t.id;
    return true;
  };
  const anyActive = Boolean(activeWork || activeTheme);

  return (
    <Wrap>
      <Themes>
        {themes.map((t, i) => [
          i > 0 && <Dot key={`dot-${t.id}`} aria-hidden="true">·</Dot>,
          <Theme
            key={t.id}
            $on={anyActive && themeLit(t)}
            $dim={anyActive && !themeLit(t)}
            onMouseEnter={() => setActiveTheme(t.id)}
            onMouseLeave={() => setActiveTheme(null)}
          >
            {t.label}
          </Theme>,
        ])}
      </Themes>
      <Strip>
        {works.map((w) => {
          const image = imageById.get(w.id);
          return (
            <Tile
              key={w.id}
              type="button"
              $type={w.type}
              $dim={anyActive && !workLit(w)}
              $link={Boolean(w.url)}
              onMouseEnter={() => setActiveWork(w)}
              onMouseLeave={() => setActiveWork(null)}
              onClick={() => w.url && navigate(w.url)}
              aria-label={w.label}
            >
              {image ? <img src={image} alt="" /> : <span>{w.label}</span>}
            </Tile>
          );
        })}
      </Strip>
      <Caption>{activeWork ? activeWork.label : ' '}</Caption>
    </Wrap>
  );
}
