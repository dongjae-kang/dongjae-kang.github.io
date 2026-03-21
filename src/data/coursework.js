import housingThumbnail from '../assets/images/research/housing-thumbnail.png';
import prismThumbnail from '../assets/images/research/prism-thumbnail.png';
import vinesightThumbnail from '../assets/images/research/vinesight-thumbnail.png';

export const coursework = [
  {
    id: 'housing-policy-jungnang-gu',
    title: 'Revitalizing Jungnang-gu',
    subtitle: "A Demand-Driven Inclusive Housing Strategy for Seoul's Marginalized Districts",
    course: 'Housing Policy and the City (URSP IA7262)',
    professor: 'Annika Lescott-Martinez',
    semester: 'Fall 2025',
    type: 'Individual',
    summary:
      "A policy framework proposing education-anchored mixed-income housing, senior-inclusive dual-tier housing, and anti-gentrification protections for one of Seoul's most underinvested districts. It applies U.S. housing policy theory to South Korea with case studies from Singapore, Chicago, and Seoul.",
    tags: ['Housing Policy', 'Urban Development', 'Seoul', 'Anti-Displacement'],
    pdf: '/assets/papers/housing-policy-jungnang-gu.pdf',
    thumbnail: housingThumbnail,
  },
  {
    id: 'dc-chronic-absenteeism',
    title: 'Reducing Chronic Absenteeism in D.C. Public Schools',
    subtitle: 'A Comprehensive Policy Proposal for Mayoral Action',
    course: 'Urban Policy, Politics, and Public Service (URSPIA7101)',
    professor: 'Michael A. Nutter (former Mayor of Philadelphia)',
    semester: 'Fall 2025',
    type: 'Group (4 members)',
    summary:
      "A five-pillar strategy to address D.C.'s chronic absenteeism crisis, including a Family Engagement Corps, Early Warning Systems, Community Action Hubs, School-Based Health Centers, and an Attendance Leaderboard. It includes a five-year budget, phased implementation plan, and stakeholder analysis.",
    tags: ['Education Policy', 'Equity', 'Urban Governance', 'Washington D.C.'],
    pdfs: [
      { label: 'Policy Memo', file: '/assets/papers/dc-absenteeism-memo.pdf' },
      { label: 'Research Paper', file: '/assets/papers/dc-absenteeism-paper.pdf' },
    ],
    thumbnail: null,
  },
  {
    id: 'prism-product-pitch',
    title: 'PRISM: See The Full Spectrum',
    subtitle: 'A Multi-Perspective Platform for Democratic Resilience',
    course: 'Understanding Emerging Technologies (TPINIA7005)',
    professor: 'Laura Scherling and Laurence Wilse-Samson',
    semester: 'Fall 2025',
    type: 'Group (4 members)',
    summary:
      'A product pitch for a platform that maps news coverage across the political spectrum, integrates fact-checking, and tracks how stories evolve over time. It includes a literature review, competitor analysis, business model, and UI mockups. The deployed prototype was fully built by Kang.',
    tags: ['Misinformation', 'Media Literacy', 'Platform Design', 'Product'],
    pdf: '/assets/papers/prism-pitch.pdf',
    liveDemo: 'https://tpi-emerging-tech.netlify.app/',
    thumbnail: prismThumbnail,
  },
  {
    id: 'vinesight-policy-guide',
    title: 'VineSight Policy Guide',
    subtitle: 'Detecting Disinformation with Transparency, Integrity, and Human-Centered Safeguards',
    course: 'Understanding Emerging Technologies (TPINIA7005)',
    professor: 'Laura Scherling and Laurence Wilse-Samson',
    semester: 'Fall 2025',
    type: 'Individual',
    summary:
      'A policy guide written for VineSight, an AI-driven disinformation detection startup. It covers human rights by design, a behavioral detection pipeline, GDPR and CCPA compliance, and a transparency framework with public metrics.',
    tags: ['AI Governance', 'Privacy', 'Disinformation', 'Policy Design'],
    pdf: '/assets/papers/vinesight-policy-guide.pdf',
    thumbnail: vinesightThumbnail,
  },
];
