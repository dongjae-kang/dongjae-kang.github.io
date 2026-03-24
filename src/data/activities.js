import cesFoundry from '../assets/images/activities/ces-foundry.jpeg';
import hycMixerPresenting from '../assets/images/activities/hyc-mixer-presenting.jpeg';
import kgsaCareerPoster from '../assets/images/activities/kgsa-career-poster.jpg';
import kgsaCareerRoom from '../assets/images/activities/kgsa-career-room.jpg';
import kaistPodium from '../assets/images/activities/kaist-podium.jpeg';
import upennMixerGroup from '../assets/images/activities/upenn-mixer-group.jpeg';
import upennMixerOpening from '../assets/images/activities/upenn-mixer-opening.jpeg';
import upennMixerStage from '../assets/images/activities/upenn-mixer-stage.jpeg';
import valedictorianGown from '../assets/images/activities/valedictorian-gown.jpeg';
import chiWorkshopMainPage from '../assets/images/research/figures/chi-workshop-main-page.png';
import chiWorkshopAcceptedSubmissions from '../assets/images/research/figures/chi-workshop-accepted-submissions.png';
import naekAppointment from '../assets/images/activities/naek-appointment.jpeg';
import naekGroup from '../assets/images/activities/naek-group.jpeg';
import naekCeremony from '../assets/images/activities/naek-ceremony.jpeg';
import negotiationWorkshop from '../assets/images/activities/negotiation-workshop.jpeg';
import harvardMc1 from '../assets/images/activities/harvard-mc-1.jpeg';
import harvardMc2 from '../assets/images/activities/harvard-mc-2.jpeg';
import studentCouncilTownhall from '../assets/images/activities/student-council-townhall.jpeg';
import studentCouncilMc from '../assets/images/activities/student-council-mc.jpeg';
import orchestraSolo from '../assets/images/life/orchestra-solo.jpeg';
import orchestraGroup from '../assets/images/life/orchestra-group.jpeg';
import orchestraSection from '../assets/images/life/orchestra-section.jpeg';
import orchestraBackstage from '../assets/images/life/orchestra-backstage.jpeg';
import beachSunset from '../assets/images/life/beach-sunset.jpeg';
import beachGroup from '../assets/images/life/beach-group.jpeg';
import futsal from '../assets/images/life/futsal.jpeg';
import friendsDinner from '../assets/images/life/friends-dinner.jpeg';
import intrepidSimulator from '../assets/images/life/intrepid-simulator.jpeg';
import cesFoundryLife from '../assets/images/life/ces-foundry.jpeg';
import kaistEveningShuttle from '../assets/images/archive/kaist-evening-shuttle.jpeg';
import kaistWinterPond from '../assets/images/archive/kaist-winter-pond.jpeg';

// Tier 1: Career-defining activities (full cards with descriptions, tags, links)
// Tier 2: Community & Events (medium cards with short descriptions)
// Tier 3: Off the Clock (photo-focused, date + location only)

