import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';

const drift = keyframes`
  0%, 100% {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(var(--drift-x), var(--drift-y));
  }
`;

const GraphWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.graphMax};
  height: min(50vh, 540px);
  min-height: 380px;
  padding: 20px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(245, 240, 232, 0.12);
  background:
    radial-gradient(circle at 18% 26%, rgba(154, 184, 158, 0.18), transparent 34%),
    radial-gradient(circle at 50% 50%, rgba(196, 149, 106, 0.1), transparent 32%),
    radial-gradient(circle at 84% 20%, rgba(92, 61, 46, 0.22), transparent 34%),
    radial-gradient(circle at 30% 80%, rgba(92, 61, 46, 0.16), transparent 32%),
    linear-gradient(180deg, rgba(13, 26, 20, 0.14), rgba(13, 26, 20, 0.02));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 24px 60px rgba(0, 0, 0, 0.16);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 42vh;
    min-height: 320px;
    padding: 16px;
  }
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;

  .node-drift {
    animation: ${drift} var(--drift-duration) ease-in-out var(--drift-delay) infinite;
    transform-box: fill-box;
    transform-origin: center;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: ${({ $y }) => `${$y}px`};
  left: ${({ $x }) => `${$x}px`};
  transform: translate(12px, -12px);
  pointer-events: none;
  z-index: 3;
  padding: 8px 10px;
  border-radius: 4px;
  background: rgba(13, 26, 20, 0.92);
  border: 1px solid rgba(245, 240, 232, 0.12);
  color: ${({ theme }) => theme.colors.home.text};
  font-size: 0.78rem;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.15s ease;
`;

const poleConfig = {
  research: {
    label: 'Research',
    textFill: 'rgba(245, 240, 232, 0.22)',
    desktop: { x: 0.25, y: 0.42, glowRadius: 208 },
    mobile: { x: 0.24, y: 0.39, glowRadius: 122 },
  },
  engagement: {
    label: 'Engagement',
    textFill: 'rgba(196, 149, 106, 0.2)',
    desktop: { x: 0.75, y: 0.42, glowRadius: 208 },
    mobile: { x: 0.76, y: 0.39, glowRadius: 122 },
  },
  themes: {
    label: 'Themes',
    textFill: 'rgba(245, 240, 232, 0.14)',
    desktop: { x: 0.5, y: 0.5, glowRadius: 176 },
    mobile: { x: 0.5, y: 0.48, glowRadius: 118 },
  },
};

const nodeStyle = {
  theme: {
    radius: 14,
    fill: 'rgba(196, 149, 106, 0.6)',
    stroke: 'rgba(245, 240, 232, 0.08)',
    labelSize: 13,
    labelWeight: 600,
    labelOpacity: 0.95,
  },
  research: {
    radius: 8.5,
    fill: '#F5F0E8',
    stroke: 'rgba(245, 240, 232, 0.1)',
    labelSize: 12,
    labelWeight: 400,
    labelOpacity: 0.9,
  },
  activity: {
    radius: 7.5,
    fill: 'rgba(245, 240, 232, 0.72)',
    stroke: 'rgba(245, 240, 232, 0.08)',
    labelSize: 11,
    labelWeight: 400,
    labelOpacity: 0.85,
  },
  institution: {
    radius: 5,
    fill: '#6B746A',
    stroke: 'rgba(245, 240, 232, 0.04)',
    labelSize: 10,
    labelWeight: 400,
    labelOpacity: 0.7,
  },
};

const desktopPositions = {
  crisisnews: { x: 0.18, y: 0.26, pole: 'research' },
  prism: { x: 0.24, y: 0.14, pole: 'research' },
  'beyond-removal': { x: 0.33, y: 0.14, pole: 'research' },
  'multi-agent-sim': { x: 0.39, y: 0.26, pole: 'research' },
  misinformation: { x: 0.48, y: 0.18, pole: 'themes' },
  'platform-governance': { x: 0.52, y: 0.34, pole: 'themes' },
  'content-moderation': { x: 0.47, y: 0.5, pole: 'themes' },
  'ai-policy': { x: 0.53, y: 0.66, pole: 'themes' },
  'participatory-governance': { x: 0.5, y: 0.82, pole: 'themes' },
  'chi-2025': { x: 0.63, y: 0.24, pole: 'engagement' },
  'un-ga-hlw': { x: 0.82, y: 0.34, pole: 'engagement' },
  'student-council': { x: 0.74, y: 0.56, pole: 'engagement' },
  valedictorian: { x: 0.69, y: 0.74, pole: 'engagement' },
  'participatory-budget': { x: 0.83, y: 0.74, pole: 'engagement' },
  kaist: { x: 0.28, y: 0.9, pole: 'research' },
  'columbia-sipa': { x: 0.72, y: 0.9, pole: 'engagement' },
};

const mobilePositions = {
  crisisnews: { x: 0.12, y: 0.21, pole: 'research' },
  prism: { x: 0.26, y: 0.12, pole: 'research' },
  'beyond-removal': { x: 0.41, y: 0.12, pole: 'research' },
  'multi-agent-sim': { x: 0.47, y: 0.26, pole: 'research' },
  misinformation: { x: 0.44, y: 0.24, pole: 'themes' },
  'platform-governance': { x: 0.5, y: 0.4, pole: 'themes' },
  'content-moderation': { x: 0.16, y: 0.5, pole: 'themes' },
  'ai-policy': { x: 0.46, y: 0.68, pole: 'themes' },
  'participatory-governance': { x: 0.74, y: 0.2, pole: 'themes' },
  'chi-2025': { x: 0.25, y: 0.33, pole: 'engagement' },
  'un-ga-hlw': { x: 0.91, y: 0.48, pole: 'engagement' },
  'student-council': { x: 0.7, y: 0.57, pole: 'engagement' },
  valedictorian: { x: 0.56, y: 0.9, pole: 'engagement' },
  'participatory-budget': { x: 0.76, y: 0.36, pole: 'engagement' },
  kaist: { x: 0.43, y: 0.95, pole: 'research' },
  'columbia-sipa': { x: 0.69, y: 0.95, pole: 'engagement' },
};

function hashCode(value) {
  return [...value].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
}

function driftConfig(id) {
  const hash = Math.abs(hashCode(id));
  const driftX = ((hash % 5) - 2) || 1;
  const driftY = (((Math.floor(hash / 5) % 5) - 2) || -1);
  return {
    x: `${driftX}px`,
    y: `${driftY}px`,
    duration: `${8 + (hash % 5)}s`,
    delay: `${-(hash % 7)}s`,
  };
}

function buildAdjacency(nodes, edges) {
  const adjacency = new Map(nodes.map((node) => [node.id, []]));
  edges.forEach((edge) => {
    adjacency.get(edge.source.id)?.push(edge.target.id);
    adjacency.get(edge.target.id)?.push(edge.source.id);
  });
  return adjacency;
}

function wrapLabel(label, maxChars) {
  const words = label.split(' ');
  const lines = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
      return;
    }
    current = next;
  });

  if (current) lines.push(current);
  return lines.slice(0, 2);
}

function buildLayout(baseNodes, baseEdges, width, height, isMobile) {
  const lookup = isMobile ? mobilePositions : desktopPositions;
  const nodes = baseNodes
    .filter((node) => lookup[node.id])
    .map((node) => {
      const placement = lookup[node.id];
      return {
        ...node,
        pole: placement.pole,
        x: width * placement.x,
        y: height * placement.y,
        drift: driftConfig(node.id),
      };
    });

  const nodesById = new Map(nodes.map((node) => [node.id, node]));
  const edges = baseEdges
    .filter((edge) => nodesById.has(edge.source) && nodesById.has(edge.target))
    .map((edge) => ({
      source: nodesById.get(edge.source),
      target: nodesById.get(edge.target),
    }));

  return { nodes, edges, adjacency: buildAdjacency(nodes, edges) };
}

function edgePath(edge) {
  const dx = edge.target.x - edge.source.x;
  const dy = edge.target.y - edge.source.y;
  const length = Math.hypot(dx, dy) || 1;
  const midX = (edge.source.x + edge.target.x) / 2;
  const midY = (edge.source.y + edge.target.y) / 2;
  const normalX = -dy / length;
  const normalY = dx / length;
  const hash = Math.abs(hashCode(`${edge.source.id}-${edge.target.id}`));
  const direction = hash % 2 === 0 ? 1 : -1;
  const curvature = Math.min(42, length * 0.16) * direction;
  const cx = midX + normalX * curvature;
  const cy = midY + normalY * curvature;
  return `M${edge.source.x},${edge.source.y} Q${cx},${cy} ${edge.target.x},${edge.target.y}`;
}

function poleCenter(key, width, height, isMobile) {
  const config = poleConfig[key][isMobile ? 'mobile' : 'desktop'];
  return {
    x: width * config.x,
    y: height * config.y,
    glowRadius: config.glowRadius,
  };
}

function Graph() {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);
  const navigate = useNavigate();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '' });
  const isMobile = size.width > 0 && size.width < 768;

  const data = useMemo(
    () => ({
      nodes: graphData.nodes.map((node) => ({ ...node })),
      edges: graphData.edges.map((edge) => ({ ...edge })),
    }),
    []
  );

  useEffect(() => {
    if (!wrapRef.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: width - 40, height: height - 40 });
    });

    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !size.width || !size.height) return undefined;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { nodes, edges } = buildLayout(data.nodes, data.edges, size.width, size.height, isMobile);
    const linkedById = new Set();
    edges.forEach((edge) => {
      linkedById.add(`${edge.source.id}-${edge.target.id}`);
      linkedById.add(`${edge.target.id}-${edge.source.id}`);
    });

    const isConnected = (a, b) => a.id === b.id || linkedById.has(`${a.id}-${b.id}`);

    const root = svg.append('g').attr('transform', 'translate(20, 20)');
    const defs = root.append('defs');

    [
      { id: 'pole-research', stops: [{ o: '0%', c: 'rgba(129, 170, 144, 0.16)' }, { o: '100%', c: 'rgba(129, 170, 144, 0)' }] },
      { id: 'pole-themes', stops: [{ o: '0%', c: 'rgba(196, 149, 106, 0.13)' }, { o: '100%', c: 'rgba(196, 149, 106, 0)' }] },
      { id: 'pole-engagement', stops: [{ o: '0%', c: 'rgba(92, 61, 46, 0.18)' }, { o: '100%', c: 'rgba(92, 61, 46, 0)' }] },
    ].forEach((gradient) => {
      defs
        .append('radialGradient')
        .attr('id', gradient.id)
        .selectAll('stop')
        .data(gradient.stops)
        .join('stop')
        .attr('offset', (stop) => stop.o)
        .attr('stop-color', (stop) => stop.c);
    });

    const regionLayer = root.append('g');
    const titleLayer = root.append('g');
    const linkLayer = root.append('g');
    const nodeLayer = root.append('g');

    const poleData = [
      { key: 'research', ...poleCenter('research', size.width, size.height, isMobile) },
      { key: 'themes', ...poleCenter('themes', size.width, size.height, isMobile) },
      { key: 'engagement', ...poleCenter('engagement', size.width, size.height, isMobile) },
    ];

    regionLayer
      .selectAll('circle')
      .data(poleData)
      .join('circle')
      .attr('cx', (entry) => entry.x)
      .attr('cy', (entry) => entry.y)
      .attr('r', (entry) => entry.glowRadius)
      .attr('fill', (entry) => `url(#pole-${entry.key})`);

    if (!isMobile) {
      titleLayer
        .selectAll('text.pole-label')
        .data(poleData.filter((entry) => entry.key !== 'themes'))
        .join('text')
        .attr('class', 'pole-label')
        .attr('x', (entry) => entry.x)
        .attr('y', (entry) => entry.y + 8)
        .attr('text-anchor', 'middle')
        .attr('fill', (entry) => poleConfig[entry.key].textFill)
        .attr('font-family', 'Cormorant Garamond, serif')
        .attr('font-size', 50)
        .attr('font-weight', 500)
        .text((entry) => poleConfig[entry.key].label);

      titleLayer
        .append('text')
        .attr('x', size.width * 0.5)
        .attr('y', size.height * 0.085)
        .attr('text-anchor', 'middle')
        .attr('fill', 'rgba(245, 240, 232, 0.56)')
        .attr('font-family', 'PP Neue Montreal, Inter, sans-serif')
        .attr('font-size', 11)
        .attr('letter-spacing', '0.14em')
        .attr('text-transform', 'uppercase')
        .text('Themes');
    }

    const link = linkLayer
      .selectAll('path')
      .data(edges)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(245, 240, 232, 0.18)')
      .attr('stroke-width', 1.05)
      .attr('stroke-linecap', 'round')
      .attr('stroke-opacity', 0.15);

    const nodeShell = nodeLayer
      .selectAll('g.node-shell')
      .data(nodes)
      .join('g')
      .attr('class', 'node-shell')
      .style('cursor', (node) => (node.url ? 'pointer' : 'grab'));

    const driftLayer = nodeShell
      .append('g')
      .attr('class', 'node-drift')
      .style('--drift-x', (node) => node.drift.x)
      .style('--drift-y', (node) => node.drift.y)
      .style('--drift-duration', (node) => node.drift.duration)
      .style('--drift-delay', (node) => node.drift.delay);

    const circles = driftLayer
      .append('circle')
      .attr('r', (node) => (isMobile ? nodeStyle[node.type].radius - (node.type === 'theme' ? 1 : 0.7) : nodeStyle[node.type].radius))
      .attr('fill', (node) => nodeStyle[node.type].fill)
      .attr('stroke', (node) => nodeStyle[node.type].stroke)
      .attr('stroke-width', 1);

    const labels = driftLayer
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#F5F0E8')
      .attr('stroke', 'rgba(13, 26, 20, 0.58)')
      .attr('stroke-width', 0.42)
      .attr('paint-order', 'stroke')
      .attr('font-family', 'PP Neue Montreal, Inter, sans-serif')
      .attr('font-size', (node) => (isMobile ? Math.max(nodeStyle[node.type].labelSize - 1.4, 9.5) : nodeStyle[node.type].labelSize))
      .attr('font-weight', (node) => nodeStyle[node.type].labelWeight)
      .attr('opacity', (node) => nodeStyle[node.type].labelOpacity)
      .attr('pointer-events', 'none');

    labels.each(function renderLabel(node) {
      const text = d3.select(this);
      const lines = wrapLabel(node.label, isMobile ? 13 : 16);
      const baseY = (isMobile ? nodeStyle[node.type].radius - (node.type === 'theme' ? 1 : 0.7) : nodeStyle[node.type].radius) + (node.type === 'theme' ? 17 : 15);

      lines.forEach((line, index) => {
        text
          .append('tspan')
          .text(line)
          .attr('x', 0)
          .attr('y', index === 0 ? baseY : null)
          .attr('dy', index === 0 ? 0 : 12);
      });
    });

    const render = () => {
      link.attr('d', edgePath);
      nodeShell.attr('transform', (node) => `translate(${node.x},${node.y})`);
    };

    const clearActiveState = () => {
      circles
        .attr('opacity', (node) => (node.type === 'institution' ? 0.86 : 1))
        .attr('r', (node) => (isMobile ? nodeStyle[node.type].radius - (node.type === 'theme' ? 1 : 0.7) : nodeStyle[node.type].radius));
      labels.attr('opacity', (node) => nodeStyle[node.type].labelOpacity);
      nodeShell.attr('opacity', 1);
      link.attr('stroke-opacity', 0.15).attr('stroke-width', 1.05);
      setTooltip((prev) => ({ ...prev, visible: false }));
      render();
    };

    const setActiveState = (activeNode) => {
      nodeShell.filter((node) => node.id === activeNode.id).raise();

      circles
        .attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.18))
        .attr('r', (node) => {
          const base = isMobile ? nodeStyle[node.type].radius - (node.type === 'theme' ? 1 : 0.7) : nodeStyle[node.type].radius;
          return node.id === activeNode.id ? base * 1.12 : base;
        });

      labels.attr('opacity', (node) => {
        if (node.id === activeNode.id || isConnected(activeNode, node)) return 1;
        return 0.08;
      });

      link
        .attr('stroke-opacity', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 0.45 : 0.05
        )
        .attr('stroke-width', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 1.35 : 0.9
        );

      nodeShell.attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.2));
    };

    const updateTooltip = (event, node) => {
      const bounds = wrapRef.current?.getBoundingClientRect();
      if (!bounds) return;

      setTooltip({
        visible: true,
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        label: node.label,
      });
    };

    nodeShell
      .on('mouseenter', function handleEnter(event, node) {
        setActiveState(node);
        updateTooltip(event, node);
      })
      .on('mousemove', function handleMove(event, node) {
        updateTooltip(event, node);
      })
      .on('mouseleave', function handleLeave() {
        clearActiveState();
      })
      .on('click', function handleClick(event, node) {
        if (isMobile) {
          setActiveState(node);
          updateTooltip(event, node);
        }

        if (node.url) navigate(node.url);
      });

    nodeShell.call(
      d3
        .drag()
        .on('drag', (event, node) => {
          node.x = Math.max(24, Math.min(size.width - 24, event.x));
          node.y = Math.max(24, Math.min(size.height - 24, event.y));
          render();
        })
        .on('end', (event, node) => {
          node.x = event.x;
          node.y = event.y;
        })
    );

    render();
    clearActiveState();

    return () => {
      svg.selectAll('*').remove();
    };
  }, [data.edges, data.nodes, isMobile, navigate, size.height, size.width]);

  return (
    <GraphWrap ref={wrapRef}>
      <StyledSvg ref={svgRef} role="img" aria-label="Interactive knowledge map" />
      <Tooltip $visible={tooltip.visible} $x={tooltip.x} $y={tooltip.y}>
        {tooltip.label}
      </Tooltip>
    </GraphWrap>
  );
}

export default Graph;
