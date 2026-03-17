import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';

const GraphWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.graphMax};
  height: min(68vh, 720px);
  min-height: 420px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50vh;
    min-height: 320px;
  }
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const Tooltip = styled.div`
  position: absolute;
  top: ${({ $y }) => `${$y}px`};
  left: ${({ $x }) => `${$x}px`};
  transform: translate(12px, -12px);
  pointer-events: none;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(8, 23, 17, 0.9);
  border: 1px solid rgba(216, 234, 223, 0.14);
  color: ${({ theme }) => theme.colors.home.text};
  font-size: 0.78rem;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.15s ease;
`;

const nodeStyle = {
  research: { fill: '#9AC7AF', stroke: 'none', radius: 8 },
  activity: { fill: '#F3F7F0', stroke: 'none', radius: 7 },
  leadership: { fill: '#6FA486', stroke: 'none', radius: 7 },
  theme: { fill: 'transparent', stroke: '#D8EADF', radius: 9 },
  institution: { fill: '#5E7569', stroke: 'none', radius: 6 },
};

const typeConfig = {
  theme: { x: 0.5, y: 0.42, spreadX: 88, spreadY: 72, strength: 0.24 },
  institution: { x: 0.53, y: 0.56, spreadX: 112, spreadY: 76, strength: 0.2 },
  research: { x: 0.34, y: 0.36, spreadX: 122, spreadY: 112, strength: 0.12 },
  activity: { x: 0.66, y: 0.38, spreadX: 124, spreadY: 114, strength: 0.11 },
  leadership: { x: 0.5, y: 0.78, spreadX: 154, spreadY: 52, strength: 0.14 },
};

