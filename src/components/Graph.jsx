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
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(245, 240, 232, 0.12);
  background:
    radial-gradient(circle at 16% 18%, rgba(154, 184, 158, 0.2), transparent 30%),
    radial-gradient(circle at 84% 20%, rgba(92, 61, 46, 0.18), transparent 32%),
    radial-gradient(circle at 54% 78%, rgba(74, 93, 58, 0.18), transparent 34%),
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
    will-change: transform;
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
  border-radius: 10px;
  background: rgba(13, 26, 20, 0.92);
  border: 1px solid rgba(245, 240, 232, 0.12);
  color: ${({ theme }) => theme.colors.home.text};
  font-size: 0.78rem;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.15s ease;
`;

const semanticClusters = {
  discourse: {
    label: 'Public Discourse',
    lines: ['Public', 'Discourse'],
    desktop: { x: 0.29, y: 0.34, glowRadius: 212, titleDx: 12, titleDy: 12 },
    mobile: { x: 0.28, y: 0.27, glowRadius: 126 },
    glowId: 'cluster-discourse',
    textFill: 'rgba(245, 240, 232, 0.26)',
  },
  governance: {
    label: 'Governance & Service',
    lines: ['Governance', '& Service'],
    desktop: { x: 0.77, y: 0.3, glowRadius: 186, titleDx: -8, titleDy: 6 },
    mobile: { x: 0.72, y: 0.31, glowRadius: 118 },
    glowId: 'cluster-governance',
    textFill: 'rgba(196, 149, 106, 0.28)',
  },
  equity: {
    label: 'AI, Equity & Opportunity',
    lines: ['AI, Equity', '& Opportunity'],
    desktop: { x: 0.5, y: 0.72, glowRadius: 202, titleDx: 0, titleDy: 16 },
    mobile: { x: 0.48, y: 0.68, glowRadius: 130 },
    glowId: 'cluster-equity',
    textFill: 'rgba(245, 240, 232, 0.23)',
  },
};

const clusterByNodeId = {
  crisisnews: 'discourse',
  prism: 'discourse',
  'beyond-removal': 'discourse',
  'multi-agent-sim': 'discourse',
  'chi-2025': 'discourse',
  misinformation: 'discourse',
  'platform-governance': 'discourse',
  'content-moderation': 'discourse',
  'student-council': 'governance',
  'un-ga-hlw': 'governance',
  'participatory-governance': 'governance',
  'ai-policy': 'equity',
  kaist: 'equity',
  'columbia-sipa': 'equity',
  valedictorian: 'equity',
};

const layoutOffsets = {
  discourse: {
    desktop: {
      misinformation: { x: -12, y: 6 },
      'platform-governance': { x: 100, y: 32 },
      'content-moderation': { x: -104, y: 56 },
      crisisnews: { x: -136, y: -74 },
      prism: { x: -56, y: -124 },
      'beyond-removal': { x: 42, y: -122 },
      'multi-agent-sim': { x: 152, y: -76 },
      'chi-2025': { x: -92, y: -12 },
    },
    mobile: {
      misinformation: { x: -4, y: 12 },
      'platform-governance': { x: 52, y: 18 },
      'content-moderation': { x: -54, y: 42 },
      crisisnews: { x: -66, y: -44 },
      prism: { x: -18, y: -72 },
      'beyond-removal': { x: 38, y: -74 },
      'multi-agent-sim': { x: 82, y: -42 },
      'chi-2025': { x: -30, y: -8 },
    },
  },
  governance: {
    desktop: {
      'participatory-governance': { x: 0, y: -4 },
      'student-council': { x: 10, y: 98 },
      'un-ga-hlw': { x: 100, y: 44 },
    },
    mobile: {
      'participatory-governance': { x: 0, y: -8 },
      'student-council': { x: 2, y: 56 },
      'un-ga-hlw': { x: 56, y: 26 },
    },
  },
  equity: {
    desktop: {
      'ai-policy': { x: -40, y: -2 },
      kaist: { x: -54, y: 88 },
      'columbia-sipa': { x: 74, y: 82 },
      valedictorian: { x: -2, y: 124 },
    },
    mobile: {
      'ai-policy': { x: -28, y: -2 },
      kaist: { x: -34, y: 52 },
      'columbia-sipa': { x: 40, y: 50 },
      valedictorian: { x: 2, y: 78 },
    },
  },
};

const nodeStyle = {
  theme: {
    radius: 15,
    fill: '#C4956A',
    stroke: 'rgba(245, 240, 232, 0.14)',
    labelSize: 14,
    labelWeight: 520,
    labelOpacity: 0.98,
  },
  research: {
    radius: 8.5,
    fill: '#F5F0E8',
    stroke: 'rgba(245, 240, 232, 0.12)',
    labelSize: 12,
    labelWeight: 400,
    labelOpacity: 0.92,
  },
  activity: {
    radius: 7.5,
    fill: 'rgba(245, 240, 232, 0.74)',
    stroke: 'rgba(245, 240, 232, 0.08)',
    labelSize: 11,
    labelWeight: 400,
    labelOpacity: 0.86,
  },
  institution: {
    radius: 5,
    fill: 'rgba(130, 138, 129, 0.86)',
    stroke: 'rgba(245, 240, 232, 0.06)',
    labelSize: 10,
    labelWeight: 400,
    labelOpacity: 0.68,
  },
};

function hashCode(value) {
  return [...value].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
}

function driftConfig(id) {
  const hash = Math.abs(hashCode(id));
  const driftX = ((hash % 5) - 2) || 1;
  const driftY = (((Math.floor(hash / 5) % 5) - 2) || -1);
  const duration = 8 + (hash % 5);
  const delay = -(hash % 7);

  return {
    x: `${driftX}px`,
    y: `${driftY}px`,
    duration: `${duration}s`,
    delay: `${delay}s`,
  };
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

function getClusterPosition(clusterId, width, height, isMobile) {
  const config = semanticClusters[clusterId][isMobile ? 'mobile' : 'desktop'];
  return {
    x: width * config.x,
    y: height * config.y,
    glowRadius: config.glowRadius,
    titleDx: config.titleDx ?? 0,
    titleDy: config.titleDy ?? 0,
  };
}

function buildLayout(baseNodes, baseEdges, width, height, isMobile) {
  const nodes = baseNodes
    .map((node) => ({ ...node, cluster: clusterByNodeId[node.id] }))
    .filter((node) => node.cluster);

  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = baseEdges
    .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))
    .map((edge) => ({ ...edge }));

  const clusterCenters = Object.keys(semanticClusters).reduce((acc, clusterId) => {
    acc[clusterId] = getClusterPosition(clusterId, width, height, isMobile);
    return acc;
  }, {});

  nodes.forEach((node) => {
    const center = clusterCenters[node.cluster];
    const offsetMap = layoutOffsets[node.cluster][isMobile ? 'mobile' : 'desktop'];
    const offset = offsetMap[node.id] ?? { x: 0, y: 0 };

    node.clusterCenterX = center.x;
    node.clusterCenterY = center.y;
    node.x = center.x + offset.x;
    node.y = center.y + offset.y;
    node.anchorX = node.x;
    node.anchorY = node.y;
    node.drift = driftConfig(node.id);
  });

  const nodesById = new Map(nodes.map((node) => [node.id, node]));
  const adjacency = new Map(nodes.map((node) => [node.id, []]));

  edges.forEach((edge) => {
    edge.source = nodesById.get(edge.source);
    edge.target = nodesById.get(edge.target);
    adjacency.get(edge.source.id)?.push(edge.target.id);
    adjacency.get(edge.target.id)?.push(edge.source.id);
  });

  return { nodes, edges, nodesById, adjacency, clusterCenters };
}

function labelConfig(node, isMobile) {
  const style = nodeStyle[node.type];
  const maxChars = isMobile
    ? node.type === 'theme'
      ? 14
      : node.type === 'institution'
        ? 12
        : 11
    : node.type === 'theme'
      ? 19
      : node.type === 'research'
        ? 16
        : 13;

  const lines = wrapLabel(node.label, maxChars);
  const fontSize = isMobile ? Math.max(style.labelSize - 2, 8.4) : style.labelSize;
  const labelY = style.radius + (node.type === 'theme' ? 17 : 15);

  return { lines, fontSize, labelY };
}

function edgePath(edge) {
  const source = edge.source;
  const target = edge.target;
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const length = Math.hypot(dx, dy) || 1;
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;
  const normalX = -dy / length;
  const normalY = dx / length;
  const hash = Math.abs(hashCode(`${source.id}-${target.id}`));
  const direction = hash % 2 === 0 ? 1 : -1;
  const curve = Math.min(46, length * 0.16) * direction;
  const controlX = midX + normalX * curve;
  const controlY = midY + normalY * curve;
  return `M${source.x},${source.y} Q${controlX},${controlY} ${target.x},${target.y}`;
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

    const { nodes, edges, clusterCenters } = buildLayout(
      data.nodes,
      data.edges,
      size.width,
      size.height,
      isMobile
    );

    const linkedById = new Set();
    edges.forEach((edge) => {
      linkedById.add(`${edge.source.id}-${edge.target.id}`);
      linkedById.add(`${edge.target.id}-${edge.source.id}`);
    });

    const isConnected = (a, b) => a.id === b.id || linkedById.has(`${a.id}-${b.id}`);

    const root = svg.append('g').attr('transform', 'translate(20, 20)');

    const defs = root.append('defs');
    defs
      .append('radialGradient')
      .attr('id', 'cluster-discourse')
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'rgba(127, 171, 145, 0.24)' },
        { offset: '100%', color: 'rgba(127, 171, 145, 0)' },
      ])
      .join('stop')
      .attr('offset', (stop) => stop.offset)
      .attr('stop-color', (stop) => stop.color);

    defs
      .append('radialGradient')
      .attr('id', 'cluster-governance')
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'rgba(196, 149, 106, 0.22)' },
        { offset: '100%', color: 'rgba(196, 149, 106, 0)' },
      ])
      .join('stop')
      .attr('offset', (stop) => stop.offset)
      .attr('stop-color', (stop) => stop.color);

    defs
      .append('radialGradient')
      .attr('id', 'cluster-equity')
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'rgba(168, 181, 138, 0.2)' },
        { offset: '100%', color: 'rgba(168, 181, 138, 0)' },
      ])
      .join('stop')
      .attr('offset', (stop) => stop.offset)
      .attr('stop-color', (stop) => stop.color);

    const regionLayer = root.append('g');
    const titleLayer = root.append('g');
    const linkLayer = root.append('g');
    const nodeGlowLayer = root.append('g');
    const nodeLayer = root.append('g');

    const regionData = Object.entries(clusterCenters).map(([id, center]) => ({ id, ...center }));

    regionLayer
      .selectAll('circle')
      .data(regionData)
      .join('circle')
      .attr('cx', (entry) => entry.x)
      .attr('cy', (entry) => entry.y)
      .attr('r', (entry) => entry.glowRadius)
      .attr('fill', (entry) => `url(#${semanticClusters[entry.id].glowId})`)
      .attr('opacity', isMobile ? 0.94 : 1);

    if (!isMobile) {
      const titleGroups = titleLayer
        .selectAll('g')
        .data(regionData)
        .join('g')
        .attr(
          'transform',
          (entry) => `translate(${entry.x + entry.titleDx},${entry.y + entry.titleDy})`
        );

      titleGroups
        .selectAll('text')
        .data((entry) => [entry])
        .join('text')
        .attr('text-anchor', 'middle')
        .attr('fill', (entry) => semanticClusters[entry.id].textFill)
        .attr('font-family', 'Cormorant Garamond, serif')
        .attr('font-size', (entry) => (entry.id === 'equity' ? 50 : 52))
        .attr('font-weight', 500)
        .attr('letter-spacing', '0.01em')
        .each(function renderTitle(entry) {
          const text = d3.select(this);
          text.selectAll('*').remove();

          semanticClusters[entry.id].lines.forEach((line, index) => {
            text
              .append('tspan')
              .text(line)
              .attr('x', 0)
              .attr('y', index === 0 ? 0 : null)
              .attr('dy', index === 0 ? 0 : 38);
          });
        });
    }

    const link = linkLayer
      .selectAll('path')
      .data(edges)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(245, 240, 232, 0.18)')
      .attr('stroke-width', 1.1)
      .attr('stroke-linecap', 'round')
      .attr('stroke-opacity', 0.18);

    const nodeGlow = nodeGlowLayer
      .selectAll('circle')
      .data(nodes.filter((node) => node.type === 'theme'))
      .join('circle')
      .attr('fill', 'rgba(196, 149, 106, 0.12)');

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
      .attr('r', (node) => nodeStyle[node.type].radius)
      .attr('fill', (node) => nodeStyle[node.type].fill)
      .attr('stroke', (node) => nodeStyle[node.type].stroke)
      .attr('stroke-width', (node) => (node.type === 'theme' ? 1.2 : 1));

    const labels = driftLayer
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#F5F0E8')
      .attr('stroke', 'rgba(13, 26, 20, 0.58)')
      .attr('stroke-width', 0.42)
      .attr('paint-order', 'stroke')
      .attr('font-family', 'PP Neue Montreal, Inter, sans-serif')
      .attr('font-weight', (node) => nodeStyle[node.type].labelWeight)
      .attr('opacity', (node) => nodeStyle[node.type].labelOpacity)
      .attr('pointer-events', 'none');

    labels.each(function createLabel(node) {
      const text = d3.select(this);
      const { lines, fontSize, labelY } = labelConfig(node, isMobile);
      text.attr('font-size', fontSize);

      lines.forEach((line, index) => {
        text
          .append('tspan')
          .text(line)
          .attr('x', 0)
          .attr('y', index === 0 ? labelY : null)
          .attr('dy', index === 0 ? 0 : fontSize + 1.5);
      });
    });

    const render = () => {
      regionLayer
        .selectAll('circle')
        .attr('cx', (entry) => entry.x)
        .attr('cy', (entry) => entry.y);

      if (!isMobile) {
        titleLayer
          .selectAll('g')
          .attr(
            'transform',
            (entry) => `translate(${entry.x + entry.titleDx},${entry.y + entry.titleDy})`
          );
      }

      nodeGlow
        .attr('cx', (node) => node.x)
        .attr('cy', (node) => node.y)
        .attr('r', (node) => nodeStyle[node.type].radius * 3.6);

      link.attr('d', edgePath);
      nodeShell.attr('transform', (node) => `translate(${node.x},${node.y})`);
    };

    const clearActiveState = () => {
      circles
        .attr('opacity', (node) => (node.type === 'institution' ? 0.82 : 1))
        .attr('r', (node) => nodeStyle[node.type].radius);
      labels.attr('opacity', (node) => nodeStyle[node.type].labelOpacity);
      nodeGlow.attr('opacity', 1);
      link.attr('stroke-opacity', 0.18).attr('stroke-width', 1.1);
      nodeShell.attr('opacity', 1);
      setTooltip((prev) => ({ ...prev, visible: false }));
      render();
    };

    const setActiveState = (activeNode) => {
      nodeShell.filter((node) => node.id === activeNode.id).raise();

      circles
        .attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.2))
        .attr('r', (node) =>
          node.id === activeNode.id ? nodeStyle[node.type].radius * 1.14 : nodeStyle[node.type].radius
        );

      labels.attr('opacity', (node) => {
        if (node.id === activeNode.id || isConnected(activeNode, node)) return 1;
        return node.type === 'institution' ? 0.12 : 0.08;
      });

      nodeGlow.attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.1));
      link
        .attr('stroke-opacity', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 0.48 : 0.06
        )
        .attr('stroke-width', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 1.4 : 0.9
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
          node.anchorX = node.x;
          node.anchorY = node.y;
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
