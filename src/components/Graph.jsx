import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.04);
  }
`;

const GraphWrap = styled.div`
  position: relative;
  width: min(960px, calc(100vw - 64px));
  height: min(54vh, 520px);
  min-height: 390px;
  margin: 0 auto;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(92vw, 520px);
    height: min(45vh, 360px);
    min-height: 320px;
  }
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;

  .theme-pulse {
    animation: ${pulse} var(--pulse-duration) ease-in-out var(--pulse-delay) infinite;
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
  z-index: 2;
  padding: 8px 10px;
  border-radius: 4px;
  background: rgba(27, 61, 47, 0.96);
  color: #f7f7f5;
  font-size: 0.76rem;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.16s ease;
`;

const COLORS = {
  greenDark: '#1B3D2F',
  greenMid: '#2D5A3D',
  greenLight: '#4A7A5E',
  greenPale: '#9AB89E',
  copper: '#C4956A',
  text: '#2B2A2A',
  muted: '#6B6560',
  institution: 'rgba(154, 149, 144, 0.8)',
};

const primaryFlowPairs = new Map([
  ['crisisnews|misinformation', { delay: '0s', duration: '5.3s' }],
  ['prism|platform-governance', { delay: '1.1s', duration: '5.8s' }],
  ['beyond-removal|content-moderation', { delay: '2.4s', duration: '4.9s' }],
  ['multi-agent-sim|ai-policy', { delay: '0.8s', duration: '5.5s' }],
  ['student-council|participatory-governance', { delay: '1.9s', duration: '5.4s' }],
  ['chi-2025|misinformation', { delay: '2.8s', duration: '4.7s' }],
  ['un-ga-hlw|platform-governance', { delay: '0.4s', duration: '5.6s' }],
  ['un-youth-forum|ai-policy', { delay: '1.6s', duration: '5.1s' }],
]);

const themeAuraPalette = {
  misinformation: {
    center: 'rgba(45, 90, 61, 0.2)',
    mid: 'rgba(45, 90, 61, 0.11)',
    outer: 'rgba(45, 90, 61, 0.03)',
    desktopRadius: 82,
    mobileRadius: 62,
  },
  'platform-governance': {
    center: 'rgba(27, 61, 47, 0.18)',
    mid: 'rgba(27, 61, 47, 0.1)',
    outer: 'rgba(27, 61, 47, 0.03)',
    desktopRadius: 82,
    mobileRadius: 62,
  },
  'content-moderation': {
    center: 'rgba(74, 122, 94, 0.2)',
    mid: 'rgba(74, 122, 94, 0.11)',
    outer: 'rgba(74, 122, 94, 0.032)',
    desktopRadius: 84,
    mobileRadius: 64,
  },
  'ai-policy': {
    center: 'rgba(45, 90, 61, 0.17)',
    mid: 'rgba(45, 90, 61, 0.095)',
    outer: 'rgba(45, 90, 61, 0.028)',
    desktopRadius: 80,
    mobileRadius: 60,
  },
  'participatory-governance': {
    center: 'rgba(53, 97, 69, 0.2)',
    mid: 'rgba(53, 97, 69, 0.11)',
    outer: 'rgba(53, 97, 69, 0.032)',
    desktopRadius: 86,
    mobileRadius: 66,
  },
};

const nodeStyles = {
  theme: {
    radius: 13.5,
    fill: COLORS.greenDark,
    labelSize: 12.4,
    labelWeight: 500,
    labelOpacity: 0.92,
  },
  researchMain: {
    radius: 9,
    fill: COLORS.greenMid,
    labelSize: 11,
    labelWeight: 400,
    labelOpacity: 0.82,
  },
  researchSupport: {
    radius: 7.5,
    fill: COLORS.greenMid,
    labelSize: 10.5,
    labelWeight: 400,
    labelOpacity: 0.76,
  },
  engagementMajor: {
    radius: 8,
    fill: COLORS.copper,
    labelSize: 10.5,
    labelWeight: 400,
    labelOpacity: 0.76,
  },
  engagementMinor: {
    radius: 5.6,
    fill: 'rgba(196, 149, 106, 0.65)',
    labelSize: 9.5,
    labelWeight: 400,
    labelOpacity: 0.62,
  },
  institution: {
    radius: 5,
    fill: COLORS.institution,
    labelSize: 9,
    labelWeight: 400,
    labelOpacity: 0.5,
  },
};

const mobileHiddenLabelIds = new Set([
  'kgsa-career',
  'upenn-mixer',
  'hyc-mixer',
  'columbia-ai-club',
]);

function hashCode(value) {
  return [...value].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
}

function motionConfig(id) {
  const hash = Math.abs(hashCode(id));

  return {
    pulseDuration: `${6 + (hash % 3)}s`,
    pulseDelay: `${-(hash % 5)}s`,
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
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function nodeVisual(node) {
  if (node.type === 'theme') return nodeStyles.theme;
  if (node.type === 'research') {
    return node.importance === 'main' ? nodeStyles.researchMain : nodeStyles.researchSupport;
  }
  if (node.type === 'engagement') {
    return node.importance === 'minor' ? nodeStyles.engagementMinor : nodeStyles.engagementMajor;
  }
  return nodeStyles.institution;
}

function labelLayout(node, isMobile) {
  if (node.type === 'research') {
    return { dx: 15, dy: 4, anchor: 'start', baseline: 'middle' };
  }

  if (node.type === 'engagement') {
    return { dx: -15, dy: 4, anchor: 'end', baseline: 'middle' };
  }

  if (node.type === 'institution') {
    return { dx: 0, dy: 18, anchor: 'middle', baseline: 'hanging' };
  }

  const mobileMap = {
    misinformation: { dx: 0, dy: -24, anchor: 'middle', baseline: 'baseline' },
    'platform-governance': { dx: 20, dy: 4, anchor: 'start', baseline: 'middle' },
    'content-moderation': { dx: -20, dy: 4, anchor: 'end', baseline: 'middle' },
    'ai-policy': { dx: 20, dy: 4, anchor: 'start', baseline: 'middle' },
    'participatory-governance': { dx: -20, dy: 4, anchor: 'end', baseline: 'middle' },
  };

  const desktopMap = {
    misinformation: { dx: 0, dy: -26, anchor: 'middle', baseline: 'baseline' },
    'platform-governance': { dx: 24, dy: 4, anchor: 'start', baseline: 'middle' },
    'content-moderation': { dx: -24, dy: 4, anchor: 'end', baseline: 'middle' },
    'ai-policy': { dx: 24, dy: 4, anchor: 'start', baseline: 'middle' },
    'participatory-governance': { dx: -24, dy: 4, anchor: 'end', baseline: 'middle' },
  };

  return (isMobile ? mobileMap : desktopMap)[node.id];
}

function buildLayout(data, width, height, isMobile) {
  const marginX = isMobile ? 10 : 24;
  const marginY = isMobile ? 10 : 18;
  const innerWidth = width - marginX * 2;
  const innerHeight = height - marginY * 2;

  const nodes = data.nodes.map((node) => {
    const position = node[isMobile ? 'mobile' : 'desktop'];
    return {
      ...node,
      x: marginX + innerWidth * position.x,
      y: marginY + innerHeight * position.y,
      motion: motionConfig(node.id),
    };
  });

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const edges = data.edges.map((edge) => ({
    source: nodeMap.get(edge.source),
    target: nodeMap.get(edge.target),
  }));

  const adjacency = new Map(nodes.map((node) => [node.id, new Set([node.id])]));
  edges.forEach((edge) => {
    adjacency.get(edge.source.id)?.add(edge.target.id);
    adjacency.get(edge.target.id)?.add(edge.source.id);
  });

  return { nodes, edges, adjacency };
}

function edgeKey(edge) {
  return `${edge.source.id}|${edge.target.id}`;
}

function edgePath(edge) {
  const dx = edge.target.x - edge.source.x;
  const dy = edge.target.y - edge.source.y;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;
  const midpointX = (edge.source.x + edge.target.x) / 2;
  const midpointY = (edge.source.y + edge.target.y) / 2;
  const direction = hashCode(edgeKey(edge)) % 2 === 0 ? 1 : -1;
  const curve = Math.min(28, length * 0.12) * direction;
  const controlX = midpointX + normalX * curve;
  const controlY = midpointY + normalY * curve;

  return `M${edge.source.x},${edge.source.y} Q${controlX},${controlY} ${edge.target.x},${edge.target.y}`;
}

function themeAura(node, isMobile) {
  const config = themeAuraPalette[node.id];
  return {
    center: config?.center || 'rgba(45, 90, 61, 0.13)',
    mid: config?.mid || 'rgba(45, 90, 61, 0.07)',
    outer: config?.outer || 'rgba(45, 90, 61, 0.02)',
    radius: isMobile ? config?.mobileRadius || 56 : config?.desktopRadius || 74,
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
      setSize({ width, height });
    });

    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !size.width || !size.height) return undefined;

    const { nodes, edges, adjacency } = buildLayout(data, size.width, size.height, isMobile);
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const root = svg.append('g');
    const defs = root.append('defs');

    const themeAuraFilter = defs
      .append('filter')
      .attr('id', 'theme-aura-soften')
      .attr('x', '-180%')
      .attr('y', '-180%')
      .attr('width', '460%')
      .attr('height', '460%');

    themeAuraFilter
      .append('feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', isMobile ? 6 : 8);

    const themeNodes = nodes.filter((node) => node.type === 'theme');
    themeNodes.forEach((node) => {
      const aura = themeAura(node, isMobile);
      const gradient = defs.append('radialGradient').attr('id', `theme-glow-${node.id}`);
      gradient.append('stop').attr('offset', '0%').attr('stop-color', aura.center);
      gradient.append('stop').attr('offset', '34%').attr('stop-color', aura.mid);
      gradient.append('stop').attr('offset', '76%').attr('stop-color', aura.outer);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(255,255,255,0)');
    });

    if (!isMobile) {
      root
        .append('text')
        .attr('x', size.width * 0.18)
        .attr('y', size.height * 0.11)
        .attr('fill', 'rgba(43, 42, 42, 0.14)')
        .attr('font-family', "'Cormorant Garamond', serif")
        .attr('font-size', 42)
        .attr('font-weight', 400)
        .text('Research');

      root
        .append('text')
        .attr('x', size.width * 0.79)
        .attr('y', size.height * 0.11)
        .attr('fill', 'rgba(196, 149, 106, 0.2)')
        .attr('font-family', "'Cormorant Garamond', serif")
        .attr('font-size', 42)
        .attr('font-weight', 400)
        .attr('text-anchor', 'end')
        .text('Engagement');

      root
        .append('text')
        .attr('x', size.width * 0.5)
        .attr('y', size.height * 0.08)
        .attr('fill', 'rgba(43, 42, 42, 0.12)')
        .attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif")
        .attr('font-size', 10)
        .attr('letter-spacing', '0.18em')
        .attr('text-anchor', 'middle')
        .text('THEMES');
    }

    const edgeLayer = root.append('g');
    const flowLayer = root.append('g');
    const nodeLayer = root.append('g');

    const edgeSelection = edgeLayer
      .selectAll('path')
      .data(edges)
      .join('path')
      .attr('d', edgePath)
      .attr('fill', 'none')
      .attr('stroke', COLORS.greenLight)
      .attr('stroke-width', 0.95)
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.09);

    const flowSelection = flowLayer
      .selectAll('g')
      .data(edges.filter((edge) => primaryFlowPairs.has(edgeKey(edge))))
      .join('g')
      .attr('opacity', 1);

    flowSelection
      .append('circle')
      .attr('r', 1.8)
      .attr('fill', COLORS.greenPale)
      .attr('opacity', 0)
      .each(function eachFlow(edge) {
        const config = primaryFlowPairs.get(edgeKey(edge));
        const circle = d3.select(this);

        circle
          .append('animateMotion')
          .attr('dur', config.duration)
          .attr('begin', config.delay)
          .attr('repeatCount', 'indefinite')
          .attr('path', edgePath(edge));

        circle
          .append('animate')
          .attr('attributeName', 'opacity')
          .attr('values', '0;0.45;0.45;0')
          .attr('keyTimes', '0;0.08;0.92;1')
          .attr('dur', config.duration)
          .attr('begin', config.delay)
          .attr('repeatCount', 'indefinite');
      });

    const nodeSelection = nodeLayer
      .selectAll('g.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', (node) => `translate(${node.x}, ${node.y})`)
      .style('cursor', (node) => (node.url ? 'pointer' : 'grab'));

    const nodeGroup = nodeSelection
      .append('g')
      .attr('class', 'node-group');

    const themeAuraSelection = nodeGroup
      .filter((node) => node.type === 'theme')
      .append('circle')
      .attr('class', 'theme-aura')
      .attr('r', (node) => themeAura(node, isMobile).radius)
      .attr('fill', (node) => `url(#theme-glow-${node.id})`)
      .attr('filter', 'url(#theme-aura-soften)');

    /* Main node circle */
    const nodeMainSelection = nodeGroup
      .append('circle')
      .attr('class', (node) => (node.type === 'theme' ? 'node-main theme-pulse' : 'node-main'))
      .style('--pulse-duration', (node) => node.motion.pulseDuration)
      .style('--pulse-delay', (node) => node.motion.pulseDelay)
      .attr('r', (node) => nodeVisual(node).radius)
      .attr('fill', (node) => nodeVisual(node).fill)
      .attr('stroke', (node) => node.type === 'theme' ? 'none' : 'rgba(247, 247, 245, 0.7)')
      .attr('stroke-width', (node) => (node.type === 'institution' ? 0.8 : 1));

    const labelShadowSelection = nodeGroup
      .filter((node) => node.type === 'theme')
      .append('text')
      .attr('fill', 'rgba(247, 247, 245, 0.78)')
      .attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif")
      .attr('font-size', (node) => `${nodeVisual(node).labelSize}px`)
      .attr('font-weight', 500)
      .attr('opacity', 0.62)
      .attr('text-anchor', (node) => labelLayout(node, isMobile).anchor)
      .attr('dominant-baseline', (node) => labelLayout(node, isMobile).baseline)
      .attr('x', (node) => labelLayout(node, isMobile).dx)
      .attr('y', (node) => labelLayout(node, isMobile).dy + 0.8);

    const labelGroups = nodeGroup
      .append('text')
      .attr('font-family', "'PP Neue Montreal', 'Inter', sans-serif")
      .attr('font-size', (node) => `${nodeVisual(node).labelSize}px`)
      .attr('font-weight', (node) => nodeVisual(node).labelWeight)
      .attr('letter-spacing', (node) => (node.type === 'theme' ? '0.005em' : null))
      .attr('fill', (node) => (node.type === 'theme' ? 'rgba(27, 61, 47, 0.92)' : COLORS.text))
      .attr('opacity', (node) =>
        isMobile && mobileHiddenLabelIds.has(node.id)
          ? 0
          : nodeVisual(node).labelOpacity
      )
      .attr('text-anchor', (node) => labelLayout(node, isMobile).anchor)
      .attr('dominant-baseline', (node) => labelLayout(node, isMobile).baseline)
      .attr('x', (node) => labelLayout(node, isMobile).dx)
      .attr('y', (node) => labelLayout(node, isMobile).dy);

    function appendWrappedLines(selection) {
      selection
        .selectAll('tspan')
        .data((node) => wrapLabel(node.label, isMobile ? 16 : 18))
        .join('tspan')
        .attr('x', function getX() {
          return d3.select(this.parentNode).attr('x');
        })
        .attr('dy', (_, index) => (index === 0 ? 0 : '1.15em'))
        .text((line) => line);
    }

    appendWrappedLines(labelShadowSelection);
    appendWrappedLines(labelGroups);

    const isConnected = (source, target) => adjacency.get(source.id)?.has(target.id);

    function renderPositions() {
      nodeSelection.attr('transform', (node) => `translate(${node.x}, ${node.y})`);
      edgeSelection.attr('d', edgePath);
      flowSelection.selectAll('circle').each(function updatePath(edge) {
        d3.select(this).select('animateMotion').attr('path', edgePath(edge));
      });
    }

    function updateHighlight(activeNode) {
      edgeSelection.attr('opacity', (edge) => {
        if (!activeNode) return 0.09;
        return edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 0.45 : 0.03;
      });

      flowSelection.attr('opacity', (edge) => {
        if (!activeNode) return 1;
        return edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 1 : 0.05;
      });

      nodeMainSelection.attr('opacity', (node) => {
        if (!activeNode) return 1;
        return isConnected(activeNode, node) ? 1 : 0.15;
      });

      themeAuraSelection.attr('opacity', (node) => {
        if (!activeNode) return 0.82;
        return isConnected(activeNode, node) ? 0.96 : 0.12;
      });

      labelGroups.attr('opacity', (node) => {
        if (!activeNode) {
          return isMobile && mobileHiddenLabelIds.has(node.id) ? 0 : nodeVisual(node).labelOpacity;
        }
        if (isMobile && mobileHiddenLabelIds.has(node.id)) return 0;
        return isConnected(activeNode, node) ? 0.96 : 0.12;
      });

      labelShadowSelection.attr('opacity', (node) => {
        if (!activeNode) return 0.62;
        return isConnected(activeNode, node) ? 0.68 : 0.12;
      });
    }

    const drag = d3
      .drag()
      .on('start', function onStart() {
        d3.select(this).style('cursor', 'grabbing');
      })
      .on('drag', function onDrag(event, node) {
        node.x = Math.max(24, Math.min(size.width - 24, event.x));
        node.y = Math.max(24, Math.min(size.height - 24, event.y));
        renderPositions();
        setTooltip((current) => ({
          ...current,
          visible: true,
          x: event.x,
          y: event.y,
          label: node.label,
        }));
      })
      .on('end', function onEnd(event, node) {
        d3.select(this).style('cursor', node.url ? 'pointer' : 'grab');
        setTooltip((current) => ({ ...current, visible: false }));
      });

    nodeSelection
      .on('mouseenter', function onEnter(event, node) {
        updateHighlight(node);
        setTooltip({
          visible: true,
          x: node.x,
          y: node.y,
          label: node.label,
        });
      })
      .on('mouseleave', function onLeave() {
        updateHighlight(null);
        setTooltip((current) => ({ ...current, visible: false }));
      })
      .on('click', (_, node) => {
        if (node.url) navigate(node.url);
      })
      .call(drag);

    renderPositions();
    updateHighlight(null);

    return undefined;
  }, [data, isMobile, navigate, size.height, size.width]);

  return (
    <GraphWrap ref={wrapRef}>
      <StyledSvg ref={svgRef} viewBox={`0 0 ${size.width || 1000} ${size.height || 560}`}>
        <title>Dongjae Kang semantic map</title>
      </StyledSvg>
      <Tooltip $visible={tooltip.visible} $x={tooltip.x} $y={tooltip.y}>
        {tooltip.label}
      </Tooltip>
    </GraphWrap>
  );
}

export default Graph;
