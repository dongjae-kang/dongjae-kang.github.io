import housingThumbnail from '../assets/images/research/housing-thumbnail.png';
import prismThumbnail from '../assets/images/research/prism-thumbnail.png';
import communityNotesTable from '../assets/images/research/community-notes-table.png';
import vinesightThumbnail from '../assets/images/research/vinesight-thumbnail.png';
import housingAppendixA from '../assets/images/research/figures/housing-appendix-a-map.png';
import housingAppendixBC from '../assets/images/research/figures/housing-appendix-bc-starcity.png';
import housingAppendixC from '../assets/images/research/figures/housing-appendix-c-unitmix.png';
import housingAppendixE from '../assets/images/research/figures/housing-appendix-e-timeline.png';
import vinesightCoreValues from '../assets/images/research/figures/vinesight-core-values.png';
import vinesightPipeline from '../assets/images/research/figures/vinesight-pipeline.png';
import vinesightDashboard from '../assets/images/research/figures/vinesight-dashboard.png';
import dcAbsenteeismMemoCover from '../assets/images/research/figures/dc-absenteeism-memo-cover.png';
import dcAbsenteeismPaperCover from '../assets/images/research/figures/dc-absenteeism-paper-cover.png';

export const coursework = [
  {
    id: 'community-notes-risk-assessment',
    title: 'Community Notes Risk Assessment',
    subtitle: 'The Boundary Conditions of Crowdsourced Correction',
    year: 'Spring 2026',
    sortDate: '2026-04-20',
    course: 'Principles & Practice of Online Trust & Safety (TPINIA7008)',
    professor: 'Timothy Bernard',
    semester: 'Spring 2026',
    type: 'Individual',
    summary:
      "A high-level risk assessment of X's Community Notes as crowdsourced correction becomes the default moderation pattern at Meta and YouTube. It maps six boundary conditions, from attachment latency to an unmodeled provenance layer, and pairs each recommendation with its trade-off.",
    description:
      "Written as Meta announced its move to a Community Notes model, this assessment asks under what conditions crowdsourced correction performs as intended. It maps risks through two stylized user journeys, a low-engagement scroller and a high-engagement partisan rater, and identifies six safety gaps: attachment latency, a coverage ceiling on polarizing topics, consensus instability, salience asymmetry, an unmodeled provenance layer in the correction signal, and uneven cross-context portability, illustrated with the comparatively slow development of Korean Wikipedia. Recommendations are organized around the eSafety Commissioner's Safety by Design principles, and each carries an explicit trade-off and implementation challenge. The provenance lens, asking how correction systems treat the origin of information before correction is contemplated, connects the paper to Kang's broader research line.",
    collaborators: ['Individual project'],
    tags: ['Trust & Safety', 'Content Moderation', 'Platform Governance'],
    highlights: [
      'Six boundary conditions mapped with severity and likelihood notations',
      'Provenance treated as an unmodeled input to the correction signal',
      'Each recommendation paired with a trade-off and implementation challenge',
    ],
    heroMedia: {
      src: communityNotesTable,
      alt: 'User journeys and risks table from the Community Notes assessment',
      label: 'Risk Assessment',
    },
    materials: [
      {
        label: 'Risk Assessment',
        note: 'Full assessment with user journeys, gap analysis, and recommendations.',
        url: '/assets/papers/community-notes-risk-assessment.pdf',
      },
    ],
    related: ['crisisnews', 'multi-agent-sim'],
    pdf: '/assets/papers/community-notes-risk-assessment.pdf',
    thumbnail: communityNotesTable,
    gallery: [
      {
        src: communityNotesTable,
        alt: 'User journeys and risks table from the Community Notes assessment',
        caption: 'Two user journeys and the risks each one carries',
      },
    ],
    links: [],
  },
  {
    id: 'prism',
    title: 'PRISM News Platform',
    subtitle: 'A Multi-Perspective News Prototype That Became a Live Service',
    year: 'Fall 2025',
    sortDate: '2025-12-11',
    course: 'Understanding Emerging Technologies (TPINIA7005)',
    professor: 'Laura Scherling and Laurence Wilse-Samson',
    semester: 'Fall 2025',
    type: 'Team (4 members)',
    summary:
      'The original PRISM: a course prototype visualizing how a news story moves across outlets, timelines, and fact-checking references. The concept later grew into the live PRISM daily brief service.',
    description:
      'PRISM began as Columbia SIPA coursework. Kang led the team building the concept and implemented the working prototype independently. The platform visualizes how stories move across outlets, timelines, and fact-checking references so users can compare how the same event is framed. It was built as a response to the limits of single-source news consumption in misinformation-heavy environments. The concept was later rebuilt as a live service publishing daily briefs in Korean and English, covered separately under Projects.',
    collaborators: ['Columbia SIPA project team (4 members)', 'Prototype implemented independently'],
    tags: ['Misinformation', 'Platform Design', 'HCI'],
    highlights: [
      'Maps framing differences across multiple outlets',
      'Combines source comparison, timeline view, and fact-check references',
      'Working prototype implemented and deployed by Kang',
    ],
    heroMedia: {
      src: prismThumbnail,
      alt: 'PRISM prototype interface preview',
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
        note: 'Coursework deliverable covering literature, product logic, and model.',
        url: '/assets/papers/prism-pitch.pdf',
      },
    ],
    related: ['prism-news', 'vinesight-policy-guide', 'crisisnews'],
    liveDemo: 'https://tpi-emerging-tech.netlify.app',
    thumbnail: prismThumbnail,
    gallery: [
      { src: prismThumbnail, alt: 'PRISM prototype interface mockup', caption: 'Prototype interface' },
    ],
    links: [
      { label: 'Demo', url: 'https://tpi-emerging-tech.netlify.app' },
      { label: 'Pitch Deck', url: '/assets/papers/prism-pitch.pdf' },
    ],
  },
  {
    id: 'housing-policy-jungnang-gu',
    title: 'Revitalizing Jungnang-gu',
    subtitle: "A Demand-Driven Inclusive Housing Strategy for Seoul's Marginalized Districts",
    year: 'Fall 2025',
    sortDate: '2025-12-12',
    course: 'Housing Policy and the City (URSP IA7262)',
    professor: 'Annika Lescott-Martinez',
    semester: 'Fall 2025',
    type: 'Individual',
    summary:
      "A policy framework proposing education-anchored mixed-income housing, senior-inclusive dual-tier housing, and anti-gentrification protections for one of Seoul's most underinvested districts. It applies U.S. housing policy theory to South Korea with case studies from Singapore, Chicago, and Seoul.",
    description:
      "This paper applies housing policy frameworks from the United States to a Seoul district that has faced long-term underinvestment and demographic pressure. Kang argues for a demand-driven strategy built around mixed-income housing near education infrastructure, dual-tier housing for older residents, and protections against speculative displacement. The paper combines Seoul-specific demographic analysis with comparative cases from Singapore, Chicago, and earlier Korean redevelopment efforts. It was written as an individual final paper for Columbia SIPA's Housing Policy and the City course.",
    collaborators: ['Individual project'],
    tags: ['Housing Policy', 'Urban Development', 'Seoul', 'Anti-Displacement'],
    highlights: [
      'Focuses on one of Seoul’s most underinvested districts',
      'Combines housing supply strategy with anti-displacement safeguards',
      'Connects U.S. housing theory to the South Korean policy context',
    ],
    heroMedia: {
      src: housingThumbnail,
      alt: 'Cover page of the Jungnang-gu housing strategy paper',
      label: 'Final Paper',
    },
    materials: [
      {
        label: 'Final Paper',
        note: 'Complete course paper with policy framework, cases, and appendix.',
        url: '/assets/papers/housing-policy-jungnang-gu.pdf',
      },
    ],
    related: ['dc-chronic-absenteeism'],
    pdf: '/assets/papers/housing-policy-jungnang-gu.pdf',
    thumbnail: housingThumbnail,
    gallery: [
      {
        src: housingThumbnail,
        alt: 'Cover page of the Jungnang-gu housing strategy paper',
        caption: 'Final paper cover',
      },
      {
        src: housingAppendixA,
        alt: 'Appendix A: Location and Geography of Jungnang-gu in Seoul',
        caption: 'Appendix A: Location and Geography',
      },
      {
        src: housingAppendixBC,
        alt: 'Star City senior housing example',
        caption: 'Senior housing reference (Star City)',
      },
      {
        src: housingAppendixC,
        alt: 'Appendix C: Mixed-Income Housing Unit Mix',
        caption: 'Appendix C: Mixed-Income Housing Unit Mix',
      },
      {
        src: housingAppendixE,
        alt: 'Appendix E: Implementation Timeline',
        caption: 'Appendix E: Implementation Timeline',
      },
    ],
    links: [],
  },
  {
    id: 'dc-chronic-absenteeism',
    title: 'Reducing Chronic Absenteeism in D.C. Public Schools',
    subtitle: 'A Comprehensive Policy Proposal for Mayoral Action',
    year: 'Fall 2025',
    sortDate: '2025-12-10',
    course: 'Urban Policy, Politics, and Public Service (URSPIA7101)',
    professor: 'Michael A. Nutter (former Mayor of Philadelphia)',
    semester: 'Fall 2025',
    type: 'Group (4 members)',
    summary:
      "A five-pillar strategy to address D.C.'s chronic absenteeism crisis, including a Family Engagement Corps, Early Warning Systems, Community Action Hubs, School-Based Health Centers, and an Attendance Leaderboard. It includes a five-year budget, phased implementation plan, and stakeholder analysis.",
    description:
      "This project responds to chronic absenteeism in D.C. Public Schools with a mayoral policy package structured around five interventions: a Family Engagement Corps, Early Warning Systems, Community Action Hubs, School-Based Health Centers, and an Attendance Leaderboard. The work combines a policy memo with a longer research paper, together covering implementation, budget, stakeholder alignment, and delivery risk. Kang contributed to a group project designed for a practical urban policy audience rather than a purely academic one. The project was completed in Michael A. Nutter's course on urban policy, politics, and public service.",
    collaborators: ['Group project (4 members)'],
    tags: ['Education Policy', 'Equity', 'Urban Governance', 'Washington D.C.'],
    highlights: [
      'Addresses absenteeism affecting roughly 40 percent of D.C. students',
      'Pairs implementation design with a five-year budget framework',
      'Includes both a short policy memo and a longer research paper',
    ],
    heroMedia: {
      src: dcAbsenteeismPaperCover,
      alt: 'First page of the chronic absenteeism research paper',
      label: 'Research Paper',
    },
    materials: [
      {
        label: 'Policy Memo',
        note: 'Short memo designed for executive and mayoral decision-making.',
        url: '/assets/papers/dc-absenteeism-memo.pdf',
      },
      {
        label: 'Research Paper',
        note: 'Expanded paper covering evidence, stakeholder design, and implementation.',
        url: '/assets/papers/dc-absenteeism-paper.pdf',
      },
    ],
    pdfs: [
      { label: 'Policy Memo', file: '/assets/papers/dc-absenteeism-memo.pdf' },
      { label: 'Research Paper', file: '/assets/papers/dc-absenteeism-paper.pdf' },
    ],
    related: ['housing-policy-jungnang-gu'],
    thumbnail: dcAbsenteeismMemoCover,
    gallery: [
      {
        src: dcAbsenteeismMemoCover,
        alt: 'Cover page of the chronic absenteeism policy memo',
        caption: 'Policy memo cover',
      },
      {
        src: dcAbsenteeismPaperCover,
        alt: 'Cover page of the chronic absenteeism research paper',
        caption: 'Research paper cover',
      },
    ],
    links: [],
  },
  {
    id: 'vinesight-policy-guide',
    title: 'VineSight Policy Guide',
    subtitle: 'Detecting Disinformation with Transparency, Integrity, and Human-Centered Safeguards',
    year: 'Fall 2025',
    sortDate: '2025-12-08',
    course: 'Understanding Emerging Technologies (TPINIA7005)',
    professor: 'Laura Scherling and Laurence Wilse-Samson',
    semester: 'Fall 2025',
    type: 'Individual',
    summary:
      'A policy guide written for VineSight, an AI-driven disinformation detection startup. It covers human rights by design, a behavioral detection pipeline, GDPR and CCPA compliance, and a transparency framework with public metrics.',
    description:
      'This paper was written as a policy guide for VineSight, a real startup working on AI-based disinformation detection. Kang focuses on how the product should be governed rather than only how it should perform, covering human rights by design, data handling, behavioral detection logic, GDPR and CCPA implications, and a public-facing transparency framework. The project is useful because it treats a live company context as a policy design problem with operational consequences. It was completed as an individual assignment in Understanding Emerging Technologies.',
    collaborators: ['Individual project'],
    tags: ['AI Governance', 'Privacy', 'Disinformation', 'Policy Design'],
    highlights: [
      'Written for a real AI disinformation detection startup',
      'Balances detection goals with transparency and rights protection',
      'Covers both compliance obligations and public accountability',
    ],
    heroMedia: {
      src: vinesightThumbnail,
      alt: 'VineSight policy guide cover',
      label: 'Policy Guide Cover',
    },
    materials: [
      {
        label: 'Policy Guide',
        note: 'Full guide covering product governance, safeguards, and transparency.',
        url: '/assets/papers/vinesight-policy-guide.pdf',
      },
    ],
    related: ['crisisnews', 'prism'],
    pdf: '/assets/papers/vinesight-policy-guide.pdf',
    thumbnail: vinesightThumbnail,
    gallery: [
      {
        src: vinesightThumbnail,
        alt: 'VineSight policy guide cover image',
        caption: 'Cover from the submitted policy guide',
      },
      {
        src: vinesightCoreValues,
        alt: 'Core values diagram from the VineSight policy guide',
        caption: 'Core values diagram',
      },
      {
        src: vinesightPipeline,
        alt: 'Behavioral detection pipeline from the VineSight policy guide',
        caption: 'Behavioral detection pipeline',
      },
      {
        src: vinesightDashboard,
        alt: 'Transparency dashboard from the VineSight policy guide',
        caption: 'Transparency dashboard',
      },
    ],
    links: [],
  },
];
