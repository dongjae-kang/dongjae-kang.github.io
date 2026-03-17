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
  background: rgba(26, 26, 26, 0.88);
  border: 1px solid rgba(245, 240, 232, 0.16);
  color: ${({ theme }) => theme.colors.home.text};
  font-size: 0.78rem;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.15s ease;
`;

const nodeStyle = {
  research: { fill: '#8BA888', stroke: 'none', radius: 8 },
  activity: { fill: '#F5F0E8', stroke: 'none', radius: 7 },
  leadership: { fill: '#A0856E', stroke: 'none', radius: 7 },
  theme: { fill: 'transparent', stroke: '#F5F0E8', radius: 9 },
  institution: { fill: '#666666', stroke: 'none', radius: 6 },
};

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

    const linkedById = new Set();
    data.edges.forEach((edge) => {
      linkedById.add(`${edge.source}-${edge.target}`);
      linkedById.add(`${edge.target}-${edge.source}`);
    });

    const radiusFor = (node) => {
      const base = nodeStyle[node.type]?.radius ?? 7;
      return isMobile ? Math.max(base - 2, 4) : base;
    };

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink(data.edges)
          .id((d) => d.id)
          .distance(isMobile ? 68 : 94)
          .strength(0.55)
      )
      .force('charge', d3.forceManyBody().strength(isMobile ? -100 : -200))
      .force('center', d3.forceCenter(size.width / 2, size.height / 2))
      .force('collide', d3.forceCollide().radius((d) => radiusFor(d) + (isMobile ? 12 : 20)));

    const root = svg.append('g');

    const link = root
      .append('g')
      .attr('stroke', '#F5F0E8')
      .attr('stroke-opacity', 0.15)
      .selectAll('line')
      .data(data.edges)
      .join('line')
      .attr('stroke-width', 0.8);

    const nodeGroup = root
      .append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .style('cursor', (d) => (d.url ? 'pointer' : 'grab'));

    const circles = nodeGroup
      .append('circle')
      .attr('r', (d) => radiusFor(d))
      .attr('fill', (d) => nodeStyle[d.type]?.fill ?? '#F5F0E8')
      .attr('stroke', (d) => nodeStyle[d.type]?.stroke ?? 'none')
      .attr('stroke-width', (d) => (d.type === 'theme' ? 1.2 : 0));

    const labels = nodeGroup
      .append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => radiusFor(d) + 14)
      .attr('fill', '#F5F0E8')
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-size', isMobile ? 10 : 11)
      .attr('opacity', isMobile ? 0 : 0.6);

    const isConnected = (a, b) => a.id === b.id || linkedById.has(`${a.id}-${b.id}`);

    const updateTooltip = (event, d) => {
      const bounds = wrapRef.current?.getBoundingClientRect();
      if (!bounds) return;
      setTooltip({
        visible: true,
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        label: d.label,
      });
    };

    const setActiveState = (activeNode) => {
      circles.attr('opacity', (d) => (isConnected(activeNode, d) ? 1 : 0.15));
      labels.attr('opacity', (d) => {
        if (isMobile) return isConnected(activeNode, d) ? 1 : 0;
        return isConnected(activeNode, d) ? 1 : 0.15;
      });
      link
        .attr('stroke-opacity', (d) =>
          d.source.id === activeNode.id || d.target.id === activeNode.id ? 0.6 : 0.1
        )
        .attr('stroke-width', (d) =>
          d.source.id === activeNode.id || d.target.id === activeNode.id ? 1.5 : 0.5
        );
      nodeGroup.attr('opacity', (d) => (isConnected(activeNode, d) ? 1 : 0.2));
    };

    const clearActiveState = () => {
      circles.attr('opacity', 1);
      labels.attr('opacity', isMobile ? 0 : 0.6);
      link.attr('stroke-opacity', 0.15).attr('stroke-width', 0.8);
      nodeGroup.attr('opacity', 1);
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    nodeGroup
      .on('mouseenter', function handleEnter(event, d) {
        d3.select(this).raise().transition().duration(150).attr('transform', 'scale(1.3)');
        setActiveState(d);
        updateTooltip(event, d);
      })
      .on('mousemove', function handleMove(event, d) {
        updateTooltip(event, d);
      })
      .on('mouseleave', function handleLeave() {
        d3.select(this).transition().duration(150).attr('transform', 'scale(1)');
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

    nodeGroup.call(
      d3
        .drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);

      if (simulation.alpha() < 0.01) {
        simulation.stop();
      }
    });

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
