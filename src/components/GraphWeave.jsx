/* Concept A (review only): the five questions are threads running through time; each piece of
   work is a stitch on the thread or threads it belongs to. Static, no animation. */
import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';
import { research } from '../data/research';
import { activities, communityEvents } from '../data/activities';

const previewImageById = new Map([
  ...research.map((item) => [item.id, item.thumbnail]),
  ...[...activities, ...communityEvents].map((item) => [item.id, item.media?.cover || item.media?.photos?.[0]]),
].filter(([, image]) => Boolean(image)));

/* When each piece of work happened (start of a term, or the event day). */
const WHEN = {
  'student-council': '2023-01-15',
  crisisnews: '2024-09-01',
  'chi-2025': '2025-04-26',
  'columbia-ai-club': '2025-09-01',
  'un-ga-hlw': '2025-09-22',
  'hyc-mixer': '2025-10-11',
  'upenn-mixer': '2025-11-15',
  valedictorian: '2026-02-20',
  'kgsa-career': '2026-03-28',
  'misinfo-interviews': '2026-04-13',
  'un-youth-forum': '2026-04-15',
  'multi-agent-sim': '2026-05-12',
  'prism-news': '2026-07-16',
  'un-decision-tracing': '2026-08-15',
  'healthy-conversations': '2026-10-01',
};

const THREAD_ORDER = [
  'how-people-connect',
  'understanding-each-other',
  'deciding-together',
  'judging-what-to-believe',
  'technology-and-ai',
];

/* Most of the work is from the last two years, so the years are not drawn to scale:
   2022-2024 share the first fifth of the width, 2025 and 2026 split the rest. */
const SEGMENTS = [
  { from: '2022-09-01', to: '2025-01-01', start: 0, end: 0.2 },
  { from: '2025-01-01', to: '2026-01-01', start: 0.2, end: 0.55 },
  { from: '2026-01-01', to: '2026-12-31', start: 0.55, end: 1 },
];

function timeFraction(dateString) {
  const t = new Date(dateString).getTime();
  const seg = SEGMENTS.find((s) => t < new Date(s.to).getTime()) || SEGMENTS[SEGMENTS.length - 1];
  const a = new Date(seg.from).getTime();
  const b = new Date(seg.to).getTime();
  return seg.start + ((t - a) / (b - a)) * (seg.end - seg.start);
}

