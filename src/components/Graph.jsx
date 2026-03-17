import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import graphData from '../data/graphData.json';

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
    radial-gradient(circle at 16% 18%, rgba(154, 184, 158, 0.18), transparent 28%),
    radial-gradient(circle at 84% 20%, rgba(92, 61, 46, 0.08), transparent 28%),
    radial-gradient(circle at 50% 82%, rgba(74, 93, 58, 0.14), transparent 32%),
    linear-gradient(180deg, rgba(13, 26, 20, 0.2), rgba(13, 26, 20, 0.08));
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

const nodeStyle = {
  research: { fill: '#9AB89E', stroke: 'none', radius: 8 },
  activity: { fill: '#F5F0E8', stroke: 'none', radius: 7 },
  leadership: { fill: '#8AA27B', stroke: 'none', radius: 7 },
  theme: { fill: 'transparent', stroke: '#F5F0E8', radius: 10 },
  institution: { fill: '#6B746A', stroke: 'none', radius: 6 },
};

const semanticClusters = {
  discourse: {
    label: 'Public Discourse',
    shortLabel: 'Public Discourse',
    titleLines: ['Public', 'Discourse'],
    fill: 'rgba(111, 164, 134, 0.08)',
    stroke: 'rgba(154, 199, 175, 0.22)',
  },
  governance: {
    label: 'Governance & Service',
    shortLabel: 'Governance',
    titleLines: ['Governance', '& Service'],
    fill: 'rgba(243, 247, 240, 0.05)',
    stroke: 'rgba(243, 247, 240, 0.16)',
  },
  equity: {
    label: 'AI, Equity & Opportunity',
    shortLabel: 'AI & Equity',
    titleLines: ['AI, Equity', '& Opportunity'],
    fill: 'rgba(84, 129, 103, 0.08)',
    stroke: 'rgba(111, 164, 134, 0.18)',
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
  'chi-2025': 'discourse',
  'un-ga-hlw': 'governance',
  'hyc-mixer': 'governance',
  'upenn-mixer': 'governance',
  'kgsa-career': 'governance',
  'columbia-ai-club': 'governance',
};

const nodeImportance = {
  crisisnews: 4,
  prism: 4,
  misinformation: 4,
  'platform-governance': 4,
  'ai-policy': 4,
  'participatory-governance': 4,
  'student-council': 3,
  'ai-in-smes': 3,
  'columbia-ai-club': 3,
  'content-moderation': 3,
  'beyond-removal': 3,
  'multi-agent-sim': 3,
  'chi-2025': 3,
  'un-ga-hlw': 3,
  valedictorian: 3,
  'participatory-budget': 2,
  'youth-policy': 2,
  kaist: 2,
  'columbia-sipa': 2,
  un: 2,
  'equitable-development': 2,
  'st-policy': 2,
};

const clusterOrbitConfig = {
  discourse: {
    featureAngles: [-2.6, -2.05, -1.48, -0.95],
    supportAngles: [-2.95, -2.28, -1.72, -1.18, -0.62, -0.18],
    featureRadius: 138,
    supportRadius: 188,
    mobileFeatureRadius: 88,
    mobileSupportRadius: 122,
  },
  governance: {
    featureAngles: [-0.34, 0.2, 0.82, 1.32],
    supportAngles: [-0.76, -0.08, 0.46, 0.98, 1.52, 2.04],
    featureRadius: 138,
    supportRadius: 188,
    mobileFeatureRadius: 88,
    mobileSupportRadius: 122,
  },
  equity: {
    featureAngles: [0.98, 1.6, 2.24, 2.82],
    supportAngles: [0.52, 1.2, 1.86, 2.48, 3.06, 3.58],
    featureRadius: 142,
    supportRadius: 196,
    mobileFeatureRadius: 92,
    mobileSupportRadius: 128,
  },
};

const mobileVisibleLabelIds = new Set([
  'crisisnews',
  'prism',
  'misinformation',
  'platform-governance',
  'content-moderation',
  'ai-policy',
  'participatory-governance',
]);

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
      discourse: { x: width * 0.24, y: height * 0.27 },
      governance: { x: width * 0.77, y: height * 0.38 },
      equity: { x: width * 0.48, y: height * 0.77 },
    };
    return mobilePositions[clusterId];
  }

  const desktopPositions = {
    discourse: { x: width * 0.16, y: height * 0.42 },
    governance: { x: width * 0.84, y: height * 0.35 },
    equity: { x: width * 0.48, y: height * 0.8 },
  };

  return desktopPositions[clusterId];
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

  const themeRadiusX = isMobile ? 54 : 86;
  const themeRadiusY = isMobile ? 38 : 62;
  const institutionRadiusX = isMobile ? 70 : 108;
  const institutionRadiusY = isMobile ? 30 : 48;

  themes.forEach((node, index) => {
    const angleStart = -Math.PI * 0.88;
    const angleEnd = -Math.PI * 0.06;
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
    const angleStart = Math.PI * 0.14;
    const angleEnd = Math.PI * 0.86;
    const angle =
      institutions.length === 1
        ? Math.PI / 2
        : angleStart + (index / Math.max(institutions.length - 1, 1)) * (angleEnd - angleStart);

    node.anchorX = center.x + Math.cos(angle) * institutionRadiusX;
    node.anchorY = center.y + Math.sin(angle) * institutionRadiusY + (isMobile ? 10 : 18);
    node.x = node.anchorX;
    node.y = node.anchorY;
  });
}

