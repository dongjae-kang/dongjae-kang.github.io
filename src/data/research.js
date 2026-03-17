import crisisnewsThumbnail from '../assets/images/research/crisisnews-thumbnail.png';
import prismThumbnail from '../assets/images/research/prism-thumbnail.png';
import multiAgentSimWorkflow from '../assets/images/research/multi-agent-sim-workflow.png';
import multiAgentSimMethod from '../assets/images/research/multi-agent-sim-method.png';

export const research = [
  {
    id: 'crisisnews',
    title: 'CrisisNews',
    year: '2024-2025',
    summary: 'A 20-year dataset of 93,250 news articles used to study how social media crises spread and escalate.',
    description:
      "At KAIST's Collaborative Social Technologies Lab, Kang co-first authored CrisisNews with Jeanne Choi under the supervision of Joseph Seering. The project built a dataset of 93,250 news articles and structured crisis records covering two decades of social media incidents. One finding was that ordinary users, rather than influencers or bots, accounted for most misinformation propagation across the cases analyzed. Kang presented the work as sole presenter at the ACM CHI 2025 Workshop in Yokohama. The dataset and browsing interface were released publicly for further research.",
    collaborators: ['Jeanne Choi', 'Prof. Joseph Seering'],
    tags: ['Misinformation', 'Platform Governance', 'Data Analysis'],
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2510.12243' },
      { label: 'Website', url: 'https://crisis-news.netlify.app' },
    ],
    thumbnail: crisisnewsThumbnail,
    gallery: [crisisnewsThumbnail],
  },
  {
    id: 'prism',
    title: 'PRISM',
    year: '2025',
    summary:
      'A multi-perspective news platform that traces how a story moves across sources, timelines, and fact-checking references.',
    description:
      'PRISM began as Columbia SIPA coursework. Kang led the team building the concept and implemented the working prototype independently. The platform visualizes how stories move across outlets, timelines, and fact-checking references so users can compare how the same event is framed. It was built as a response to the limits of single-source news consumption in misinformation-heavy environments.',
    collaborators: ['Columbia SIPA project team', 'Prototype implemented independently'],
    tags: ['Misinformation', 'Platform Design', 'HCI'],
    links: [{ label: 'Demo', url: 'https://tpi-emerging-tech.netlify.app' }],
    thumbnail: prismThumbnail,
    gallery: [prismThumbnail],
  },
  {
    id: 'beyond-removal',
    title: 'Beyond Removal',
    year: 'Spring 2026',
    summary:
      "A term paper that maps crisis cases to Goldman's moderation remedies framework and asks what platforms do besides removal.",
    description:
      "Beyond Removal is a Spring 2026 Trust & Safety paper built on the CrisisNews dataset. It maps documented platform responses during crisis events onto Goldman's framework for content moderation remedies. The project focuses on the gap between blunt takedown logic and more graduated interventions such as friction, labeling, and distribution changes. It asks which remedies platforms actually use, where those responses fall short, and what more proportionate governance could look like.",
    collaborators: ['Columbia SIPA Trust & Safety course'],
    tags: ['Content Moderation', 'Platform Governance'],
    links: [],
    thumbnail: null,
    gallery: [],
  },
  {
    id: 'multi-agent-sim',
    title: 'Misinformation Multi-Agent Simulation',
    year: 'Spring 2026',
    summary:
      'A Python agent-based model comparing AI fact-check labels with accuracy nudges in repeated information-sharing environments.',
    description:
      'This Spring 2026 Ethics of Media project uses a Python multi-agent simulation to compare AI fact-check labels with accuracy nudges. The model tests how different intervention designs affect sharing behavior across heterogeneous agents over repeated rounds. Its central result is that nudges prompting people to think independently outperform labels that outsource judgment to the system. The project combines a policy question with a simple computational model rather than treating the two as separate problems.',
    collaborators: ['Columbia SIPA Ethics of Media course'],
    tags: ['Misinformation', 'AI', 'Simulation'],
    links: [],
    thumbnail: multiAgentSimWorkflow,
    gallery: [multiAgentSimWorkflow, multiAgentSimMethod],
  },
  {
    id: 'ai-in-smes',
    title: 'AI in SMEs',
    year: '2024',
    summary:
      'An undergraduate thesis on how Korea can expand AI adoption among small and medium enterprises more equitably.',
    description:
      'AI in SMEs was Kang\'s undergraduate thesis at KAIST. It examined why Korean small and medium enterprises face uneven access to AI adoption, including capital constraints, organizational readiness, and limited technical capacity. The thesis proposed policy responses around financing, shared infrastructure, and public support for adoption. It asked how technical change can spread more evenly rather than concentrating only in large firms.',
    collaborators: ['KAIST undergraduate thesis'],
    tags: ['AI Policy', 'Equitable Development'],
    links: [],
    thumbnail: null,
    gallery: [],
  },
];