const Wrap = styled.div`
  position: relative;
  width: min(960px, calc(100vw - 64px));
  height: min(54vh, 520px);
  min-height: 390px;
  margin: 0 auto;
  overflow: visible;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const Preview = styled.div`
  position: fixed;
  top: ${({ $y }) => `${$y}px`};
  left: ${({ $x }) => `${$x}px`};
  width: 280px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid rgba(27, 61, 47, 0.14);
  background: ${({ $image }) => ($image ? '#d8ddd8' : '#f7f7f5')};
  box-shadow: 0 12px 36px rgba(27, 61, 47, 0.14);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 40;
  ${({ $image }) => ($image ? 'aspect-ratio: 16 / 10;' : 'padding: 14px 16px;')}
  img { display: block; width: 100%; height: 100%; object-fit: cover; }
  p { margin: 0; font-size: 0.8rem; line-height: 1.55; text-align: left; color: #2b2a2a; }
`;

const GREEN = '#1B3D2F';
const GREEN_MID = '#2D5A3D';
const COPPER = '#C4956A';

export default function GraphWeave({ headingFont }) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const navigate = useNavigate();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [preview, setPreview] = useState({ visible: false, x: 0, y: 0, image: null, note: null });

  const model = useMemo(() => {
    const byId = new Map(graphData.nodes.map((n) => [n.id, n]));
    const themesOf = new Map();
    graphData.edges.forEach(({ source, target }) => {
      const [work, theme] = byId.get(source)?.type === 'theme' ? [target, source] : [source, target];
      if (byId.get(theme)?.type !== 'theme' || byId.get(work)?.type === 'theme') return;
      if (!themesOf.has(work)) themesOf.set(work, []);
      themesOf.get(work).push(theme);
    });
    const works = graphData.nodes
      .filter((n) => n.type === 'research' || n.type === 'engagement')
      .map((n) => ({
        ...n,
        when: WHEN[n.id],
        threads: (themesOf.get(n.id) || []).sort((a, b) => THREAD_ORDER.indexOf(a) - THREAD_ORDER.indexOf(b)),
      }))
      .filter((n) => n.when && n.threads.length);
    return { works, themes: THREAD_ORDER.map((id) => byId.get(id)) };
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return undefined;
    const ro = new ResizeObserver(([e]) => setSize({ width: e.contentRect.width, height: e.contentRect.height }));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !size.width) return;
    const { width, height } = size;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const labelCol = 178;
    const x0 = labelCol + 18;
    const x1 = width - 28;
    const top = 46;
    const bottom = height - 54;
    const threadY = new Map(THREAD_ORDER.map((id, i) => [id, top + ((bottom - top) * i) / (THREAD_ORDER.length - 1)]));
    const xOf = (date) => x0 + (x1 - x0) * timeFraction(date);

    /* Stitches that would sit on top of each other move apart along time. */
    const stitches = model.works
      .map((w) => {
        const ys = w.threads.map((t) => threadY.get(t));
        return { ...w, x: xOf(w.when), yTop: Math.min(...ys), yBottom: Math.max(...ys), ys };
      })
      .sort((a, b) => a.x - b.x);
    stitches.forEach((s, i) => {
      for (let j = 0; j < i; j += 1) {
        const p = stitches[j];
        const overlap = s.yTop <= p.yBottom + 2 && p.yTop <= s.yBottom + 2;
        if (overlap && s.x - p.x < 15) s.x = p.x + 15;
      }
    });

    const root = svg.append('g');

    /* Year marks under the threads. */
    const years = [
      { label: '2022–24', date: '2022-09-01' },
      { label: '2025', date: '2025-01-01' },
      { label: '2026', date: '2026-01-01' },
    ];
    const yearLayer = root.append('g');
    years.forEach(({ label, date }) => {
      const x = xOf(date);
      yearLayer.append('line').attr('x1', x).attr('x2', x).attr('y1', top - 14).attr('y2', bottom + 12)
        .attr('stroke', 'rgba(43, 42, 42, 0.07)').attr('stroke-width', 1);
      yearLayer.append('text').attr('x', x + 5).attr('y', bottom + 30)
        .attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif").attr('font-size', 10.5)
        .attr('letter-spacing', '0.06em').attr('fill', 'rgba(43, 42, 42, 0.38)').text(label);
    });
    yearLayer.append('text').attr('x', x1).attr('y', bottom + 30).attr('text-anchor', 'end')
      .attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif").attr('font-size', 10.5)
      .attr('letter-spacing', '0.06em').attr('fill', 'rgba(43, 42, 42, 0.38)').text('now');

    /* Threads and their names. */
    const threadLayer = root.append('g');
    const threadSel = threadLayer.selectAll('g').data(model.themes).join('g');
    threadSel.append('line')
      .attr('x1', x0 - 6).attr('x2', x1 + 10)
      .attr('y1', (t) => threadY.get(t.id)).attr('y2', (t) => threadY.get(t.id))
      .attr('stroke', GREEN_MID).attr('stroke-width', 1.1).attr('opacity', 0.32);
    threadSel.append('text')
      .attr('x', labelCol).attr('y', (t) => threadY.get(t.id)).attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif")
      .attr('font-size', 13).attr('font-weight', 500).attr('fill', GREEN).attr('opacity', 0.9)
      .text((t) => t.label);

    /* Stitches. */
    const stitchLayer = root.append('g');
    const stitchSel = stitchLayer.selectAll('g').data(stitches).join('g')
      .style('cursor', (s) => (s.url ? 'pointer' : 'default'));
    const colorOf = (s) => (s.type === 'research' ? GREEN_MID : COPPER);
    stitchSel.append('line')
      .attr('x1', (s) => s.x).attr('x2', (s) => s.x).attr('y1', (s) => s.yTop).attr('y2', (s) => s.yBottom)
      .attr('stroke', colorOf).attr('stroke-width', 1.4).attr('opacity', 0.55);
    stitchSel.selectAll('circle').data((s) => s.ys.map((y) => ({ s, y }))).join('circle')
      .attr('cx', (d) => d.s.x).attr('cy', (d) => d.y)
      .attr('r', (d) => (d.s.importance === 'minor' || d.s.importance === 'support' ? 4.2 : 5.2))
      .attr('fill', (d) => colorOf(d.s)).attr('stroke', '#F7F7F5').attr('stroke-width', 1.2);
    /* Wide invisible hit area so thin stitches are easy to hover. */
    stitchSel.append('rect')
      .attr('x', (s) => s.x - 7).attr('y', (s) => s.yTop - 8).attr('width', 14).attr('height', (s) => s.yBottom - s.yTop + 16)
      .attr('fill', 'transparent');

    /* Labels: try above the top stitch, then below the bottom one, then to the right. */
    const labelLayer = root.append('g');
    const placed = [];
    const measure = labelLayer.append('text').attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif").attr('font-size', 10.5);
    const boxesCollide = (a, b) => a.x < b.x + b.w + 4 && b.x < a.x + a.w + 4 && a.y < b.y + b.h + 2 && b.y < a.y + a.h + 2;
    const threadBoxes = [...threadY.values()].map((y) => ({ x: x0, y: y - 1, w: x1 - x0, h: 2 }));
    const dotBoxes = stitches.flatMap((s) => s.ys.map((y) => ({ x: s.x - 6, y: y - 6, w: 12, h: 12 })));
    const lineBoxes = stitches.filter((s) => s.yBottom > s.yTop).map((s) => ({ x: s.x - 2, y: s.yTop, w: 4, h: s.yBottom - s.yTop }));
    stitches.forEach((s) => {
      measure.text(s.label);
      const w = measure.node().getComputedTextLength();
      const h = 11;
      const options = [
        { x: s.x - w / 2, y: s.yTop - 11 - h, anchor: 'middle', tx: s.x, ty: s.yTop - 11 },
        { x: s.x - w / 2, y: s.yBottom + 10, anchor: 'middle', tx: s.x, ty: s.yBottom + 10 + h - 2 },
        { x: s.x + 9, y: s.yTop - 12 - h, anchor: 'start', tx: s.x + 9, ty: s.yTop - 12 },
        { x: s.x - 9 - w, y: s.yTop - 12 - h, anchor: 'end', tx: s.x - 9, ty: s.yTop - 12 },
        { x: s.x + 9, y: s.yBottom + 10, anchor: 'start', tx: s.x + 9, ty: s.yBottom + 10 + h - 2 },
        { x: s.x - 9 - w, y: s.yBottom + 10, anchor: 'end', tx: s.x - 9, ty: s.yBottom + 10 + h - 2 },
      ];
      const choice = options.find((o) => {
        const box = { x: o.x, y: o.y, w, h };
        if (box.x + box.w > width + 20) return false;
        return ![...placed, ...threadBoxes, ...dotBoxes, ...lineBoxes].some((b) => boxesCollide(box, b));
      }) || options[0];
      placed.push({ x: choice.x, y: choice.y, w, h });
      s.label$ = choice;
    });
    measure.remove();
    const labelSel = labelLayer.selectAll('text').data(stitches).join('text')
      .attr('x', (s) => s.label$.tx).attr('y', (s) => s.label$.ty).attr('text-anchor', (s) => s.label$.anchor)
      .attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif").attr('font-size', 10.5)
      .attr('fill', '#2B2A2A').attr('opacity', (s) => (s.importance === 'minor' ? 0.55 : 0.74))
      .style('pointer-events', 'none')
      .text((s) => s.label);

    function highlight(active) {
      stitchSel.attr('opacity', (s) => (!active || s.id === active.id ? 1 : 0.18));
      labelSel.attr('opacity', (s) => {
        if (!active) return s.importance === 'minor' ? 0.55 : 0.74;
        return s.id === active.id ? 1 : 0.14;
      });
      threadSel.attr('opacity', (t) => (!active || active.threads.includes(t.id) ? 1 : 0.28));
    }

    function show(event, s) {
      const image = previewImageById.get(s.id);
      const note = image ? null : s.note;
      if ((!image && !note) || window.innerWidth < 1024) return;
      const h = image ? 175 : 110;
      let x = event.clientX + 24;
      if (x + 280 > window.innerWidth - 20) x = event.clientX - 280 - 24;
      const y = Math.min(window.innerHeight - h - 20, Math.max(20, event.clientY - h / 2));
      setPreview({ visible: true, x, y, image, note });
    }

    stitchSel
      .on('mouseenter', (e, s) => { highlight(s); show(e, s); })
      .on('mousemove', (e, s) => show(e, s))
      .on('mouseleave', () => { highlight(null); setPreview((p) => ({ ...p, visible: false })); })
      .on('click', (_, s) => { if (s.url) navigate(s.url); });
  }, [size, model, navigate, headingFont]);

  return (
    <Wrap ref={wrapRef}>
      <Svg ref={svgRef} viewBox={`0 0 ${size.width || 1000} ${size.height || 520}`}>
        <title>Five questions as threads through time, with each piece of work stitched onto them</title>
      </Svg>
      <Preview $visible={preview.visible} $x={preview.x} $y={preview.y} $image={Boolean(preview.image)} aria-hidden="true">
        {preview.image && <img src={preview.image} alt="" />}
        {!preview.image && preview.note && <p>{preview.note}</p>}
      </Preview>
    </Wrap>
  );
}