function nodeTier(node) {
  if (node.type === 'theme') return 5;
  return nodeImportance[node.id] ?? 1;
}

function placeNodesOnAngles(nodes, center, angles, radius, variance = 0) {
  nodes.forEach((node, index) => {
    const angle = angles[index % angles.length];
    const lane = Math.floor(index / angles.length);
    const laneOffset = lane * variance;
    const radialShift = lane % 2 === 0 ? laneOffset : -laneOffset * 0.35;

    node.anchorX = center.x + Math.cos(angle) * (radius + radialShift);
    node.anchorY = center.y + Math.sin(angle) * (radius + radialShift);
    node.x = node.anchorX;
    node.y = node.anchorY;
  });
}

function placeContentNodes(clusterId, clusterNodes, center, isMobile) {
  const contentNodes = [...clusterNodes]
    .filter((node) => node.type !== 'theme' && node.type !== 'institution')
    .sort((a, b) => {
      const tierDiff = nodeTier(b) - nodeTier(a);
      if (tierDiff !== 0) return tierDiff;

      const typeRank = { research: 0, leadership: 1, activity: 2 };
      const typeDiff = (typeRank[a.type] ?? 9) - (typeRank[b.type] ?? 9);
      if (typeDiff !== 0) return typeDiff;

      return a.label.localeCompare(b.label);
    });

  const config = clusterOrbitConfig[clusterId];
  const featureNodes = contentNodes.filter((node) => nodeTier(node) >= 3);
  const supportNodes = contentNodes.filter((node) => nodeTier(node) < 3);

  placeNodesOnAngles(
    featureNodes,
    center,
    config.featureAngles,
    isMobile ? config.mobileFeatureRadius : config.featureRadius,
    isMobile ? 18 : 26
  );

  placeNodesOnAngles(
    supportNodes,
    center,
    config.supportAngles,
    isMobile ? config.mobileSupportRadius : config.supportRadius,
    isMobile ? 14 : 22
  );
}

function buildLayout(baseNodes, baseEdges, width, height, isMobile) {
  const nodes = baseNodes.map((node) => ({ ...node }));
  const edges = baseEdges.map((edge) => ({ ...edge }));
  const { adjacency } = assignSemanticClusters(nodes, edges);

  Object.keys(semanticClusters).forEach((clusterId) => {
    const center = getClusterCenter(clusterId, width, height, isMobile);
    const clusterNodes = nodes.filter((node) => node.cluster === clusterId);

    placeHubNodes(clusterNodes, center, isMobile);
    placeContentNodes(clusterId, clusterNodes, center, isMobile);

    clusterNodes.forEach((node) => {
      node.clusterCenterX = center.x;
      node.clusterCenterY = center.y;
    });
  });

  return { nodes, edges, adjacency };
}

function isPrimaryNode(node, adjacency, isMobile) {
  if (node.type === 'theme') return isMobile ? nodeTier(node) >= 4 : true;
  if (isMobile) return nodeTier(node) >= 4;
  return nodeTier(node) >= 3;
}

function defaultLabelOpacity(node, adjacency, isMobile) {
  const primary = isPrimaryNode(node, adjacency, isMobile);

  if (isMobile) {
    if (!mobileVisibleLabelIds.has(node.id)) return 0;
    if (node.type === 'theme') return 0.98;
    if (node.type === 'research') return 0.92;
    return 0.8;
  }

  if (node.type === 'theme') return 0.98;
  if (node.type === 'research') return 0.92;
  if (node.type === 'institution') return nodeTier(node) >= 2 ? 0.72 : 0;
  return primary ? 0.84 : 0;
}

