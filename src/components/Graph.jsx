import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';

const GraphWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.graphMax};
  height: min(76vh, 860px);
  min-height: 560px;
  padding: 24px;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(216, 234, 223, 0.12);
  background:
    radial-gradient(circle at 18% 18%, rgba(154, 199, 175, 0.14), transparent 28%),
    radial-gradient(circle at 82% 22%, rgba(111, 164, 134, 0.1), transparent 26%),
    radial-gradient(circle at 52% 78%, rgba(243, 247, 240, 0.05), transparent 24%),
    linear-gradient(180deg, rgba(8, 23, 17, 0.14), rgba(8, 23, 17, 0.04));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 24px 60px rgba(0, 0, 0, 0.12);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 58vh;
    min-height: 420px;
    padding: 18px;
  }
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const GuideCard = styled.div`
  position: absolute;
  top: 22px;
  left: 22px;
  z-index: 2;
  max-width: 320px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid rgba(216, 234, 223, 0.12);
  background: rgba(8, 23, 17, 0.38);
  backdrop-filter: blur(14px);
  color: ${({ theme }) => theme.colors.home.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(100% - 36px);
    padding: 14px 16px;
  }
`;

const GuideTitle = styled.p`
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.86;
`;

const GuideText = styled.p`
  font-size: 0.98rem;
  line-height: 1.55;
  color: rgba(243, 247, 240, 0.86);
`;

const LegendRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  margin-top: 14px;
`;

const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: rgba(243, 247, 240, 0.76);
`;

const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ $color, $outlined }) => ($outlined ? 'transparent' : $color)};
  border: 1px solid ${({ $color }) => $color};
`;

const Hint = styled.div`
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 2;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(8, 23, 17, 0.28);
  border: 1px solid rgba(216, 234, 223, 0.1);
  color: rgba(243, 247, 240, 0.72);
  font-size: 0.8rem;
  backdrop-filter: blur(10px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
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
  background: rgba(8, 23, 17, 0.92);
  border: 1px solid rgba(216, 234, 223, 0.12);
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
  theme: { fill: 'transparent', stroke: '#D8EADF', radius: 10 },
  institution: { fill: '#5E7569', stroke: 'none', radius: 6 },
};

const regionMeta = {
  research: {
    label: 'Research',
    fill: 'rgba(111, 164, 134, 0.08)',
    stroke: 'rgba(154, 199, 175, 0.18)',
    text: '#DDEEE4',
  },
  activity: {
    label: 'Activities',
    fill: 'rgba(243, 247, 240, 0.05)',
    stroke: 'rgba(243, 247, 240, 0.15)',
    text: '#F3F7F0',
  },
  leadership: {
    label: 'Leadership',
    fill: 'rgba(84, 129, 103, 0.08)',
    stroke: 'rgba(111, 164, 134, 0.18)',
    text: '#D8EADF',
  },
  hubs: {
    label: 'Themes + Institutions',
    fill: 'rgba(216, 234, 223, 0.035)',
    stroke: 'rgba(216, 234, 223, 0.1)',
    text: '#E9F3ED',
  },
};

const badgeOffsets = {
  research: { x: -90, y: -92 },
  activity: { x: -96, y: -92 },
  leadership: { x: -96, y: -74 },
  hubs: { x: -110, y: -84 },
};