function buildInitialPositions(nodes, width, height) {
  const nodesByType = d3.group(nodes, (node) => node.type);

  Object.entries(typeConfig).forEach(([type, config]) => {
    const typedNodes = nodesByType.get(type) ?? [];
    typedNodes.forEach((node, index) => {
      const count = typedNodes.length || 1;
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
      const wave = type === 'leadership' ? Math.sin(index * 1.5) : Math.cos(index * 1.3);
      const baseX = width * config.x;
      const baseY = height * config.y;
      node.x = baseX + Math.cos(angle) * config.spreadX + wave * 16;
      node.y = baseY + Math.sin(angle) * config.spreadY + wave * 10;
    });
  });
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

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const nodes = data.nodes.map((node) => ({ ...node }));
    const edges = data.edges.map((edge) => ({ ...edge }));

    buildInitialPositions(nodes, size.width, size.height);

    const linkedById = new Set();
    edges.forEach((edge) => {
      linkedById.add(`${edge.source}-${edge.target}`);
      linkedById.add(`${edge.target}-${edge.source}`);
    });

    const radiusFor = (node) => {
      const base = nodeStyle[node.type]?.radius ?? 7;
      return isMobile ? Math.max(base - 2, 4) : base;
    };

    const anchorFor = (node) => {
      const config = typeConfig[node.type] ?? typeConfig.theme;
      return {
        x: size.width * config.x,
        y: size.height * config.y,
        strength: isMobile ? config.strength * 0.75 : config.strength,
      };
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(edges)
          .id((d) => d.id)
          .distance((edge) =>
            edge.source.type === 'theme' || edge.target.type === 'theme'
              ? isMobile
                ? 54
                : 76
              : isMobile
                ? 72
                : 102
          )
          .strength((edge) =>
            edge.source.type === 'theme' || edge.target.type === 'theme' ? 0.9 : 0.55
          )
      )
      .force('charge', d3.forceManyBody().strength(isMobile ? -85 : -180))
      .force('x', d3.forceX((d) => anchorFor(d).x).strength((d) => anchorFor(d).strength))
      .force('y', d3.forceY((d) => anchorFor(d).y).strength((d) => anchorFor(d).strength))
      .force('center', d3.forceCenter(size.width / 2, size.height / 2))
      .force('collide', d3.forceCollide().radius((d) => radiusFor(d) + (isMobile ? 12 : 22)))
      .alpha(0.7)
      .alphaDecay(0.05)
      .velocityDecay(0.35)
      .stop();

    for (let i = 0; i < 240; i += 1) {
      simulation.tick();
    }

    const root = svg.append('g');

    const link = root
      .append('g')
      .attr('stroke', '#D8EADF')
      .attr('stroke-opacity', 0.16)
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke-width', 0.8);

    const nodeLayer = root.append('g');

    const nodeShell = nodeLayer
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', (d) => (d.url ? 'pointer' : 'grab'));

    const circles = nodeShell
      .append('circle')
      .attr('r', (d) => radiusFor(d))
      .attr('fill', (d) => nodeStyle[d.type]?.fill ?? '#F3F7F0')
      .attr('stroke', (d) => nodeStyle[d.type]?.stroke ?? 'none')
      .attr('stroke-width', (d) => (d.type === 'theme' ? 1.2 : 0));

    const labels = nodeShell
      .append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => radiusFor(d) + 14)
      .attr('fill', '#F7FBF8')
      .attr('stroke', 'rgba(8, 23, 17, 0.45)')
      .attr('stroke-width', 0.4)
      .attr('paint-order', 'stroke')
      .attr('font-family', 'PP Neue Montreal, Inter, sans-serif')
      .attr('font-size', isMobile ? 10 : 12)
      .attr('font-weight', 500)
      .attr('letter-spacing', '0.01em')
      .attr('opacity', isMobile ? 0 : 0.82)
      .attr('pointer-events', 'none');

    const isConnected = (a, b) => a.id === b.id || linkedById.has(`${a.id}-${b.id}`);

    const clampNode = (node) => {
      const padding = isMobile ? 26 : 36;
      node.x = Math.max(padding, Math.min(size.width - padding, node.x));
      node.y = Math.max(padding, Math.min(size.height - padding, node.y));
    };

    nodes.forEach(clampNode);

    const render = () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      nodeShell.attr('transform', (d) => {
        clampNode(d);
        return `translate(${d.x},${d.y})`;
      });
    };

    render();

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

    const setActiveState = (activeNode) => {
      nodeShell.filter((d) => d.id === activeNode.id).raise();

      circles
        .attr('opacity', (d) => (isConnected(activeNode, d) ? 1 : 0.16))
        .attr('r', (d) => (d.id === activeNode.id ? radiusFor(d) * 1.28 : radiusFor(d)));

      labels.attr('opacity', (d) => {
        if (d.id === activeNode.id) return 1;
        if (isMobile) return isConnected(activeNode, d) ? 0.9 : 0;
        return isConnected(activeNode, d) ? 1 : 0.05;
      });

      link
        .attr('stroke-opacity', (d) =>
          d.source.id === activeNode.id || d.target.id === activeNode.id ? 0.72 : 0.08
        )
        .attr('stroke-width', (d) =>
          d.source.id === activeNode.id || d.target.id === activeNode.id ? 1.6 : 0.5
        );

      nodeShell.attr('opacity', (d) => (isConnected(activeNode, d) ? 1 : 0.2));
    };

    const clearActiveState = () => {
      circles.attr('opacity', 1).attr('r', (d) => radiusFor(d));
      labels.attr('opacity', isMobile ? 0 : 0.82);
      link.attr('stroke-opacity', 0.16).attr('stroke-width', 0.8);
      nodeShell.attr('opacity', 1);
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    nodeShell
      .on('mouseenter', function handleEnter(event, d) {
        setActiveState(d);
        updateTooltip(event, d);
      })
      .on('mousemove', function handleMove(event, d) {
        updateTooltip(event, d);
      })
      .on('mouseleave', function handleLeave() {
        clearActiveState();
      })
      .on('click', function handleClick(event, d) {
        if (isMobile) {
          setActiveState(d);
          updateTooltip(event, d);
        }

        if (d.url && d.type !== 'theme' && d.type !== 'institution') {
          navigate(d.url);
        }
      });

    nodeShell.call(
      d3
        .drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alpha(0.18).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = Math.max(24, Math.min(size.width - 24, event.x));
          d.fy = Math.max(24, Math.min(size.height - 24, event.y));
          render();
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alpha(0).stop();
          d.fx = null;
          d.fy = null;
        })
    );

    return () => {
      simulation.stop();
    };
  }, [data, isMobile, navigate, size.height, size.width]);

  return (
    <GraphWrap ref={wrapRef}>
      <StyledSvg ref={svgRef} role="img" aria-label="Interactive knowledge graph" />
      <Tooltip $visible={tooltip.visible} $x={tooltip.x} $y={tooltip.y}>
        {tooltip.label}
      </Tooltip>
    </GraphWrap>
  );
}

export default Graph;
