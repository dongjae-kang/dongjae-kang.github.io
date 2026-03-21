import chronicAbsenteeismPdf from '../assets/docs/chronic-absenteeism-dc.pdf';
import jungnangHousingPdf from '../assets/docs/jungnang-housing-strategy.pdf';

export const coursework = [
  {
    id: 'jungnang-housing',
    title: 'Revitalizing Jungnang-gu',
    course: 'Housing Policy and the City',
    year: 'Fall 2025',
    summary:
      "A housing policy paper proposing a demand-driven inclusive housing strategy for Seoul's Jungnang-gu.",
    file: jungnangHousingPdf,
  },
  {
    id: 'chronic-absenteeism',
    title: 'Reducing Chronic Absenteeism in Washington, D.C.',
    course: 'Urban Policy Research Project',
    year: '2025',
    summary:
      "A policy proposal for mayoral action built around family engagement, early warning systems, community hubs, health services, and accountability.",
    file: chronicAbsenteeismPdf,
  },
];
