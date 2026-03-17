import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';

const GraphWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.graphMax};
  height: min(65vh, 700px);
  min-height: 520px;
  padding: 20px;
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(245, 240, 232, 0.12);
  background:
    radial-gradient(circle at 16% 18%, rgba(154, 184, 158, 0.18), transparent 28%),
    radial-gradient(circle at 84% 20%, rgba(92, 61, 46, 0.08), transparent 28%),
    radial-gradient(circle at 50% 82%, rgba(74, 93, 58, 0.14), transparent 32%),
    linear-gradient(180deg, rgba(13, 26, 20, 0.2), rgba(13, 26, 20, 0.08));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 24px 60px rgba(0, 0, 0, 0.16);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50vh;
    min-height: 400px;
    padding: 16px;
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

const ClusterCards = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const ClusterCard = styled.div`
  position: absolute;
  width: ${({ $width }) => $width};
  display: grid;
  gap: 7px;
  padding: 12px 14px 14px;
  border-radius: 18px;
  border: 1px solid rgba(245, 240, 232, 0.08);
  background: rgba(13, 26, 20, 0.24);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);
  text-align: ${({ $align }) => $align};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 14px 14px;
    border-radius: 16px;
  }
`;

const ClusterLine = styled.span`
  width: 68px;
  height: 1px;
  background: rgba(245, 240, 232, 0.22);
  margin: ${({ $align }) =>
    $align === 'center' ? '0 auto' : $align === 'right' ? '0 0 0 auto' : '0'};
`;

const ClusterEyebrow = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(245, 240, 232, 0.58);
`;

const ClusterCardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.45rem, 1.9vw, 1.85rem);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.home.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.35rem;
  }
`;

const nodeStyle = {
  research: { fill: '#9AB89E', stroke: 'none', radius: 8 },
  activity: { fill: '#F5F0E8', stroke: 'none', radius: 7 },
  leadership: { fill: '#8AA27B', stroke: 'none', radius: 7 },
  theme: { fill: 'transparent', stroke: '#F5F0E8', radius: 10 },
  institution: { fill: '#6B746A', stroke: 'none', radius: 6 },
};

const semanticClusters = {
  discourse: {
    label: 'Platforms & Public Discourse',
    title: ['Platforms', '& Public Discourse'],
    subtitle: 'researching how technology shapes public conversation',
    fill: 'rgba(111, 164, 134, 0.08)',
    stroke: 'rgba(154, 199, 175, 0.22)',
    text: '#E6DED2',
  },
  governance: {
    label: 'Leadership & Governance',
    title: ['Leadership', '& Governance'],
    subtitle: 'turning ideas into coalitions, institutions, and public action',
    fill: 'rgba(243, 247, 240, 0.05)',
    stroke: 'rgba(243, 247, 240, 0.16)',
    text: '#F5F0E8',
  },
  equity: {
    label: 'Equity, Innovation & Opportunity',
    title: ['Equity, Innovation', '& Opportunity'],
    subtitle: 'using technology and policy to widen access and opportunity',
    fill: 'rgba(84, 129, 103, 0.08)',
    stroke: 'rgba(111, 164, 134, 0.18)',
    text: '#E6DED2',
  },
};

const semanticHubCluster = {
  misinformation: 'discourse',
  'platform-governance': 'discourse',
  'content-moderation': 'discourse',
  'participatory-governance': 'governance',
  un: 'governance',
  'national-assembly': 'governance',
  'ai-policy': 'equity',
  'equitable-development': 'equity',
  'st-policy': 'equity',
  kaist: 'equity',
  'columbia-sipa': 'equity',
};

const nodeClusterOverrides = {
  valedictorian: 'equity',
  ces: 'equity',
  stanford: 'equity',
  'hyc-mixer': 'governance',
  'upenn-mixer': 'governance',
  'kgsa-career': 'governance',
};

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
  return lines.slice(0, 3);
}

function buildAdjacency(nodes, edges) {
  const adjacency = new Map(nodes.map((node) => [node.id, []]));
  edges.forEach((edge) => {
    adjacency.get(edge.source)?.push(edge.target);
    adjacency.get(edge.target)?.push(edge.source);
  });
  return adjacency;
}

function fallbackClusterFor(nodeType) {
  if (nodeType === 'leadership') return 'governance';
  if (nodeType === 'research') return 'discourse';
  return 'equity';
}

function pickBestCluster(scoreMap, fallback) {
  const entries = [...scoreMap.entries()].sort((a, b) => b[1] - a[1]);
  return entries[0]?.[0] ?? fallback;
}