function getRegionSpec(type, width, height, count, isMobile) {
  const mobileFactor = isMobile ? 0.82 : 1;
  const growth = Math.sqrt(Math.max(count, 1));

  if (type === 'research') {
    return {
      x: width * 0.27,
      y: height * 0.4,
      spreadX: Math.min(width * 0.18, 170 + growth * 16) * mobileFactor,
      spreadY: Math.min(height * 0.22, 132 + growth * 10) * mobileFactor,
      strength: isMobile ? 0.14 : 0.17,
    };
  }

  if (type === 'activity') {
    return {
      x: width * 0.73,
      y: height * 0.4,
      spreadX: Math.min(width * 0.18, 174 + growth * 16) * mobileFactor,
      spreadY: Math.min(height * 0.22, 136 + growth * 10) * mobileFactor,
      strength: isMobile ? 0.14 : 0.17,
    };
  }

  if (type === 'leadership') {
    return {
      x: width * 0.5,
      y: height * 0.77,
      spreadX: Math.min(width * 0.22, 220 + growth * 12) * mobileFactor,
      spreadY: Math.min(height * 0.12, 82 + growth * 8) * mobileFactor,
      strength: isMobile ? 0.17 : 0.21,
    };
  }

  return {
    x: width * 0.5,
    y: height * 0.5,
    spreadX: Math.min(width * 0.12, 130 + growth * 8) * mobileFactor,
    spreadY: Math.min(height * 0.14, 100 + growth * 8) * mobileFactor,
    strength: isMobile ? 0.2 : 0.26,
  };
}

function distributeCenters(region, count) {
  if (count <= 1) return [{ x: region.x, y: region.y }];

  const cols = Math.min(3, Math.ceil(Math.sqrt(count)));
  const rows = Math.ceil(count / cols);
  const gapX = cols === 1 ? 0 : (region.spreadX * 1.2) / Math.max(cols - 1, 1);
  const gapY = rows === 1 ? 0 : (region.spreadY * 1.1) / Math.max(rows - 1, 1);

  return Array.from({ length: count }, (_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const offsetX = cols === 1 ? 0 : -((cols - 1) * gapX) / 2 + col * gapX;
    const offsetY = rows === 1 ? 0 : -((rows - 1) * gapY) / 2 + row * gapY;
    return {
      x: region.x + offsetX,
      y: region.y + offsetY,
    };
  });
}

function assignHubAnchors(nodes, width, height, isMobile) {
  const themes = nodes.filter((node) => node.type === 'theme');
  const institutions = nodes.filter((node) => node.type === 'institution');

  const themeRegion = getRegionSpec('hubs', width, height, themes.length, isMobile);
  const institutionRegion = getRegionSpec('hubs', width, height, institutions.length, isMobile);

  themes.forEach((node, index) => {
    const angle = (-Math.PI / 2) + (index / Math.max(themes.length, 1)) * Math.PI * 2;
    node.anchorX = themeRegion.x + Math.cos(angle) * themeRegion.spreadX * 0.78;
    node.anchorY = themeRegion.y + Math.sin(angle) * themeRegion.spreadY * 0.58 - 18;
    node.x = node.anchorX;
    node.y = node.anchorY;
    node.regionType = 'hubs';
  });

  institutions.forEach((node, index) => {
    const angle = Math.PI + (index / Math.max(institutions.length, 1)) * Math.PI;
    node.anchorX = institutionRegion.x + Math.cos(angle) * institutionRegion.spreadX * 0.72;
    node.anchorY = institutionRegion.y + Math.sin(angle) * institutionRegion.spreadY * 0.38 + 66;
    node.x = node.anchorX;
    node.y = node.anchorY;
    node.regionType = 'hubs';
  });
}

