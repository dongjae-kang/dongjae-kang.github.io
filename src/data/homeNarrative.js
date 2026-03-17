import crisisnewsThumbnail from '../assets/images/research/crisisnews-thumbnail.png';
import prismThumbnail from '../assets/images/research/prism-thumbnail.png';
import kgsaPoster from '../assets/images/activities/kgsa-career-poster.jpg';

export const homeNarrative = {
  eyebrow: 'Technology, policy, and public life',
  title: 'Studying how technology shapes society, and how public institutions can guide it more fairly.',
  intro:
    'Dongjae (Jack) Kang works at the intersection of platform governance, misinformation, and public leadership. His work connects research, institutional practice, and a long-term commitment to more equitable technological development.',
  quote:
    'Technology is never neutral. It either bridges divides or deepens them.',
  cta: {
    primary: 'Learn More',
    secondary: 'Explore Research',
  },
  chapters: [
    {
      label: 'Origin',
      title: 'The story starts with unequal opportunity',
      body:
        'Growing up in Jungnang-gu, he watched talent leave and opportunity cluster elsewhere. That experience still anchors his work: how policy can keep technology from reinforcing the same divides.',
      link: '/about',
    },
    {
      label: 'Research',
      title: 'Platform design shapes public discourse',
      body:
        'At KAIST and Columbia SIPA, he has studied social media crises, misinformation, and multi-perspective information systems through projects like CrisisNews and PRISM.',
      link: '/research',
    },
    {
      label: 'Practice',
      title: 'Research matters only if it changes institutions',
      body:
        'He rebuilt KAIST’s student council after a three-year vacancy, coordinated an 11-university coalition on Korea’s R&D budget policy, and continues to work across civic, diplomatic, and community settings.',
      link: '/activities',
    },
  ],
  featured: [
    {
      label: 'Research',
      title: 'CrisisNews',
      meta: 'KAIST CSTL, 2024-2025',
      description:
        'A 20-year dataset of social media crises built to understand how harmful online behavior escalates into wider public problems.',
      link: '/research/crisisnews',
      image: crisisnewsThumbnail,
    },
    {
      label: 'Research',
      title: 'PRISM',
      meta: 'Columbia SIPA, 2025',
      description:
        'A multi-perspective platform prototype that helps users reconstruct the full information picture around polarized events.',
      link: '/research/prism',
      image: prismThumbnail,
    },
    {
      label: 'Leadership',
      title: 'KGSA Career Event',
      meta: 'Columbia, 2026',
      description:
        'An event Jack organized and MC’d to connect Korean graduate students with leaders from technology, finance, law, and the United Nations.',
      link: '/activities/kgsa-career',
      image: kgsaPoster,
    },
  ],
};