function getClusterCenter(clusterId, width, height, isMobile) {
  if (isMobile) {
    const mobilePositions = {
      discourse: { x: width * 0.5, y: height * 0.22 },
      governance: { x: width * 0.5, y: height * 0.52 },
      equity: { x: width * 0.5, y: height * 0.77 },
    };
    return mobilePositions[clusterId];
  }

  const desktopPositions = {
    discourse: { x: width * 0.24, y: height * 0.42 },
    governance: { x: width * 0.76, y: height * 0.42 },
    equity: { x: width * 0.5, y: height * 0.74 },
  };

  return desktopPositions[clusterId];
}

function getClusterCardLayout(clusterId, isMobile) {
  if (isMobile) {
    const mobileLayouts = {
      discourse: {
        style: { top: '18px', left: '18px' },
        width: 'min(220px, calc(100% - 36px))',
        align: 'left',
      },
      governance: {
        style: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        width: 'min(220px, calc(100% - 36px))',
        align: 'center',
      },
      equity: {
        style: { left: '50%', bottom: '18px', transform: 'translateX(-50%)' },
        width: 'min(248px, calc(100% - 36px))',
        align: 'center',
      },
    };

    return mobileLayouts[clusterId];
  }

  const desktopLayouts = {
    discourse: {
      style: { top: '20px', left: '20px' },
      width: '220px',
      align: 'left',
    },
    governance: {
      style: { top: '20px', right: '20px' },
      width: '220px',
      align: 'right',
    },
    equity: {
      style: { left: '50%', bottom: '18px', transform: 'translateX(-50%)' },
      width: '250px',
      align: 'center',
    },
  };

  return desktopLayouts[clusterId];
}

function scoreClusterFromGraph(startId, nodesById, adjacency, maxDepth = 4) {
  const scores = new Map();
  const visited = new Set([startId]);
  const queue = [{ id: startId, depth: 0 }];

  while (queue.length > 0) {
    const { id, depth } = queue.shift();
    if (depth >= maxDepth) continue;

    (adjacency.get(id) ?? []).forEach((neighborId) => {
      if (visited.has(neighborId)) return;
      visited.add(neighborId);

      const neighbor = nodesById.get(neighborId);
      const nextDepth = depth + 1;

      if (neighbor?.cluster) {
        const baseWeight =
          neighbor.type === 'theme' ? 5 : neighbor.type === 'institution' ? 3.5 : 1.4;
        const distanceWeight = Math.pow(0.66, nextDepth - 1);
        scores.set(
          neighbor.cluster,
          (scores.get(neighbor.cluster) ?? 0) + baseWeight * distanceWeight
        );
      }

      queue.push({ id: neighborId, depth: nextDepth });
    });
  }

  return scores;
}

function assignSemanticClusters(nodes, edges) {
  const nodesById = new Map(nodes.map((node) => [node.id, node]));
  const adjacency = buildAdjacency(nodes, edges);

  nodes.forEach((node) => {
    if (nodeClusterOverrides[node.id]) {
      node.cluster = nodeClusterOverrides[node.id];
      return;
    }

    if (node.type === 'theme' || node.type === 'institution') {
      node.cluster = semanticHubCluster[node.id] ?? 'equity';
    }
  });

  nodes
    .filter((node) => !node.cluster)
    .forEach((node) => {
      const scores = scoreClusterFromGraph(node.id, nodesById, adjacency);
      node.cluster = pickBestCluster(scores, fallbackClusterFor(node.type));
    });

  return { nodesById, adjacency };
}

function placeHubNodes(clusterNodes, center, isMobile) {
  const themes = [...clusterNodes]
    .filter((node) => node.type === 'theme')
    .sort((a, b) => a.label.localeCompare(b.label));
  const institutions = [...clusterNodes]
    .filter((node) => node.type === 'institution')
    .sort((a, b) => a.label.localeCompare(b.label));

  const themeRadiusX = isMobile ? 76 : 132;
  const themeRadiusY = isMobile ? 54 : 92;
  const institutionRadiusX = isMobile ? 84 : 154;
  const institutionRadiusY = isMobile ? 40 : 66;

  themes.forEach((node, index) => {
    const angleStart = -Math.PI * 0.94;
    const angleEnd = Math.PI * 0.1;
    const angle =
      themes.length === 1
        ? -Math.PI / 2
        : angleStart + (index / Math.max(themes.length - 1, 1)) * (angleEnd - angleStart);

    node.anchorX = center.x + Math.cos(angle) * themeRadiusX;
    node.anchorY = center.y + Math.sin(angle) * themeRadiusY;
    node.x = node.anchorX;
    node.y = node.anchorY;
  });

  institutions.forEach((node, index) => {
    const angleStart = Math.PI * 0.08;
    const angleEnd = Math.PI * 0.92;
    const angle =
      institutions.length === 1
        ? Math.PI / 2
        : angleStart + (index / Math.max(institutions.length - 1, 1)) * (angleEnd - angleStart);

    node.anchorX = center.x + Math.cos(angle) * institutionRadiusX;
    node.anchorY = center.y + Math.sin(angle) * institutionRadiusY + (isMobile ? 16 : 24);
    node.x = node.anchorX;
    node.y = node.anchorY;
  });
}