function assignContentAnchors(nodes, adjacency, nodesById, width, height, isMobile) {
  ['research', 'activity', 'leadership'].forEach((type) => {
    const typedNodes = nodes.filter((node) => node.type === type);
    const region = getRegionSpec(type, width, height, typedNodes.length, isMobile);

    const grouped = d3.groups(typedNodes, (node) => {
      const related = [...(adjacency.get(node.id) ?? [])]
        .map((id) => nodesById.get(id))
        .filter(Boolean);

      const theme = related.find((entry) => entry.type === 'theme');
      const institution = related.find((entry) => entry.type === 'institution');

      return theme?.id ?? institution?.id ?? `${type}-default`;
    });

    const subgroupCenters = distributeCenters(region, grouped.length);

    grouped.forEach(([, subgroup], subgroupIndex) => {
      const subgroupCenter = subgroupCenters[subgroupIndex];

      subgroup.forEach((node, index) => {
        const ring = Math.floor(index / 4);
        const ringCount = Math.min(4, subgroup.length - ring * 4) || 1;
        const angle = (index % 4) / ringCount * Math.PI * 2 - Math.PI / 2;
        const offsetX = Math.cos(angle) * (22 + ring * 24);
        const offsetY = Math.sin(angle) * (18 + ring * 18);

        node.anchorX = subgroupCenter.x;
        node.anchorY = subgroupCenter.y;
        node.x = subgroupCenter.x + offsetX;
        node.y = subgroupCenter.y + offsetY;
        node.regionType = type;
      });
    });
  });
}

function buildNodeLayout(baseNodes, baseEdges, width, height, isMobile) {
  const nodes = baseNodes.map((node) => ({ ...node }));
  const edges = baseEdges.map((edge) => ({ ...edge }));
  const nodesById = new Map(nodes.map((node) => [node.id, node]));
  const adjacency = new Map(nodes.map((node) => [node.id, new Set()]));

  edges.forEach((edge) => {
    adjacency.get(edge.source)?.add(edge.target);
    adjacency.get(edge.target)?.add(edge.source);
  });

  assignHubAnchors(nodes, width, height, isMobile);
  assignContentAnchors(nodes, adjacency, nodesById, width, height, isMobile);

  return { nodes, edges, adjacency };
}

function createHullPath(points) {
  if (points.length < 3) return null;
  const hull = d3.polygonHull(points);
  if (!hull) return null;

  const line = d3.line().curve(d3.curveCatmullRomClosed.alpha(0.55));
  return {
    path: line(hull),
    centroid: d3.polygonCentroid(hull),
  };
}

