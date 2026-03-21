import housingThumbnail from '../assets/images/research/housing-thumbnail.png';
import prismThumbnail from '../assets/images/research/prism-thumbnail.png';
import vinesightThumbnail from '../assets/images/research/vinesight-thumbnail.png';
import housingDemographicTable from '../assets/images/research/figures/housing-demographic-table.png';
import housingImplementationTimeline from '../assets/images/research/figures/housing-implementation-timeline.png';
import prismMockupDetail from '../assets/images/research/figures/prism-mockup-detail.png';
import vinesightCoreValues from '../assets/images/research/figures/vinesight-core-values.png';
import vinesightPipeline from '../assets/images/research/figures/vinesight-pipeline.png';
import vinesightDashboard from '../assets/images/research/figures/vinesight-dashboard.png';
import dcAbsenteeismMemoCover from '../assets/images/research/figures/dc-absenteeism-memo-cover.png';
import dcAbsenteeismPaperCover from '../assets/images/research/figures/dc-absenteeism-paper-cover.png';

export const coursework = [
  {
    id: 'housing-policy-jungnang-gu',
    title: 'Revitalizing Jungnang-gu',
    subtitle: "A Demand-Driven Inclusive Housing Strategy for Seoul's Marginalized Districts",
    year: 'Fall 2025',
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
      alt: 'Housing strategy appendix map for Jungnang-gu',
      label: 'Appendix Map',
    },
    materials: [
      {
        label: 'Final Paper',
        note: 'Complete course paper with policy framework, cases, and appendix.',
        url: '/assets/papers/housing-policy-jungnang-gu.pdf',
      },
    ],
    pdf: '/assets/papers/housing-policy-jungnang-gu.pdf',
    thumbnail: housingThumbnail,
    gallery: [
      {
        src: housingThumbnail,
        alt: 'Map from the Jungnang-gu housing paper appendix',
        caption: 'Appendix map from the final paper',
      },
      {
        src: housingDemographicTable,
        alt: 'Demographic comparison table from the Jungnang-gu housing paper',
        caption: 'Demographic comparison table',
      },
      {
        src: housingImplementationTimeline,
        alt: 'Implementation timeline from the Jungnang-gu housing paper',
        caption: 'Ten-year implementation timeline',
      },
    ],
    links: [],
  },
  {
    id: 'dc-chronic-absenteeism',
    title: 'Reducing Chronic Absenteeism in D.C. Public Schools',
    subtitle: 'A Comprehensive Policy Proposal for Mayoral Action',
    year: 'Fall 2025',
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
    id: 'prism-product-pitch',
    title: 'PRISM: See The Full Spectrum',
    subtitle: 'A Multi-Perspective Platform for Democratic Resilience',
    year: 'Fall 2025',
    course: 'Understanding Emerging Technologies (TPINIA7005)',
    professor: 'Laura Scherling and Laurence Wilse-Samson',
    semester: 'Fall 2025',
    type: 'Group (4 members)',
    summary:
      'A product pitch for a platform that maps news coverage across the political spectrum, integrates fact-checking, and tracks how stories evolve over time. It includes a literature review, competitor analysis, business model, and UI mockups. The deployed prototype was fully built by Kang.',
    description:
      'This coursework entry documents PRISM as an academic deliverable rather than only as a working product. The pitch deck combines a literature review, competitor analysis, proposed product logic, business framing, and interface mockups for a platform designed to help users compare how the same event is framed across sources. While the course deliverable was a group project, Kang independently built and deployed the working prototype linked on the site. The result is useful because it shows both the paper logic and the actual implementation.',
    collaborators: ['Group project (4 members)', 'Prototype implemented independently by Kang'],
    tags: ['Misinformation', 'Media Literacy', 'Platform Design', 'Product'],
    highlights: [
      'Academic pitch deck and deployed prototype shown side by side',
      'Combines product logic, business framing, and interface design',
      'Useful counterpart to the separate PRISM research/project entry',
    ],
    heroMedia: {
      src: prismThumbnail,
      alt: 'PRISM interface mockup from the product pitch',
      label: 'Pitch Visual',
    },
    materials: [
      {
        label: 'Pitch Deck',
        note: 'Full course deliverable with literature review, model, and product framing.',
        url: '/assets/papers/prism-pitch.pdf',
      },
      {
        label: 'Live Demo',
        note: 'Deployed prototype implemented by Kang.',
        url: 'https://tpi-emerging-tech.netlify.app/',
      },
    ],
    pdf: '/assets/papers/prism-pitch.pdf',
    liveDemo: 'https://tpi-emerging-tech.netlify.app/',
    thumbnail: prismThumbnail,
    gallery: [
      {
        src: prismThumbnail,
        alt: 'PRISM interface mockup from coursework pitch deck',
        caption: 'Course pitch mockup',
      },
      {
        src: prismMockupDetail,
        alt: 'Detailed PRISM interface mockup from the pitch deck appendix',
        caption: 'Appendix UI mockup from the pitch deck',
      },
    ],
    links: [{ label: 'Live Demo', url: 'https://tpi-emerging-tech.netlify.app/' }],
  },
  {
    id: 'vinesight-policy-guide',
    title: 'VineSight Policy Guide',
    subtitle: 'Detecting Disinformation with Transparency, Integrity, and Human-Centered Safeguards',
    year: 'Fall 2025',
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