function defaultNodeOpacity(node, adjacency, isMobile) {
  if (node.type === 'theme') return 1;
  if (node.type === 'institution') return nodeTier(node) >= 2 ? 0.86 : 0.68;
  return isPrimaryNode(node, adjacency, isMobile) ? 1 : 0.62;
}

function createHull(points) {
  if (points.length < 3) return null;

  const hull = d3.polygonHull(points);
  if (!hull) return null;

  return d3.line().curve(d3.curveCatmullRomClosed.alpha(0.55))(hull);
}

function scaleLayoutToFrame(nodes, width, height, isMobile) {
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

  const contentWidth = xExtent[1] - xExtent[0] + (isMobile ? 180 : 160);
  const contentHeight = yExtent[1] - yExtent[0] + (isMobile ? 170 : 150);
  const scale = Math.min(
    (width * (isMobile ? 0.92 : 0.98)) / contentWidth,
    (height * (isMobile ? 0.86 : 0.94)) / contentHeight,
    isMobile ? 1.02 : 1.18
  );
  const sourceCenterX = (xExtent[0] + xExtent[1]) / 2;
  const sourceCenterY = (yExtent[0] + yExtent[1]) / 2;
  const targetCenterX = width / 2;
  const targetCenterY = isMobile ? height / 2 + 6 : height / 2 - 6;

  nodes.forEach((node) => {
    node.x = targetCenterX + (node.x - sourceCenterX) * scale;
    node.y = targetCenterY + (node.y - sourceCenterY) * scale;
    node.anchorX = targetCenterX + (node.anchorX - sourceCenterX) * scale;
    node.anchorY = targetCenterY + (node.anchorY - sourceCenterY) * scale;
    node.clusterCenterX = targetCenterX + (node.clusterCenterX - sourceCenterX) * scale;
    node.clusterCenterY = targetCenterY + (node.clusterCenterY - sourceCenterY) * scale;
  });
}

