import cesFoundry from '../assets/images/activities/ces-foundry.jpeg';
import hycMixerPresenting from '../assets/images/activities/hyc-mixer-presenting.jpeg';
import kgsaCareerPoster from '../assets/images/activities/kgsa-career-poster.jpg';
import kgsaCareerRoom from '../assets/images/activities/kgsa-career-room.jpg';
import kaistPodium from '../assets/images/activities/kaist-podium.jpeg';
import upennMixerGroup from '../assets/images/activities/upenn-mixer-group.jpeg';
import upennMixerOpening from '../assets/images/activities/upenn-mixer-opening.jpeg';
import upennMixerStage from '../assets/images/activities/upenn-mixer-stage.jpeg';
import valedictorianGown from '../assets/images/activities/valedictorian-gown.jpeg';

export const activities = [
  {
    id: 'valedictorian',
    title: 'KAIST Valedictorian',
    date: 'Feb 2026',
    summary:
      'Delivered the commencement address at KAIST on behalf of the graduating class at a ceremony attended by the President of Korea.',
    description:
      'Kang graduated from KAIST as Valedictorian in February 2026. He delivered the commencement address on behalf of the graduating class at a ceremony attended by the President of the Republic of Korea. The speech is available publicly and is embedded on this site.',
    tags: ['Leadership', 'KAIST'],
    links: [{ label: 'Video', url: 'https://www.youtube.com/watch?v=U7m4LpyHffk' }],
    media: {
      cover: valedictorianGown,
      youtube: 'https://www.youtube.com/watch?v=U7m4LpyHffk',
      youtubeNote: 'Speech starts at 1:15:02',
      photos: [valedictorianGown],
    },
  },
  {
    id: 'un-youth-forum',
    title: 'UN ECOSOC Youth Forum - SDG 9 Application',
    date: 'Apr 2026',
    summary:
      'Applied to speak at the SDG 9: Industry, Innovation, and Infrastructure session, representing Columbia University.',
    description:
      'Applied to speak at the SDG 9: Industry, Innovation, and Infrastructure session, representing Columbia University. Selection results are pending as of March 2026.',
    tags: ['UN', 'Platform Governance', 'Speaking'],
    links: [],
    media: {
      // PHOTO: Owner will provide
      photos: [],
    },
  },
  {
    id: 'un-ga-hlw',
    title: 'UN General Assembly High-Level Week',
    date: 'Sep 2025',
    summary:
      'Supported Presidential Secretariat operations as Event Assistant at the Permanent Mission of Korea to the United Nations.',
    description:
      'During the 2025 UN General Assembly High-Level Week, Kang served as Event Assistant at the Permanent Mission of the Republic of Korea to the United Nations. The role involved supporting diplomatic event operations during one of the busiest weeks of the UN calendar.',
    tags: ['UN', 'Diplomacy'],
    links: [],
    media: {
      // PHOTO: Owner will provide
      photos: [],
    },
  },
  {
    id: 'ces',
    title: 'CES Visit',
    date: 'Jan 2026',
    summary:
      'Visited the Consumer Electronics Show, exploring developments in AI hardware, autonomous systems, and consumer technology.',
    description:
      'Visited the Consumer Electronics Show, exploring developments in AI hardware, autonomous systems, and consumer technology.',
    tags: ['Technology', 'Industry'],
    links: [],
    media: {
      cover: cesFoundry,
      photos: [cesFoundry],
    },
  },
  {
    id: 'stanford',
    title: 'Stanford Visit',
    date: '2025',
    summary: 'Visited Stanford University.',
    description: 'Visited Stanford University.',
    tags: ['Academia'],
    links: [],
    media: {
      // PHOTO: Owner will provide
      photos: [],
    },
  },
  {
    id: 'hyc-mixer',
    title: 'Harvard-Yale-Columbia Korean Student Mixer - MC',
    date: 'Jan 2026',
    summary:
      'Served as main MC for a mixer bringing together roughly 200 Korean students from Harvard, Yale, and Columbia.',
    description:
      'Kang served as the main MC for a tri-school mixer connecting Korean students from Harvard, Yale, and Columbia. He led the program for a room of roughly 200 attendees.',
    tags: ['Leadership', 'Community'],
    links: [],
    media: {
      cover: hycMixerPresenting,
      photos: [hycMixerPresenting],
    },
  },
  {
    id: 'upenn-mixer',
    title: '5-School Mixer at UPenn - MC',
    date: 'Nov 15, 2025',
    summary:
      'Served as main MC for a five-school mixer at Penn attended by roughly 200 Korean students.',
    description:
      'At the University of Pennsylvania, Kang served as the main MC for a five-school mixer bringing together Korean students from Penn, Columbia, Johns Hopkins, Princeton, and Rutgers. He led the program in a room of roughly 200 attendees.',
    tags: ['Leadership', 'Community'],
    links: [],
    media: {
      cover: upennMixerGroup,
      photos: [upennMixerGroup, upennMixerOpening, upennMixerStage],
    },
  },
  {
    id: 'student-council',
    title: 'KAIST Student Council President',
    date: '2022-2023',
    summary:
      'Rebuilt the KAIST Undergraduate Student Council after three inactive years and led dialogue around Korea\'s R&D budget cut.',
    description:
      'As President of the KAIST Undergraduate Student Council, Kang rebuilt an institution that had been inactive for three years. He won election with 52.06% turnout and 88.93% approval, and the administration later recorded the highest satisfaction score in council history at 3.87 out of 4.3. When Korea announced a 16% R&D budget cut, he coordinated dialogue among universities, National Assembly members, and government ministries instead of choosing confrontation. That work led to an invitation to write a column in JoongAng Ilbo and coverage in the KAIST Herald.',
    tags: ['Leadership', 'Policy', 'KAIST'],
    links: [
      { label: 'JoongAng Ilbo', url: 'https://www.joongang.co.kr/article/25215586' },
      { label: 'KAIST Herald', url: 'https://herald.kaist.ac.kr/news/articleView.html?idxno=20910' },
    ],
    media: {
      cover: kaistPodium,
      photos: [kaistPodium],
    },
  },
  {
    id: 'chi-2025',
    title: 'CHI 2025 Workshop Presentation - Yokohama',
    date: 'Apr 2025',
    summary:
      'Presented CrisisNews as sole presenter at the ACM CHI 2025 Workshop in Yokohama, Japan.',
    description:
      'Kang presented the CrisisNews project at the ACM CHI 2025 Workshop in Yokohama as the sole presenter. The presentation shared findings from two decades of social media crisis patterns with an HCI audience interested in platforms, online harm, and public communication.',
    tags: ['Research', 'Speaking', 'HCI'],
    links: [{ label: 'Related Research', url: '/research/crisisnews' }],
    media: {
      // PHOTO: Owner will provide
      photos: [],
    },
  },
  {
    id: 'kgsa-career',
    title: 'KGSA Career Event - Organizer & MC',
    date: 'Mar 28, 2026',
    summary:
      'Organized and MC\'d a KGSA career event featuring speakers from TADA, Lawfully, DeepMind, Merrill Lynch, and the UN.',
    description:
      'As Career Chair of the Korean Graduate Student Association at Columbia, Kang organized and emceed a career event with five speakers working across technology, law, finance, and the United Nations. The event featured speakers from TADA, Lawfully, DeepMind, Merrill Lynch, and the UN.',
    tags: ['Leadership', 'Community'],
    links: [],
    media: {
      cover: kgsaCareerPoster,
      photos: [kgsaCareerPoster, kgsaCareerRoom],
    },
  },
  {
    id: 'participatory-budget',
    title: 'Participatory Budget Committee - Seoul Jungnang-gu',
    date: '2017-2018',
    summary:
      'Served as the sole youth representative on the Jungnang-gu participatory budget committee at age seventeen.',
    description:
      'Kang served as the only youth representative among forty committee members on Seoul Jungnang-gu\'s participatory budget committee. The committee allocated roughly one million dollars each year across more than thirty local projects.',
    tags: ['Public Service', 'Participatory Governance'],
    links: [],
    media: {
      // PHOTO: Owner will provide
      photos: [],
    },
  },
  {
    id: 'youth-policy',
    title: 'Youth Policy Coordination Committee - Daejeon',
    date: '2023-2025',
    summary:
      'Served on Daejeon\'s Youth Policy Coordination Committee, reviewing projects across multiple municipal departments.',
    description:
      'Kang served as one of thirty members of Daejeon\'s Youth Policy Coordination Committee from 2023 to 2025. The committee reviewed more than seventy projects spanning nine municipal departments.',
    tags: ['Public Service', 'Youth Policy'],
    links: [],
    media: {
      // PHOTO: Owner will provide
      photos: [],
    },
  },
  {
    id: 'columbia-ai-club',
    title: 'Columbia AI Club at SIPA',
    date: '2025-Present',
    summary:
      'Founding board member and Vice President of Research Lab for the Columbia AI Club at SIPA.',
    description:
      'Kang is a founding board member of the Columbia AI Club at SIPA and serves as Vice President of Research Lab. The role includes helping build the club\'s research programming and institutional structure.',
    tags: ['Leadership', 'AI', 'Columbia SIPA'],
    links: [],
    media: {
      // PHOTO: Owner will provide
      photos: [],
    },
  },
];