function scaleLayoutToFrame(nodes, width, height) {
  const xExtent = d3.extent(nodes, (node) => node.x);
  const yExtent = d3.extent(nodes, (node) => node.y);

  if (
    xExtent[0] == null ||
    xExtent[1] == null ||
    yExtent[0] == null ||
    yExtent[1] == null
  ) {
    return;
  }

  const contentWidth = xExtent[1] - xExtent[0] + 140;
  const contentHeight = yExtent[1] - yExtent[0] + 140;
  const targetWidth = width * 0.9;
  const targetHeight = height * 0.82;
  const scale = Math.min(targetWidth / contentWidth, targetHeight / contentHeight, 1.75);

  const contentCenterX = (xExtent[0] + xExtent[1]) / 2;
  const contentCenterY = (yExtent[0] + yExtent[1]) / 2;
  const frameCenterX = width / 2;
  const frameCenterY = height / 2 + 12;

  nodes.forEach((node) => {
    node.x = frameCenterX + (node.x - contentCenterX) * scale;
    node.y = frameCenterY + (node.y - contentCenterY) * scale;
    node.anchorX = frameCenterX + (node.anchorX - contentCenterX) * scale;
    node.anchorY = frameCenterY + (node.anchorY - contentCenterY) * scale;
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

  const overview = useMemo(() => {
    const counts = d3.rollup(graphData.nodes, (values) => values.length, (node) => node.type);
    return [
      {
        label: `Research ${counts.get('research') ?? 0}`,
        color: nodeStyle.research.fill,
      },
      {
        label: `Activities ${counts.get('activity') ?? 0}`,
        color: nodeStyle.activity.fill,
      },
      {
        label: `Leadership ${counts.get('leadership') ?? 0}`,
        color: nodeStyle.leadership.fill,
      },
      {
        label: `Themes ${counts.get('theme') ?? 0}`,
        color: nodeStyle.theme.stroke,
        outlined: true,
      },
      {
        label: `Institutions ${counts.get('institution') ?? 0}`,
        color: nodeStyle.institution.fill,
      },
    ];
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: width - 48, height: height - 48 });
    });

    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !size.width || !size.height) return undefined;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { nodes, edges } = buildNodeLayout(data.nodes, data.edges, size.width, size.height, isMobile);

    const linkedById = new Set();
    edges.forEach((edge) => {
      linkedById.add(`${edge.source}-${edge.target}`);
      linkedById.add(`${edge.target}-${edge.source}`);
    });

    const radiusFor = (node) => {
      const base = nodeStyle[node.type]?.radius ?? 7;
      return isMobile ? Math.max(base - 1.5, 4.5) : base;
    };

    const clampNode = (node) => {
      const padding = isMobile ? 24 : 36;
      node.x = Math.max(padding, Math.min(size.width - padding, node.x));
      node.y = Math.max(padding, Math.min(size.height - padding, node.y));
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(edges)
          .id((d) => d.id)
          .distance((edge) => {
            const typePair = [edge.source.type, edge.target.type].sort().join(':');

            if (typePair.includes('theme')) return isMobile ? 54 : 70;
            if (typePair.includes('institution')) return isMobile ? 62 : 82;
            if (edge.source.type === edge.target.type) return isMobile ? 72 : 92;

            return isMobile ? 74 : 96;
          })
          .strength((edge) => {
            if (edge.source.type === 'theme' || edge.target.type === 'theme') return 0.92;
            if (edge.source.type === 'institution' || edge.target.type === 'institution') return 0.72;
            return 0.54;
          })
      )
      .force(
        'charge',
        d3.forceManyBody().strength((node) => {
          if (node.type === 'theme') return isMobile ? -100 : -170;
          if (node.type === 'institution') return isMobile ? -80 : -120;
          return isMobile ? -70 : -110;
        })
      )
      .force('x', d3.forceX((node) => node.anchorX).strength((node) => {
        if (node.type === 'theme') return isMobile ? 0.22 : 0.28;
        if (node.type === 'institution') return isMobile ? 0.2 : 0.24;
        return isMobile ? 0.12 : 0.16;
      }))
      .force('y', d3.forceY((node) => node.anchorY).strength((node) => {
        if (node.type === 'theme') return isMobile ? 0.22 : 0.3;
        if (node.type === 'institution') return isMobile ? 0.2 : 0.24;
        return isMobile ? 0.12 : 0.16;
      }))
      .force('center', d3.forceCenter(size.width / 2, size.height / 2))
      .force('collide', d3.forceCollide().radius((node) => radiusFor(node) + (isMobile ? 14 : 22)))
      .alpha(1)
      .alphaDecay(0.055)
      .velocityDecay(0.34)
      .stop();

    for (let index = 0; index < 280; index += 1) {
      simulation.tick();
    }

    scaleLayoutToFrame(nodes, size.width, size.height);
    nodes.forEach(clampNode);

    const root = svg
      .append('g')
      .attr('transform', `translate(24, 24)`);

    const regionLayer = root.append('g');
    const linkLayer = root.append('g');
    const nodeLayer = root.append('g');
    const badgeLayer = root.append('g');

    const link = linkLayer
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#D8EADF')
      .attr('stroke-opacity', 0.13)
      .attr('stroke-width', 0.85);

    const nodeShell = nodeLayer
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', (node) => (node.url ? 'pointer' : 'grab'));

    const circles = nodeShell
      .append('circle')
      .attr('r', (node) => radiusFor(node))
      .attr('fill', (node) => nodeStyle[node.type]?.fill ?? '#F3F7F0')
      .attr('stroke', (node) => nodeStyle[node.type]?.stroke ?? 'none')
      .attr('stroke-width', (node) => (node.type === 'theme' ? 1.2 : 0));

    const labels = nodeShell
      .append('text')
      .text((node) => node.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (node) => radiusFor(node) + 16)
      .attr('fill', '#F7FBF8')
      .attr('stroke', 'rgba(8, 23, 17, 0.46)')
      .attr('stroke-width', 0.45)
      .attr('paint-order', 'stroke')
      .attr('font-family', 'PP Neue Montreal, Inter, sans-serif')
      .attr('font-size', (node) => {
        if (node.type === 'theme') return isMobile ? 10 : 13;
        if (node.type === 'institution') return isMobile ? 9 : 11;
        return isMobile ? 0 : 10.5;
      })
      .attr('font-weight', (node) => (node.type === 'theme' ? 600 : 500))
      .attr('letter-spacing', '0.01em')
      .attr('opacity', (node) => {
        if (isMobile) return 0;
        if (node.type === 'theme') return 0.98;
        if (node.type === 'institution') return 0.86;
        return 0;
      })
      .attr('pointer-events', 'none');

    const badgeData = [
      {
        id: 'research',
        label: regionMeta.research.label,
        position: getRegionSpec('research', size.width, size.height, nodes.filter((node) => node.type === 'research').length, isMobile),
      },
      {
        id: 'activity',
        label: regionMeta.activity.label,
        position: getRegionSpec('activity', size.width, size.height, nodes.filter((node) => node.type === 'activity').length, isMobile),
      },
      {
        id: 'leadership',
        label: regionMeta.leadership.label,
        position: getRegionSpec('leadership', size.width, size.height, nodes.filter((node) => node.type === 'leadership').length, isMobile),
      },
      {
        id: 'hubs',
        label: regionMeta.hubs.label,
        position: getRegionSpec('hubs', size.width, size.height, nodes.filter((node) => node.regionType === 'hubs').length, isMobile),
      },
    ];

    const badges = badgeLayer
      .selectAll('g')
      .data(isMobile ? [] : badgeData)
      .join('g');

    badges
      .append('rect')
      .attr('rx', 999)
      .attr('fill', 'rgba(8, 23, 17, 0.46)')
      .attr('stroke', 'rgba(216, 234, 223, 0.1)')
      .attr('height', 28);

    badges
      .append('text')
      .text((entry) => entry.label)
      .attr('fill', (entry) => regionMeta[entry.id].text)
      .attr('font-family', 'PP Neue Montreal, Inter, sans-serif')
      .attr('font-size', 12)
      .attr('font-weight', 600)
      .attr('letter-spacing', '0.08em')
      .attr('text-transform', 'uppercase');

    const isConnected = (a, b) => a.id === b.id || linkedById.has(`${a.id}-${b.id}`);

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

    const renderRegions = () => {
      const regionEntries = [
        { id: 'research', nodes: nodes.filter((node) => node.type === 'research') },
        { id: 'activity', nodes: nodes.filter((node) => node.type === 'activity') },
        { id: 'leadership', nodes: nodes.filter((node) => node.type === 'leadership') },
        {
          id: 'hubs',
          nodes: nodes.filter((node) => node.type === 'theme' || node.type === 'institution'),
        },
      ].map((entry) => {
        const points = entry.nodes.flatMap((node) => {
          const radius = radiusFor(node) + (entry.id === 'hubs' ? 34 : 42);
          return d3.range(0, Math.PI * 2, Math.PI / 4).map((angle) => [
            node.x + Math.cos(angle) * radius,
            node.y + Math.sin(angle) * radius,
          ]);
        });

        return {
          ...entry,
          hull: createHullPath(points),
        };
      });

      regionLayer
        .selectAll('path')
        .data(regionEntries.filter((entry) => entry.hull?.path))
        .join('path')
        .attr('d', (entry) => entry.hull.path)
        .attr('fill', (entry) => regionMeta[entry.id].fill)
        .attr('stroke', (entry) => regionMeta[entry.id].stroke)
        .attr('stroke-width', 1.1);

      badges
        .attr('transform', (entry) => {
          const offset = badgeOffsets[entry.id];
          return `translate(${entry.position.x + offset.x},${entry.position.y + offset.y})`;
        });

      badges.select('text').attr('x', 14).attr('y', 18);

      badges.each(function setBadgeBox() {
        const group = d3.select(this);
        const text = group.select('text').node();
        if (!text) return;
        const box = text.getBBox();
        group
          .select('rect')
          .attr('width', box.width + 28);
      });
    };

    const render = () => {
      link
        .attr('x1', (edge) => edge.source.x)
        .attr('y1', (edge) => edge.source.y)
        .attr('x2', (edge) => edge.target.x)
        .attr('y2', (edge) => edge.target.y);

      nodeShell.attr('transform', (node) => {
        clampNode(node);
        return `translate(${node.x},${node.y})`;
      });

      renderRegions();
    };

    render();

    const setActiveState = (activeNode) => {
      nodeShell.filter((node) => node.id === activeNode.id).raise();

      circles
        .attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.14))
        .attr('r', (node) => (node.id === activeNode.id ? radiusFor(node) * 1.28 : radiusFor(node)));

      labels.attr('opacity', (node) => {
        if (node.id === activeNode.id) return 1;
        if (isConnected(activeNode, node)) {
          if (node.type === 'theme' || node.type === 'institution') return 1;
          return isMobile ? 1 : 0.95;
        }
        if (node.type === 'theme' || node.type === 'institution') return 0.14;
        return 0;
      });

      link
        .attr('stroke-opacity', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 0.78 : 0.05
        )
        .attr('stroke-width', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 1.65 : 0.45
        );

      nodeShell.attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.18));
    };

    const clearActiveState = () => {
      circles.attr('opacity', 1).attr('r', (node) => radiusFor(node));
      labels.attr('opacity', (node) => {
        if (isMobile) return 0;
        if (node.type === 'theme') return 0.98;
        if (node.type === 'institution') return 0.86;
        return 0;
      });
      link.attr('stroke-opacity', 0.13).attr('stroke-width', 0.85);
      nodeShell.attr('opacity', 1);
      setTooltip((prev) => ({ ...prev, visible: false }));
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

        if (node.url && node.type !== 'theme' && node.type !== 'institution') {
          navigate(node.url);
        }
      });

    nodeShell.call(
      d3
        .drag()
        .on('start', (event, node) => {
          if (!event.active) simulation.alpha(0.24).restart();
          node.fx = node.x;
          node.fy = node.y;
        })
        .on('drag', (event, node) => {
          node.fx = Math.max(24, Math.min(size.width - 24, event.x));
          node.fy = Math.max(24, Math.min(size.height - 24, event.y));
          node.x = node.fx;
          node.y = node.fy;
          render();
        })
        .on('end', (event, node) => {
          if (!event.active) simulation.alpha(0).stop();
          node.fx = null;
          node.fy = null;
        })
    );

    return () => {
      simulation.stop();
    };
  }, [data.edges, data.nodes, isMobile, navigate, size.height, size.width]);

  return (
    <GraphWrap ref={wrapRef}>
      <GuideCard>
        <GuideTitle>Knowledge Map</GuideTitle>
        <GuideText>
          Research, activities, and leadership cluster around the themes and institutions that tie
          them together.
        </GuideText>
        <LegendRow>
          {overview.map((item) => (
            <LegendItem key={item.label}>
              <LegendDot $color={item.color} $outlined={item.outlined} />
              <span>{item.label}</span>
            </LegendItem>
          ))}
        </LegendRow>
      </GuideCard>
      <Hint>Hover to trace one thread through the graph</Hint>
      <StyledSvg ref={svgRef} role="img" aria-label="Interactive knowledge graph" />
      <Tooltip $visible={tooltip.visible} $x={tooltip.x} $y={tooltip.y}>
        {tooltip.label}
      </Tooltip>
    </GraphWrap>
  );
}

export default Graph;
