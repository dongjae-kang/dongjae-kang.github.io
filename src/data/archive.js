import cesFoundry from '../assets/images/activities/ces-foundry.jpeg';
import valedictorianGown from '../assets/images/activities/valedictorian-gown.jpeg';
import kaistEveningShuttle from '../assets/images/archive/kaist-evening-shuttle.jpeg';
import kaistWinterPond from '../assets/images/archive/kaist-winter-pond.jpeg';

export const archive = [
  {
    id: 'stanford-visit',
    title: 'Stanford Visit',
    date: '2025',
    location: 'Stanford',
    description: null,
    photos: [],
    link: null,
  },
  {
    id: 'ces-visit',
    title: 'CES Visit',
    date: 'Jan 2026',
    location: 'Las Vegas',
    description: null,
    photos: [{ src: cesFoundry, caption: 'CES 2026' }],
    link: null,
  },
  {
    id: 'campus-portrait',
    title: 'Campus portrait',
    date: 'KAIST years',
    location: 'Daejeon',
    description: null,
    photos: [{ src: valedictorianGown, caption: 'KAIST campus' }],
    link: null,
  },
  {
    id: 'winter-pond',
    title: 'Winter pond',
    date: 'KAIST years',
    location: 'Daejeon',
    description: null,
    photos: [{ src: kaistWinterPond, caption: 'Winter on campus' }],
    link: null,
  },
  {
    id: 'evening-shuttle',
    title: 'Evening shuttle',
    date: 'KAIST years',
    location: 'Daejeon',
    description: null,
    photos: [{ src: kaistEveningShuttle, caption: 'Evening shuttle stop' }],
    link: null,
  },
];