export const activities = [
  // ─── TIER 1: ACTIVITIES ───
  {
    id: 'un-youth-forum',
    tier: 1,
    title: 'UN ECOSOC Youth Forum — SDG 9 Respondent',
    date: 'Apr 2026',
    location: 'United Nations Headquarters, New York',
    summary:
      'Selected as Respondent for the SDG 9: Industry, Innovation, and Infrastructure session, representing Columbia University.',
    description:
      'Selected as Respondent for the SDG 9: Industry, Innovation, and Infrastructure session. He will represent Columbia University at United Nations Headquarters in New York.',
    tags: ['UN', 'Platform Governance', 'Speaking'],
    links: [],
    media: { photos: [] },
  },
  {
    id: 'valedictorian',
    tier: 1,
    title: 'KAIST Valedictorian',
    date: 'Feb 2026',
    location: 'Daejeon',
    summary:
      'Delivered the commencement address at KAIST on behalf of the graduating class at a ceremony attended by the President of Korea.',
    description:
      'Kang graduated from KAIST as Valedictorian in February 2026. He delivered the commencement address on behalf of the graduating class at a ceremony attended by the President of the Republic of Korea.',
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
    id: 'chi-2025',
    tier: 1,
    title: 'CHI 2025 Workshop — Yokohama',
    date: 'Apr 2025',
    location: 'Yokohama',
    summary:
      'Presented CrisisNews as sole presenter at the ACM CHI 2025 News Futures Workshop in Yokohama, Japan.',
    description:
      'Kang presented the CrisisNews project at the ACM CHI 2025 News Futures Workshop in Yokohama as the sole presenter. The paper focused on 19 social media crisis cases and their implications for platform design, news systems, and public communication.',
    tags: ['Research', 'Speaking', 'HCI'],
    links: [
      { label: 'Related Research', url: '/research/crisisnews' },
      { label: 'Workshop Paper', url: '/assets/papers/chi-2025-workshop-paper.pdf' },
      { label: 'Workshop Website', url: 'https://sites.google.com/view/newsfutures/home' },
    ],
    media: {
      cover: chiWorkshopMainPage,
      photos: [chiWorkshopMainPage, chiWorkshopAcceptedSubmissions],
    },
  },
  {
    id: 'un-ga-hlw',
    tier: 1,
    title: 'UN General Assembly High-Level Week',
    date: 'Sep 2025',
    location: 'New York',
    summary:
      'Supported Presidential Secretariat operations as Event Assistant at the Permanent Mission of Korea to the United Nations.',
    description:
      'During the 2025 UN General Assembly High-Level Week, Kang served as Event Assistant at the Permanent Mission of the Republic of Korea to the United Nations. The role involved supporting diplomatic event operations during one of the busiest weeks of the UN calendar.',
    tags: ['UN', 'Diplomacy'],
    links: [],
    media: { photos: [] },
  },
  {
    id: 'student-council',
    tier: 1,
    title: 'KAIST Student Council President',
    date: '2022-2023',
    location: 'KAIST',
    summary:
      "Rebuilt the KAIST Undergraduate Student Council after three inactive years and led dialogue around Korea's R&D budget cut.",
    description:
      "As President of the KAIST Undergraduate Student Council, Kang rebuilt an institution that had been inactive for three years. He won election with 52.06% turnout and 88.93% approval, and the administration later recorded the highest satisfaction score in council history at 3.87 out of 4.3. When Korea announced a 16% R&D budget cut, he coordinated dialogue among universities, National Assembly members, and government ministries. That work led to an invitation to write a column in JoongAng Ilbo and coverage in the KAIST Herald.",
    tags: ['Leadership', 'Policy', 'KAIST'],
    links: [
      { label: 'JoongAng Ilbo', url: 'https://www.joongang.co.kr/article/25215586' },
      { label: 'KAIST Herald', url: 'https://herald.kaist.ac.kr/news/articleView.html?idxno=20910' },
    ],
    media: {
      cover: kaistPodium,
      photos: [kaistPodium, studentCouncilTownhall, studentCouncilMc],
    },
  },

  // ─── TIER 2: COMMUNITY & EVENTS ───
  {
    id: 'kgsa-career',
    tier: 2,
    title: 'KGSA Career Event — Organizer & MC',
    date: 'Mar 28, 2026',
    location: 'Columbia University',
    summary:
      "Organized and MC'd a career event featuring speakers from TADA, Lawfully, DeepMind, Merrill Lynch, and the UN.",
    tags: ['Leadership', 'Community'],
    links: [],
    media: {
      cover: kgsaCareerPoster,
      photos: [kgsaCareerPoster, kgsaCareerRoom],
    },
  },
  {
    id: 'hyc-mixer',
    tier: 2,
    title: 'Harvard-Yale-Columbia Mixer — MC',
    date: 'Jan 2026',
    location: 'New York',
    summary:
      'Main MC for a mixer bringing together roughly 200 Korean students from Harvard, Yale, and Columbia.',
    tags: ['Leadership', 'Community'],
    links: [],
    media: {
      cover: hycMixerPresenting,
      photos: [hycMixerPresenting],
    },
  },
  {
    id: 'upenn-mixer',
    tier: 2,
    title: '5-School Mixer at UPenn — MC',
    date: 'Nov 15, 2025',
    location: 'Philadelphia',
    summary:
      'Main MC for a five-school mixer at UPenn attended by roughly 200 Korean students from Penn, Columbia, Johns Hopkins, Princeton, and Rutgers.',
    tags: ['Leadership', 'Community'],
    links: [],
    media: {
      cover: upennMixerGroup,
      photos: [upennMixerGroup, upennMixerOpening, upennMixerStage],
    },
  },
  {
    id: 'harvard-mc',
    tier: 2,
    title: 'Harvard Event — Columbia Quiz MC',
    date: '2025',
    location: 'Harvard University',
    summary:
      "MC'd a Columbia Quiz event at Harvard's Kenneth C. Griffin Graduate School.",
    tags: ['Leadership', 'Community'],
    links: [],
    media: {
      cover: harvardMc1,
      photos: [harvardMc1, harvardMc2],
    },
  },
  {
    id: 'columbia-ai-club',
    tier: 2,
    title: 'Columbia AI Club at SIPA',
    date: '2025-Present',
    location: 'New York',
    summary:
      'Founding board member and Vice President of Research Lab.',
    tags: ['Leadership', 'AI'],
    links: [],
    media: { photos: [] },
  },
  {
    id: 'naek-yehs',
    tier: 2,
    title: 'National Academy of Engineering of Korea (NAEK)',
    date: '2024-2025',
    location: 'Seoul',
    summary:
      'Appointed as Young Engineers Honor Society member by Chairman Kim Ki-nam, former Vice Chairman of Samsung Electronics.',
    tags: ['Engineering', 'Korea'],
    links: [{ label: 'NAEK', url: 'https://www.naek.or.kr/en/engineer' }],
    media: {
      cover: naekAppointment,
      photos: [naekAppointment, naekGroup, naekCeremony],
    },
  },
  {
    id: 'negotiation-studies',
    tier: 2,
    title: 'Korean Association of Negotiation Studies',
    date: 'Jan-Jul 2025',
    location: 'Seoul',
    summary:
      'Student Staff supporting the 19th President, coordinating the Spring Academic Conference and the 30th Anniversary Event.',
    tags: ['Academia', 'Korea'],
    links: [],
    media: {
      cover: negotiationWorkshop,
      photos: [negotiationWorkshop],
    },
  },

  // ─── TIER 3: OFF THE CLOCK ───
  {
    id: 'kaist-orchestra',
    tier: 3,
    title: 'KAIST Orchestra — 1st Trumpet',
    date: 'KAIST years',
    location: 'Daejeon',
    media: {
      cover: orchestraSolo,
      photos: [
        { src: orchestraSolo, caption: 'After a concert' },
        { src: orchestraGroup, caption: 'Full orchestra' },
        { src: orchestraSection, caption: 'Trumpet section' },
        { src: orchestraBackstage, caption: 'Backstage' },
      ],
    },
  },
  {
    id: 'ces-visit',
    tier: 3,
    title: 'CES Visit',
    date: 'Jan 2026',
    location: 'Las Vegas',
    media: {
      cover: cesFoundryLife,
      photos: [{ src: cesFoundryLife, caption: 'CES Foundry' }],
    },
  },
  {
    id: 'intrepid-museum',
    tier: 3,
    title: 'Intrepid Museum Field Trip',
    date: 'Fall 2025',
    location: 'New York',
    media: {
      cover: intrepidSimulator,
      photos: [{ src: intrepidSimulator, caption: 'Flight simulator' }],
    },
  },
  {
    id: 'stanford-visit',
    tier: 3,
    title: 'Stanford Visit',
    date: '2025',
    location: 'Stanford',
    media: { photos: [] },
  },
  {
    id: 'beach-day',
    tier: 3,
    title: 'Beach Day',
    date: 'KAIST years',
    location: 'Korea',
    media: {
      cover: beachSunset,
      photos: [
        { src: beachSunset, caption: 'Sunset football' },
        { src: beachGroup, caption: 'Group photo' },
      ],
    },
  },
  {
    id: 'futsal',
    tier: 3,
    title: 'Futsal',
    date: 'KAIST years',
    location: 'KAIST',
    media: {
      cover: futsal,
      photos: [{ src: futsal, caption: 'After a game' }],
    },
  },
  {
    id: 'friends',
    tier: 3,
    title: 'Friends',
    date: 'KAIST years',
    location: 'Daejeon',
    media: {
      cover: friendsDinner,
      photos: [{ src: friendsDinner, caption: 'Dinner with friends' }],
    },
  },
  {
    id: 'campus-scenes',
    tier: 3,
    title: 'Campus Scenes',
    date: 'KAIST years',
    location: 'KAIST',
    media: {
      cover: kaistWinterPond,
      photos: [
        { src: kaistWinterPond, caption: 'Winter pond' },
        { src: kaistEveningShuttle, caption: 'Evening shuttle' },
      ],
    },
  },
];
