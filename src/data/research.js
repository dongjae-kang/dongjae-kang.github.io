import crisisnewsThumbnail from '../assets/images/research/crisisnews-thumbnail.png';
import crisisnewsDemo from '../assets/images/research/crisisnews-demo.gif';
import prismThumbnail from '../assets/images/research/prism-thumbnail.png';
import multiAgentSimWorkflow from '../assets/images/research/multi-agent-sim-workflow.png';
import multiAgentSimMethod from '../assets/images/research/multi-agent-sim-method.png';
import crisisnewsPipeline from '../assets/images/research/figures/crisisnews-pipeline.png';
import crisisnewsYearlyDist from '../assets/images/research/figures/crisisnews-yearly-dist.png';
import crisisnewsStakeholderMatrix from '../assets/images/research/figures/crisisnews-stakeholder-matrix.png';

export const research = [
  {
    id: 'crisisnews',
    title: 'CrisisNews',
    year: '2024-2025',
    summary: 'A 20-year dataset of 93,250 news articles mapping how social media crises emerge, escalate, and resolve.',
    description:
      "At KAIST's Collaborative Social Technologies Lab, Kang co-first authored CrisisNews with Jeanne Choi under the supervision of Prof. Joseph Seering. The project introduces the concept of a social media crisis and builds a structured dataset of 93,250 news articles from 31 international sources, covering incidents from 2004 to 2023. A subset of 1,354 articles was manually annotated across four dimensions: stakeholder relationships, online problematic behavior types, platforms, and aftermath. The analysis found that ordinary user communities, rather than influential individuals, were the primary drivers of social media crises. An earlier version was presented by Kang as sole presenter at the ACM CHI 2025 News Futures Workshop in Yokohama. The full dataset and interactive browsing tool were released publicly.",
    collaborators: [
      'Jeanne Choi (co-first author)',
      'Yubin Choi',
      'Juhoon Lee',
      'Prof. Joseph Seering',
    ],
    tags: ['Misinformation', 'Platform Governance', 'Dataset', 'Trust & Safety'],
    highlights: [
      '93,250 articles from 31 international news sources',
      'Incidents spanning 2004 to 2023',
      '1,354 articles manually annotated across four dimensions',
    ],
    heroMedia: {
      src: crisisnewsDemo,
      alt: 'CrisisNews interactive browser demo',
      label: 'Interactive Browser',
    },
    materials: [
      {
        label: 'Dataset Browser',
        note: 'Interactive browsing tool for the released dataset.',
        url: 'https://crisis-news.netlify.app',
      },
      {
        label: 'arXiv Paper',
        note: 'Full paper describing the dataset and core findings.',
        url: 'https://arxiv.org/abs/2510.12243',
      },
      {
        label: 'CHI 2025 Workshop',
        note: 'News Futures workshop page for the Yokohama presentation.',
        url: 'https://sites.google.com/view/newsfutures/home',
      },
      {
        label: 'CHI Workshop Paper',
        note: 'Earlier workshop paper presented at CHI 2025 in Yokohama.',
        url: '/assets/papers/chi-2025-workshop-paper.pdf',
      },
    ],
    links: [
      { label: 'arXiv', url: 'https://arxiv.org/abs/2510.12243' },
      { label: 'Dataset', url: 'https://crisis-news.netlify.app' },
      { label: 'CHI 2025 Workshop', url: 'https://sites.google.com/view/newsfutures/home' },
      { label: 'CHI Workshop Paper', url: '/assets/papers/chi-2025-workshop-paper.pdf' },
    ],
    related: ['prism', 'beyond-removal', 'vinesight-policy-guide'],
    thumbnail: crisisnewsThumbnail,
    gallery: [
      { src: crisisnewsThumbnail, alt: 'CrisisNews dataset overview', caption: 'Dataset overview' },
      { src: crisisnewsDemo, alt: 'CrisisNews browser demo', caption: 'Public browser demo' },
      { src: crisisnewsPipeline, alt: 'CrisisNews dataset pipeline figure', caption: 'Dataset pipeline figure' },
      { src: crisisnewsYearlyDist, alt: 'Yearly distribution of social media crises', caption: 'Yearly distribution, 2004 to 2023' },
      {
        src: crisisnewsStakeholderMatrix,
        alt: 'Stakeholder relationship matrix from CrisisNews',
        caption: 'Stakeholder relationship matrix',
      },
    ],
  },
  {
    id: 'prism',
    title: 'PRISM',
    year: '2025',
    summary:
      'A multi-perspective news platform that traces how a story moves across sources, timelines, and fact-checking references.',
    description:
      'PRISM began as Columbia SIPA coursework. Kang led the team building the concept and implemented the working prototype independently. The platform visualizes how stories move across outlets, timelines, and fact-checking references so users can compare how the same event is framed. It was built as a response to the limits of single-source news consumption in misinformation-heavy environments.',
    courseContext: 'Understanding Emerging Technologies (TPINIA7005), Prof. Laura Scherling and Laurence Wilse-Samson, Fall 2025',
    collaborators: ['Columbia SIPA project team (4 members)', 'Prototype implemented independently'],
    tags: ['Misinformation', 'Platform Design', 'HCI'],
    highlights: [
      'Maps framing differences across multiple outlets',
      'Combines source comparison, timeline view, and fact-check references',
      'Working prototype implemented and deployed by Kang',
    ],
    heroMedia: {
      src: prismThumbnail,
      alt: 'PRISM product interface preview',
      label: 'Prototype Preview',
    },
    materials: [
      {
        label: 'Live Demo',
        note: 'Deployed prototype showing how the platform works end to end.',
        url: 'https://tpi-emerging-tech.netlify.app',
      },
      {
        label: 'Course Pitch Deck',
        note: 'Related coursework deliverable covering literature, product logic, and model.',
        url: '/assets/papers/prism-pitch.pdf',
      },
    ],
    related: ['crisisnews', 'multi-agent-sim', 'vinesight-policy-guide'],
    liveDemo: 'https://tpi-emerging-tech.netlify.app',
    links: [
      { label: 'Demo', url: 'https://tpi-emerging-tech.netlify.app' },
      { label: 'Pitch Deck', url: '/assets/papers/prism-pitch.pdf' },
    ],
    thumbnail: prismThumbnail,
    gallery: [
      { src: prismThumbnail, alt: 'PRISM interface mockup', caption: 'Prototype interface' },
    ],
  },
  {
    id: 'beyond-removal',
    title: 'Beyond Removal',
    year: '2026',
    summary:
      "A term paper that maps crisis cases to Goldman's moderation remedies framework and asks what platforms do besides removal.",
    description:
      "Beyond Removal is a Spring 2026 Trust & Safety paper built on the CrisisNews dataset. It maps documented platform responses during crisis events onto Goldman's framework for content moderation remedies. The project focuses on the gap between blunt takedown logic and more graduated interventions such as friction, labeling, and distribution changes. It asks which remedies platforms actually use, where those responses fall short, and what more proportionate governance could look like.",
    courseContext: 'Trust & Safety (TPIN7008IA), Prof. Tim Bernard, Spring 2026',
    related: ['crisisnews', 'multi-agent-sim'],
    collaborators: ['Individual project'],
    tags: ['Content Moderation', 'Platform Governance'],
    highlights: [
      'Built directly on CrisisNews case material',
      'Uses Goldman’s remedies framework to classify interventions',
      'Focuses on measures beyond removal and takedown',
    ],
    materials: [
      {
        label: 'Working Paper',
        note: 'Course paper. Public file not yet attached to the site.',
      },
    ],
    links: [],
    thumbnail: null,
    gallery: [],
  },
  {
    id: 'multi-agent-sim',
    title: 'Multi-Agent Simulation',
    year: '2026',
    summary:
      'A Python agent-based model comparing AI fact-check labels with accuracy nudges in repeated information-sharing environments.',
    description:
      'This Spring 2026 Ethics of Media project uses a Python multi-agent simulation to compare AI fact-check labels with accuracy nudges. The model tests how different intervention designs affect sharing behavior across heterogeneous agents over repeated rounds. Its central result is that nudges prompting people to think independently outperform labels that outsource judgment to the system. The project combines a policy question with a simple computational model rather than treating the two as separate problems.',
    courseContext: 'Ethics of Media (JOUR6998IA), Columbia SIPA, Spring 2026',
    related: ['crisisnews', 'prism', 'beyond-removal'],
    collaborators: ['Individual project'],
    tags: ['Misinformation', 'AI', 'Simulation'],
    highlights: [
      'Python agent-based model for repeated sharing environments',
      'Compares AI fact-check labels against accuracy nudges',
      'Finds that nudges outperform labels that replace human judgment',
    ],
    heroMedia: {
      src: multiAgentSimWorkflow,
      alt: 'Multi-agent simulation workflow',
      label: 'Workflow',
    },
    materials: [
      {
        label: 'Workflow Figure',
        note: 'System workflow used to explain the simulation design.',
      },
      {
        label: 'Method Figure',
        note: 'Supporting diagram for the agent setup and intervention logic.',
      },
    ],
    links: [],
    thumbnail: multiAgentSimWorkflow,
    gallery: [
      { src: multiAgentSimWorkflow, alt: 'Multi-agent simulation workflow', caption: 'Workflow overview' },
      { src: multiAgentSimMethod, alt: 'Multi-agent simulation method figure', caption: 'Method figure' },
    ],
  },
  {
    id: 'misinfo-interviews',
    title: "Who Decides What's True?",
    year: '2026',
    summary:
      'An interview-based study on the ethics of combating misinformation, triangulating perspectives from truth measurement, truth production, and truth\'s legal boundaries.',
    description:
      "This Spring 2026 study examines how organizations that combat misinformation navigate the tension between addressing false information and protecting free expression. Kang conducted semi-structured interviews with three figures spanning the information ecosystem: Steven Brill and Gordon Crovitz (Co-CEOs of NewsGuard) on truth measurement, Mike Abrams (Deputy Editor for Trust at The New York Times) on truth production, and Jennifer Jones (Staff Attorney at Columbia's Knight First Amendment Institute) on truth's legal boundaries. Transcripts were thematically coded and interpreted through the Markkula Center's Rights Lens. For the NYT conversation, Kang independently designed and built two interactive demos to ground the interview in concrete platform-journalism interfaces.",
    courseContext: 'Ethics of Media, Technology, and Design, Prof. Laura Scherling, Columbia SIPA, Spring 2026',
    collaborators: ['Individual project'],
    tags: ['Misinformation', 'Platform Governance', 'Trust & Safety', 'Journalism Ethics'],
    highlights: [
      'Three semi-structured interviews across measurement, production, and legal boundaries',
      'Thematic coding and rights-based framework analysis',
      'Two interactive demos independently designed and built for the NYT interview',
    ],
    materials: [
      {
        label: 'Article Trust Layer Demo',
        note: 'Interactive demo adding a transparency layer inside a live New York Times article page.',
        url: '/demos/article-trust-layer.html',
      },
      {
        label: 'Social Media Trust Extension Demo',
        note: 'Interactive demo surfacing NYT trust signals beside X posts referencing Times journalism.',
        url: '/demos/social-media-trust.html',
      },
    ],
    links: [
      { label: 'Article Trust Layer Demo', url: '/demos/article-trust-layer.html' },
      { label: 'Social Media Trust Extension Demo', url: '/demos/social-media-trust.html' },
    ],
    related: ['crisisnews', 'prism', 'multi-agent-sim'],
    thumbnail: null,
    gallery: [],
  },
];