function relaxOverlaps(nodes, width, height, radiusFor, isMobile) {
  const padding = isMobile ? 24 : 36;

  for (let iteration = 0; iteration < 180; iteration += 1) {
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 0.001;
        const minDistance =
          radiusFor(a) +
          radiusFor(b) +
          (a.type === 'theme' || b.type === 'theme' ? (isMobile ? 34 : 50) : isMobile ? 18 : 24);

        if (distance >= minDistance) continue;

        const push = ((minDistance - distance) / distance) * 0.5;
        const offsetX = dx * push;
        const offsetY = dy * push;

        a.x -= offsetX;
        a.y -= offsetY;
        b.x += offsetX;
        b.y += offsetY;
      }
    }

    nodes.forEach((node) => {
      node.x += (node.anchorX - node.x) * (isMobile ? 0.025 : 0.018);
      node.y += (node.anchorY - node.y) * (isMobile ? 0.025 : 0.018);
      node.x = Math.max(padding, Math.min(width - padding, node.x));
      node.y = Math.max(padding, Math.min(height - padding, node.y));
    });
  }
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

    const { nodes, edges, adjacency } = buildLayout(
      data.nodes,
      data.edges,
      size.width,
      size.height,
      isMobile
    );
    scaleLayoutToFrame(nodes, size.width, size.height, isMobile);

    const linkedById = new Set();
    edges.forEach((edge) => {
      linkedById.add(`${edge.source}-${edge.target}`);
      linkedById.add(`${edge.target}-${edge.source}`);
    });

    const radiusFor = (node) => {
      const base = nodeStyle[node.type]?.radius ?? 7;
      const priorityBoost = isPrimaryNode(node, adjacency, isMobile)
        ? node.type === 'theme'
          ? 1.5
          : 0.85
        : -0.7;

      if (isMobile) {
        const mobileBase = Math.max(base - 1.6, 4.35);
        return Math.max(mobileBase + priorityBoost * 0.45, 4.4);
      }

      return Math.max(base + priorityBoost, 4.8);
    };

    const clampNode = (node) => {
      const padding = isMobile ? 26 : 42;
      node.x = Math.max(padding, Math.min(size.width - padding, node.x));
      node.y = Math.max(padding, Math.min(size.height - padding, node.y));
    };
    relaxOverlaps(nodes, size.width, size.height, radiusFor, isMobile);
    nodes.forEach(clampNode);

    const root = svg.append('g').attr('transform', 'translate(20, 20)');
    const regionGlowLayer = root.append('g');
    const regionLayer = root.append('g');
    const titleLayer = root.append('g');
    const linkLayer = root.append('g');
    const nodeGlowLayer = root.append('g');
    const nodeLayer = root.append('g');

    const link = linkLayer
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#F5F0E8')
      .attr('stroke-opacity', 0.08)
      .attr('stroke-width', 0.8);

    const nodeShell = nodeLayer
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', (node) =>
        node.url && node.type !== 'theme' && node.type !== 'institution' ? 'pointer' : 'grab'
      );

    const nodeGlow = nodeGlowLayer
      .selectAll('circle')
      .data(nodes.filter((node) => isPrimaryNode(node, adjacency, isMobile)))
      .join('circle')
      .attr('fill', (node) => {
        if (node.type === 'research') return 'rgba(154, 184, 158, 0.12)';
        if (node.type === 'theme') return 'rgba(245, 240, 232, 0.08)';
        if (node.type === 'leadership') return 'rgba(138, 162, 123, 0.1)';
        return 'rgba(245, 240, 232, 0.06)';
      })
      .attr('opacity', 1);

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
        if (node.type === 'theme')
          return isMobile ? (mobileVisibleLabelIds.has(node.id) ? 9.4 : 0) : 13.5;
        if (node.type === 'institution')
          return isMobile ? 0 : 9.6;
        if (node.type === 'research')
          return isMobile ? (mobileVisibleLabelIds.has(node.id) ? 8.7 : 0) : 11.4;
        return isMobile ? (mobileVisibleLabelIds.has(node.id) ? 8.2 : 0) : 10;
      })
      .attr('font-weight', (node) => (node.type === 'theme' ? 600 : 500))
      .attr('letter-spacing', '0.01em')
      .attr('opacity', (node) => defaultLabelOpacity(node, adjacency, isMobile))
      .attr('pointer-events', 'none');

    labels.each(function createLabel(node) {
      const text = d3.select(this);
      const maxChars = isMobile
        ? node.type === 'theme'
          ? 15
          : node.type === 'institution'
            ? 11
            : 11
        : node.type === 'theme'
          ? 19
          : node.type === 'research'
            ? 15
            : 13;
      const lines = wrapLabel(node.label, maxChars);
      const baseY = radiusFor(node) + (isMobile ? 14 : 16) - (lines.length - 1) * 6;

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
        const sample = clusterNodes[0];
        const center = sample
          ? { x: sample.clusterCenterX, y: sample.clusterCenterY }
          : getClusterCenter(clusterId, size.width, size.height, isMobile);
        const coreRadius = isMobile ? 18 : 62;
        const centerPoints = d3.range(0, Math.PI * 2, Math.PI / 4).map((angle) => [
          center.x + Math.cos(angle) * coreRadius,
          center.y + Math.sin(angle) * coreRadius,
        ]);
        const nodePoints = clusterNodes.flatMap((node) => {
          const radius =
            radiusFor(node) +
            (node.type === 'theme' ? (isMobile ? 34 : 54) : isMobile ? 24 : 40);
          return d3.range(0, Math.PI * 2, Math.PI / 4).map((angle) => [
            node.x + Math.cos(angle) * radius,
            node.y + Math.sin(angle) * radius,
          ]);
        });

        return {
          id: clusterId,
          center,
          path: createHull([...centerPoints, ...nodePoints]),
        };
      });

      regionGlowLayer
        .selectAll('circle')
        .data(regionData)
        .join('circle')
        .attr('cx', (entry) => entry.center.x)
        .attr('cy', (entry) => entry.center.y)
        .attr('r', isMobile ? 82 : 132)
        .attr('fill', (entry) => semanticClusters[entry.id].fill)
        .attr('opacity', isMobile ? 0.34 : 0.46);

      regionLayer
        .selectAll('path')
        .data(regionData.filter((entry) => entry.path))
        .join('path')
        .attr('d', (entry) => entry.path)
        .attr('fill', (entry) => semanticClusters[entry.id].fill)
        .attr('stroke', (entry) => semanticClusters[entry.id].stroke)
        .attr('stroke-width', isMobile ? 0.8 : 1.05)
        .attr('fill-opacity', isMobile ? 0.52 : 0.92)
        .attr('stroke-opacity', isMobile ? 0.56 : 0.84);

      if (!isMobile) {
        const titleData = regionData.map((entry) => {
          const layouts = {
            discourse: {
              x: entry.center.x - 176,
              y: entry.center.y - 116,
              lineToX: entry.center.x - 86,
              lineToY: entry.center.y - 58,
              align: 'start',
            },
            governance: {
              x: entry.center.x + 164,
              y: entry.center.y - 98,
              lineToX: entry.center.x + 84,
              lineToY: entry.center.y - 50,
              align: 'end',
            },
            equity: {
              x: entry.center.x - 132,
              y: entry.center.y + 150,
              lineToX: entry.center.x - 26,
              lineToY: entry.center.y + 72,
              align: 'start',
            },
          };

          return {
            ...entry,
            ...layouts[entry.id],
          };
        });

        const titleGroups = titleLayer
          .selectAll('g')
          .data(titleData)
          .join('g')
          .attr('transform', (entry) => `translate(${entry.x},${entry.y})`);

        titleGroups
          .selectAll('line')
          .data((entry) => [entry])
          .join('line')
          .attr('x1', (entry) => (entry.align === 'end' ? -12 : 12))
          .attr('y1', 0)
          .attr('x2', (entry) => entry.lineToX - entry.x)
          .attr('y2', (entry) => entry.lineToY - entry.y)
          .attr('stroke', 'rgba(245, 240, 232, 0.2)')
          .attr('stroke-width', 1);

        titleGroups
          .selectAll('circle')
          .data((entry) => [entry])
          .join('circle')
          .attr('cx', (entry) => entry.lineToX - entry.x)
          .attr('cy', (entry) => entry.lineToY - entry.y)
          .attr('r', 3)
          .attr('fill', 'rgba(245, 240, 232, 0.62)');

        titleGroups
          .selectAll('text')
          .data((entry) => [entry])
          .join('text')
          .attr('text-anchor', (entry) => entry.align)
          .attr('fill', '#F5F0E8')
          .attr('font-family', 'Cormorant Garamond, serif')
          .attr('font-size', 34)
          .attr('font-weight', 600)
          .attr('letter-spacing', '0.01em')
          .attr('paint-order', 'stroke')
          .attr('stroke', 'rgba(13, 26, 20, 0.58)')
          .attr('stroke-width', 0.65)
          .each(function renderTitle(entry) {
            const text = d3.select(this);
            text.selectAll('*').remove();

            semanticClusters[entry.id].titleLines.forEach((line, index) => {
              text
                .append('tspan')
                .text(line)
                .attr('x', 0)
                .attr('y', index === 0 ? 0 : null)
                .attr('dy', index === 0 ? 0 : 30);
            });
          });
      }
    };

    const render = () => {
      nodeGlow
        .attr('cx', (node) => node.x)
        .attr('cy', (node) => node.y)
        .attr('r', (node) => radiusFor(node) * (node.type === 'theme' ? 3.8 : 3.1));

      link
        .attr('x1', (edge) => edge.source.x)
        .attr('y1', (edge) => edge.source.y)
        .attr('x2', (edge) => edge.target.x)
        .attr('y2', (edge) => edge.target.y)
        .attr('stroke-opacity', (edge) => {
          const sourcePrimary = isPrimaryNode(edge.source, adjacency, isMobile);
          const targetPrimary = isPrimaryNode(edge.target, adjacency, isMobile);
          if (sourcePrimary && targetPrimary) return 0.16;
          if (sourcePrimary || targetPrimary) return 0.08;
          return 0.035;
        })
        .attr('stroke-width', (edge) => {
          const sourcePrimary = isPrimaryNode(edge.source, adjacency, isMobile);
          const targetPrimary = isPrimaryNode(edge.target, adjacency, isMobile);
          return sourcePrimary && targetPrimary ? 1 : 0.7;
        });

      nodeShell.attr('transform', (node) => `translate(${node.x},${node.y})`);

      renderRegions();
    };

    render();

    const clearActiveState = () => {
      circles
        .attr('opacity', (node) => defaultNodeOpacity(node, adjacency, isMobile))
        .attr('r', (node) => radiusFor(node));
      nodeGlow.attr('opacity', (node) => (isPrimaryNode(node, adjacency, isMobile) ? 1 : 0));
      labels.attr('opacity', (node) => defaultLabelOpacity(node, adjacency, isMobile));
      nodeShell.attr('opacity', 1);
      setTooltip((prev) => ({ ...prev, visible: false }));
      render();
    };

    const setActiveState = (activeNode) => {
      nodeShell.filter((node) => node.id === activeNode.id).raise();

      circles
        .attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.14))
        .attr('r', (node) => (node.id === activeNode.id ? radiusFor(node) * 1.28 : radiusFor(node)));

      nodeGlow.attr('opacity', (node) => (isConnected(activeNode, node) ? 1 : 0.1));

      labels.attr('opacity', (node) => {
        if (node.id === activeNode.id) return 1;
        if (isConnected(activeNode, node)) return 1;
        if (node.type === 'theme' || node.type === 'institution') return 0.1;
        return 0.04;
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

    clearActiveState();

    return () => {
      svg.selectAll('*').remove();
    };
  }, [data.edges, data.nodes, isMobile, navigate, size.height, size.width]);

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