function choosePrimaryHub(node, adjacency, nodesById) {
  const visited = new Set([node.id]);
  const queue = [{ id: node.id, depth: 0 }];

  while (queue.length > 0) {
    const { id, depth } = queue.shift();
    if (depth >= 4) continue;

    for (const neighborId of adjacency.get(id) ?? []) {
      if (visited.has(neighborId)) continue;
      visited.add(neighborId);

      const neighbor = nodesById.get(neighborId);
      if (!neighbor) continue;

      if (
        neighbor.cluster === node.cluster &&
        (neighbor.type === 'theme' || neighbor.type === 'institution')
      ) {
        return neighbor;
      }

      queue.push({ id: neighborId, depth: depth + 1 });
    }
  }

  return (
    (adjacency.get(node.id) ?? [])
      .map((neighborId) => nodesById.get(neighborId))
      .find((neighbor) => neighbor?.cluster === node.cluster) ?? null
  );
}

function placeContentNodes(clusterNodes, adjacency, nodesById, center, isMobile) {
  const contentNodes = [...clusterNodes]
    .filter((node) => node.type !== 'theme' && node.type !== 'institution')
    .sort((a, b) => a.label.localeCompare(b.label));

  const grouped = d3.group(
    contentNodes,
    (node) => choosePrimaryHub(node, adjacency, nodesById)?.id ?? node.cluster
  );

  [...grouped.entries()].forEach(([hubId, nodesForHub]) => {
    const hub = nodesById.get(hubId);
    const anchorX = hub?.x ?? center.x;
    const anchorY = hub?.y ?? center.y;

    nodesForHub.forEach((node, index) => {
      const orbitSize = isMobile ? 5 : 7;
      const orbitIndex = index % orbitSize;
      const ring = Math.floor(index / orbitSize);
      const ringCount = Math.min(orbitSize, nodesForHub.length - ring * orbitSize) || 1;
      const angleJitter = hub ? (hub.id.length % 7) * 0.12 : 0;
      const angle = -Math.PI / 2 + angleJitter + (orbitIndex / ringCount) * Math.PI * 2;
      const radiusBase = isMobile ? 52 : 86;
      const radiusStep = isMobile ? 20 : 30;
      const radius = radiusBase + ring * radiusStep + (node.type === 'leadership' ? 12 : 0);

      node.anchorX = anchorX;
      node.anchorY = anchorY;
      node.x = anchorX + Math.cos(angle) * radius;
      node.y = anchorY + Math.sin(angle) * radius;
    });
  });
}

function buildLayout(baseNodes, baseEdges, width, height, isMobile) {
  const nodes = baseNodes.map((node) => ({ ...node }));
  const edges = baseEdges.map((edge) => ({ ...edge }));
  const { nodesById, adjacency } = assignSemanticClusters(nodes, edges);

  Object.keys(semanticClusters).forEach((clusterId) => {
    const center = getClusterCenter(clusterId, width, height, isMobile);
    const clusterNodes = nodes.filter((node) => node.cluster === clusterId);

    placeHubNodes(clusterNodes, center, isMobile);
    placeContentNodes(clusterNodes, adjacency, nodesById, center, isMobile);

    clusterNodes.forEach((node) => {
      node.clusterCenterX = center.x;
      node.clusterCenterY = center.y;
    });
  });

  return { nodes, edges, nodesById, adjacency };
}

function createHull(points) {
  if (points.length < 3) return null;

  const hull = d3.polygonHull(points);
  if (!hull) return null;

  return d3.line().curve(d3.curveCatmullRomClosed.alpha(0.55))(hull);
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

  const contentWidth = xExtent[1] - xExtent[0] + 180;
  const contentHeight = yExtent[1] - yExtent[0] + 180;
  const scale = Math.min((width * 0.94) / contentWidth, (height * 0.86) / contentHeight, 1.75);
  const sourceCenterX = (xExtent[0] + xExtent[1]) / 2;
  const sourceCenterY = (yExtent[0] + yExtent[1]) / 2;
  const targetCenterX = width / 2;
  const targetCenterY = height / 2 - 20;

  nodes.forEach((node) => {
    node.x = targetCenterX + (node.x - sourceCenterX) * scale;
    node.y = targetCenterY + (node.y - sourceCenterY) * scale;
    node.anchorX = targetCenterX + (node.anchorX - sourceCenterX) * scale;
    node.anchorY = targetCenterY + (node.anchorY - sourceCenterY) * scale;
    node.clusterCenterX = targetCenterX + (node.clusterCenterX - sourceCenterX) * scale;
    node.clusterCenterY = targetCenterY + (node.clusterCenterY - sourceCenterY) * scale;
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
    scaleLayoutToFrame(nodes, size.width, size.height);

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
      const padding = isMobile ? 28 : 40;
      node.x = Math.max(padding, Math.min(size.width - padding, node.x));
      node.y = Math.max(padding, Math.min(size.height - padding, node.y));
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(edges)
          .id((node) => node.id)
          .distance((edge) => {
            if (edge.source.cluster === edge.target.cluster) {
              if (edge.source.type === 'theme' || edge.target.type === 'theme') {
                return isMobile ? 58 : 82;
              }
              return isMobile ? 72 : 102;
            }
            return isMobile ? 104 : 150;
          })
          .strength((edge) => (edge.source.cluster === edge.target.cluster ? 0.62 : 0.16))
      )
      .force(
        'charge',
        d3.forceManyBody().strength((node) => {
          if (node.type === 'theme') return isMobile ? -100 : -160;
          if (node.type === 'institution') return isMobile ? -82 : -126;
          return isMobile ? -76 : -108;
        })
      )
      .force(
        'x',
        d3
          .forceX((node) => node.anchorX)
          .strength((node) => (node.type === 'theme' ? 0.36 : 0.24))
      )
      .force(
        'y',
        d3
          .forceY((node) => node.anchorY)
          .strength((node) => (node.type === 'theme' ? 0.36 : 0.24))
      )
      .force(
        'collide',
        d3.forceCollide().radius((node) => radiusFor(node) + (isMobile ? 18 : 24))
      )
      .alpha(0.4)
      .alphaDecay(0.055)
      .velocityDecay(0.42)
      .stop();

    for (let i = 0; i < 220; i += 1) {
      simulation.tick();
    }

    nodes.forEach(clampNode);

    const root = svg.append('g').attr('transform', 'translate(20, 20)');
    const regionLayer = root.append('g');
    const linkLayer = root.append('g');
    const nodeLayer = root.append('g');

    const link = linkLayer
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#F5F0E8')
      .attr('stroke-opacity', 0.14)
      .attr('stroke-width', 0.9);

    const nodeShell = nodeLayer
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', (node) =>
        node.url && node.type !== 'theme' && node.type !== 'institution' ? 'pointer' : 'grab'
      );

    const circles = nodeShell
      .append('circle')
      .attr('r', (node) => radiusFor(node))
      .attr('fill', (node) => nodeStyle[node.type]?.fill ?? '#F3F7F0')
      .attr('stroke', (node) => nodeStyle[node.type]?.stroke ?? 'none')
      .attr('stroke-width', (node) => (node.type === 'theme' ? 1.2 : 0));

    const labels = nodeShell
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#F5F0E8')
      .attr('stroke', 'rgba(13, 26, 20, 0.62)')
      .attr('stroke-width', 0.5)
      .attr('paint-order', 'stroke')
      .attr('font-family', 'PP Neue Montreal, Inter, sans-serif')
      .attr('font-size', (node) => {
        if (node.type === 'theme') return isMobile ? 10.5 : 13;
        if (node.type === 'institution') return isMobile ? 9 : 10.75;
        return isMobile ? 0 : 11;
      })
      .attr('font-weight', (node) => (node.type === 'theme' ? 600 : 500))
      .attr('letter-spacing', '0.01em')
      .attr('opacity', (node) => {
        if (isMobile) return node.type === 'theme' || node.type === 'institution' ? 0.94 : 0;
        if (node.type === 'theme') return 0.98;
        if (node.type === 'institution') return 0.88;
        return 0.9;
      })
      .attr('pointer-events', 'none');

    labels.each(function createLabel(node) {
      const text = d3.select(this);
      const lines = wrapLabel(node.label, node.type === 'theme' ? 20 : 16);
      const baseY = radiusFor(node) + 16 - (lines.length - 1) * 6;

      lines.forEach((line, index) => {
        text
          .append('tspan')
          .text(line)
          .attr('x', 0)
          .attr('y', index === 0 ? baseY : null)
          .attr('dy', index === 0 ? 0 : 12);
      });
    });

    const isConnected = (a, b) => a.id === b.id || linkedById.has(`${a.id}-${b.id}`);

    const renderRegions = () => {
      const regionData = Object.keys(semanticClusters).map((clusterId) => {
        const clusterNodes = nodes.filter((node) => node.cluster === clusterId);
        const center = getClusterCenter(clusterId, size.width, size.height, isMobile);
        const coreRadius = isMobile ? 42 : 76;
        const centerPoints = d3.range(0, Math.PI * 2, Math.PI / 4).map((angle) => [
          center.x + Math.cos(angle) * coreRadius,
          center.y + Math.sin(angle) * coreRadius,
        ]);
        const nodePoints = clusterNodes.flatMap((node) => {
          const radius = radiusFor(node) + (node.type === 'theme' ? 70 : 56);
          return d3.range(0, Math.PI * 2, Math.PI / 4).map((angle) => [
            node.x + Math.cos(angle) * radius,
            node.y + Math.sin(angle) * radius,
          ]);
        });

        return {
          id: clusterId,
          path: createHull([...centerPoints, ...nodePoints]),
        };
      });

      regionLayer
        .selectAll('path')
        .data(regionData.filter((entry) => entry.path))
        .join('path')
        .attr('d', (entry) => entry.path)
        .attr('fill', (entry) => semanticClusters[entry.id].fill)
        .attr('stroke', (entry) => semanticClusters[entry.id].stroke)
        .attr('stroke-width', 1.05);
    };

    const render = () => {
      link
        .attr('x1', (edge) => edge.source.x)
        .attr('y1', (edge) => edge.source.y)
        .attr('x2', (edge) => edge.target.x)
        .attr('y2', (edge) => edge.target.y);

      nodeShell.attr('transform', (node) => `translate(${node.x},${node.y})`);

      renderRegions();
    };

    render();

    const clearActiveState = () => {
      circles.attr('opacity', 1).attr('r', (node) => radiusFor(node));
      labels.attr('opacity', (node) => {
        if (isMobile) return node.type === 'theme' || node.type === 'institution' ? 0.94 : 0;
        if (node.type === 'theme') return 0.98;
        if (node.type === 'institution') return 0.88;
        return 0.9;
      });
      link.attr('stroke-opacity', 0.14).attr('stroke-width', 0.9);
      nodeShell.attr('opacity', 1);
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    const setActiveState = (activeNode) => {
      nodeShell.filter((node) => node.id === activeNode.id).raise();

      circles
        .attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.14))
        .attr('r', (node) => (node.id === activeNode.id ? radiusFor(node) * 1.28 : radiusFor(node)));

      labels.attr('opacity', (node) => {
        if (node.id === activeNode.id) return 1;
        if (isConnected(activeNode, node)) return 1;
        if (node.type === 'theme' || node.type === 'institution') return 0.14;
        return 0.08;
      });

      link
        .attr('stroke-opacity', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 0.78 : 0.06
        )
        .attr('stroke-width', (edge) =>
          edge.source.id === activeNode.id || edge.target.id === activeNode.id ? 1.65 : 0.45
        );

      nodeShell.attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.18));
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

        if (node.url && node.type !== 'theme' && node.type !== 'institution') {
          navigate(node.url);
        }
      });

    simulation.on('tick', () => {
      nodes.forEach(clampNode);
      render();

      if (simulation.alpha() < 0.024) {
        simulation.stop();
      }
    });

    nodeShell.call(
      d3
        .drag()
        .on('start', (event, node) => {
          if (!event.active) simulation.alpha(0.16).restart();
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
      <StyledSvg ref={svgRef} role="img" aria-label="Interactive knowledge graph" />
      <ClusterCards>
        {Object.entries(semanticClusters).map(([clusterId, cluster]) => {
          const layout = getClusterCardLayout(clusterId, isMobile);

          return (
            <ClusterCard
              key={clusterId}
              style={layout.style}
              $width={layout.width}
              $align={layout.align}
            >
              <ClusterEyebrow>Thematic Cluster</ClusterEyebrow>
              <ClusterLine $align={layout.align} />
              <ClusterCardTitle>{cluster.title.join(' ')}</ClusterCardTitle>
            </ClusterCard>
          );
        })}
      </ClusterCards>
      <Tooltip $visible={tooltip.visible} $x={tooltip.x} $y={tooltip.y}>
        {tooltip.label}
      </Tooltip>
    </GraphWrap>
  );
}

export default Graph;
