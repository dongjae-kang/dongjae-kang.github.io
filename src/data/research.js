import crisisnewsThumbnail from '../assets/images/research/crisisnews-thumbnail.png';
import crisisnewsDemo from '../assets/images/research/crisisnews-demo.gif';
import crisisnewsPipeline from '../assets/images/research/figures/crisisnews-pipeline.png';
import crisisnewsYearlyDist from '../assets/images/research/figures/crisisnews-yearly-dist.png';
import crisisnewsStakeholderMatrix from '../assets/images/research/figures/crisisnews-stakeholder-matrix.png';
import prismNewsEn from '../assets/images/research/prism-news-en.png';
import cs1Figure1 from '../assets/images/research/figures/cs1-figure1.jpg';
import cs1Figure2 from '../assets/images/research/figures/cs1-figure2.jpg';
import cs1Figure3 from '../assets/images/research/figures/cs1-figure3.jpg';
import cs1Figure4 from '../assets/images/research/figures/cs1-figure4.jpg';
import cs1Figure5 from '../assets/images/research/figures/cs1-figure5.jpg';
import beyondBinaryCurrent from '../assets/images/research/figures/beyond-binary-current.png';
import beyondBinaryProposed from '../assets/images/research/figures/beyond-binary-proposed.png';
import beyondBinaryCredentials from '../assets/images/research/figures/beyond-binary-credentials.png';
import beyondBinaryProblem from '../assets/images/research/figures/beyond-binary-problem.png';
import misinfoInterviewsDemo from '../assets/images/research/misinfo-interviews-demo.png';
import misinfoSocialTrust from '../assets/images/research/misinfo-social-trust.png';

export const research = [
  {
    id: 'prism-news',
    title: 'PRISM',
    year: '2026-Present',
    sortDate: '2026-07-16',
    summary:
      'A live daily brief tracing how political stories start, spread, and get framed across YouTube, published in Korean and English editions.',
    description:
      "PRISM is a live service that records how political stories travel across YouTube. Each day it reads hundreds of news and politics channels, groups the videos into issues, and publishes a card that traces each story across five sections: spread and origin, the story itself, media lenses, reactions, and repeated comment patterns. The Korean edition launched in May 2026 around the Korean local elections; an English edition covering U.S. political stories followed. Two design commitments run through the system: cards are built from claims and events rather than from politicians, and no card is published by a language model alone. Every card passes human review before it goes out, and the review process itself is documented publicly. Kang leads the team and the product; the idea grew out of a Fall 2025 course prototype at Columbia SIPA.",
    collaborators: [
      'Dongjae Kang (lead: methodology, curation, design, outreach)',
      'Jaehoon Kim (backend lead: server, ETL pipeline, infrastructure)',
      'Ahin Jung (curation lead: product development, documentation)',
      'Song Park (marketing lead: promotion and branding)',
      'Alumni: Yerim Shim, Hyunmi Kim, Taewoo Park',
    ],
    tags: ['Misinformation', 'Platform Governance', 'Provenance', 'HCI'],
    highlights: [
      'Live daily briefs in Korean and English editions',
      'Traces each story from origin through amplification and framing',
      'Human review gate before any card is published',
    ],
    heroMedia: {
      src: prismNewsEn,
      alt: 'PRISM English edition daily brief',
      label: 'Live Service',
    },
    embeds: [
      { label: 'English Edition — live', url: 'https://prism-provenance.com/en' },
      { label: 'Korean Edition — live', url: 'https://prism-provenance.com/ko' },
    ],
    sections: [
      {
        heading: 'What it does',
        body: [
          'PRISM brings together two things that news outlets and feeds rarely offer in one place. The first is framing: how the same event is covered differently across outlets, shown as media lenses set side by side on equal footing, favoring no viewpoint. The second is trajectory: where a story began, who amplified it, and where it stands now, with the scattered pieces drawn into a single thread.',
          'PRISM is deliberately not a fact-checker. It does not judge individual claims true or false. It shows the range of perspectives, their sources, and the shape of the spread, and leaves the inference to the reader.',
        ],
      },
      {
        heading: 'How a card is made',
        body: [
          'Each day the system collects videos and podcast episodes across 488 U.S. politics and news channels and 177 podcast shows (the Korean edition runs on its own channel network), embeds every item, and clusters them by meaning. Clusters are scored on five signals, cross-checked against mainstream news reporting, and ranked. A curator selects the day\'s cards from the ranked candidates; the machine only recommends.',
          'Before publication, every card passes a verification loop that checks quotes, numbers, attributions, and dates against canonical sources, followed by four deterministic publish gates. A failing claim is stripped; if the card leans on it, the card is dropped. The final approval comes from a team member who did not build the card. Self-approval is not allowed.',
        ],
      },
      {
        heading: 'What AI does, what people do',
        body: [
          'The machine carries the repetition: collecting, clustering, scoring, checking against mainstream reporting, drafting the card body, and verifying claims. People make the judgments: choosing what to cover, confirming each card\'s classification, checking the drafted body against what the videos actually say, and approving publication. The boundary between the two is documented publicly on the site\'s How We Work page.',
        ],
      },
      {
        heading: 'Standards',
        body: [
          'Three standards run through the product, each implemented in code rather than stated as policy. No left/right labels and no grades: cards plot only the distance between how outlets framed a story. Every count is traceable: video, channel, view, and comment figures come from collected data and link back to their sources. And gaps stay empty: when the data is not there, the card states what it could not cover instead of filling it in.',
        ],
      },
    ],
    liveDemo: 'https://prism-provenance.com',
    links: [
      { label: 'Live Site (EN)', url: 'https://prism-provenance.com/en' },
      { label: 'Live Site (KO)', url: 'https://prism-provenance.com/ko' },
    ],
    related: ['prism', 'crisisnews', 'vinesight-policy-guide'],
    thumbnail: prismNewsEn,
    gallery: [],
  },
  {
    id: 'multi-agent-sim',
    title: 'Intervening Against Misinformation',
    year: '2026',
    sortDate: '2026-05-12',
    summary:
      "A Python multi-agent simulation of ethical trade-offs in misinformation interventions, selected for Columbia's Case Studies on Ethical Technology, Media, and Design (Vol. III).",
    description:
      'This study asks how platforms should intervene against misinformation without undermining user autonomy. A rule-based multi-agent simulation, designed and coded in Python, models six agents with distinct personas (anchored in Pew Research Center\'s 2021 Political Typology) encountering misinformation under four intervention conditions: no intervention, an AI fact-check label, an accuracy nudge, and Community Notes. Across 192 logged agent interactions, the AI fact-check label backfired, producing the highest average belief score and the most shares, while the accuracy nudge performed best without labeling or removing any content. No intervention changed who was most vulnerable or most resistant; interventions mainly moved the middle. The results are read through the Markkula Center\'s ethical lenses, and the case study is explicit about its pilot scale and limitations. The work developed in three stages across the semester: the initial case study, "Intervening Against Misinformation on Social Media: A Multi-Agent Simulation of Ethical Trade-Offs," was selected for Case Studies on Ethical Technology, Media, and Design, Vol. III, a class publication edited by Prof. Laura Scherling and published through Columbia Academic Commons; a Pecha Kucha-format video presentation of the simulation followed; and an extended final case study deepened the ethical framework analysis.',
    courseContext: 'Ethics of Media, Technology, and Design (TPINIA7014), Prof. Laura Scherling, Spring 2026',
    related: ['misinfo-interviews', 'crisisnews', 'beyond-binary'],
    collaborators: ['Individual project'],
    tags: ['Misinformation', 'AI', 'Simulation', 'Ethics'],
    highlights: [
      'AI fact-check labels backfired, performing worse than no intervention',
      'Accuracy nudges reduced belief and sharing most, without touching content',
      'Selected for Case Studies on Ethical Technology, Media, and Design, Vol. III',
    ],
    heroMedia: {
      src: cs1Figure1,
      alt: 'Simulation workflow figure',
      label: 'Simulation Workflow',
    },
    materials: [
      {
        label: 'Publication',
        note: 'Case study selected for Vol. III via Columbia Academic Commons. Link will be added when the volume is published.',
      },
      {
        label: 'Final Case Study',
        note: 'Extended course final that develops the published case study. PDF to be attached.',
      },
      {
        label: 'Presentation Slides',
        note: 'Slides from the Pecha Kucha-format video presentation of the simulation.',
        url: '/demos/cs1-pechakucha/presentation.html',
      },
    ],
    links: [],
    thumbnail: cs1Figure1,
    gallery: [
      { src: cs1Figure1, alt: 'Simulation workflow', caption: 'Figure 1: Simulation workflow' },
      { src: cs1Figure2, alt: 'Belief and behavior measurement design', caption: 'Figure 2: How belief and agent behavior are measured' },
      { src: cs1Figure3, alt: 'Average final belief scores across four conditions', caption: 'Figure 3: Average final belief scores across conditions' },
      { src: cs1Figure4, alt: 'Belief trajectories over eight rounds', caption: 'Figure 4: Belief trajectories over eight rounds' },
      { src: cs1Figure5, alt: 'Simulation implementation and console output', caption: 'Figure 5: Implementation and output' },
    ],
  },
  {
    id: 'beyond-binary',
    title: 'Beyond Binary',
    year: '2026',
    sortDate: '2026-04-30',
    summary:
      'A focus group study of how "Generated by AI" labels reshape engagement with LinkedIn portraits, paired with an interactive prototype for granular provenance disclosure.',
    description:
      "This project tests the design premise behind C2PA-style provenance labels: that disclosure enables informed viewer engagement. A focus group of six participants with hiring experience evaluated twenty LinkedIn-style portraits in a 2x2 design crossing image authenticity (real versus AI-generated) with label presence, including a mislabeled-real cell that isolates the label's effect from the underlying image. The study's central pattern is a leveling signal: in the labeled condition, engagement rates for real and AI images converged, meaning the label, not the image, drove viewer response. The team's recommendations cover label granularity (distinguishing AI-edited from AI-generated), platform verification as a complement to voluntary disclosure, and context-adaptive label prominence. Kang wrote the framing, methodology, recommendation, and conclusion sections of the final paper, and independently designed and built the accompanying interactive prototype, which demonstrates what granular disclosure could look like inside a professional profile interface. The project was completed in a six-member team for Columbia SIPA's Digital Content Provenance course, taught by Mounir Ibrahim of Truepic.",
    courseContext: 'Digital Content Provenance: Path to Transparency (TPINIA7006), Mounir Ibrahim, Spring 2026',
    collaborators: [
      'Alexandra Bilinkis, Bining Yang, Clare Elwell, Dongjae Kang, Jingyi Fu, and Sara Shibata',
    ],
    tags: ['Provenance', 'AI', 'Platform Design', 'HCI'],
    highlights: [
      '2x2 factorial focus group with a mislabeled-real identification cell',
      'Leveling-signal finding: labels erased the behavioral gap between real and AI images',
      'Interactive prototype for granular AI disclosure, designed and built independently',
    ],
    heroMedia: {
      src: beyondBinaryProposed,
      alt: 'Beyond Binary prototype in proposed disclosure mode',
      label: 'Interactive Prototype',
    },
    materials: [
      {
        label: 'Interactive Prototype',
        note: 'Granular AI-disclosure interface demo, browsable in place.',
        url: '/demos/beyond-binary/index.html',
      },
      {
        label: 'Final Paper',
        note: 'Team paper with study design, findings, and recommendations. PDF to be attached.',
      },
    ],
    liveDemo: '/demos/beyond-binary/index.html',
    links: [
      { label: 'Interactive Prototype', url: '/demos/beyond-binary/index.html' },
    ],
    related: ['prism-news', 'misinfo-interviews', 'vinesight-policy-guide'],
    thumbnail: beyondBinaryProposed,
    gallery: [
      { src: beyondBinaryProposed, alt: 'Proposed granular disclosure system with four provenance tiers', caption: 'Proposed system: every card declares one of four provenance tiers' },
      { src: beyondBinaryCurrent, alt: 'Current LinkedIn binary label mode', caption: 'Current practice: a single binary AI badge' },
      { src: beyondBinaryCredentials, alt: 'Content credentials panel with C2PA-style manifest', caption: 'Content credentials on click: source, edits, and AI involvement' },
      { src: beyondBinaryProblem, alt: 'Focus group finding: engagement rates converge under labeling', caption: 'The finding the prototype responds to: labels level real and AI photos' },
    ],
  },
  {
    id: 'misinfo-interviews',
    title: "Who Decides What's True?",
    year: '2026',
    sortDate: '2026-04-13',
    summary:
      "An interview study on the ethics of combating misinformation, triangulating truth measurement, truth production, and truth's legal boundaries.",
    description:
      "This study examines how organizations that combat misinformation navigate the tension between addressing false information and protecting free expression. Kang conducted semi-structured interviews with three figures spanning the information ecosystem: Steven Brill and Gordon Crovitz (Co-CEOs of NewsGuard) on truth measurement, Mike Abrams (Deputy Editor for Trust at The New York Times) on truth production, and Jennifer Jones (Staff Attorney at Columbia's Knight First Amendment Institute) on truth's legal boundaries, alongside observation of a campus dialogue on health misinformation at Columbia's Irving Medical Center. Thematic coding surfaced three findings: misinformation is a structural feature of platform revenue models rather than a bug; transparency is championed by every actor yet limited by each one's structure; and the deepest tension is epistemological, between truth existing and holding the authority to determine it. Read through the Markkula Center's Rights Lens, the paper argues for media literacy as civic infrastructure, distributing the capacity for truth-determination rather than concentrating it. For the NYT conversation, Kang independently designed and built two interactive demos that turned the interview into a product discussion. Their shared premise runs opposite to the usual direction: rather than asking a newsroom to import the unverified information circulating outside, the demos extend the Times's own verification outward, so its trust signals travel to where its journalism is quoted and contested. The first places a Times context panel beside X posts referencing Times reporting; the second adds a reader-facing transparency layer inside a Times article page.",
    courseContext: 'Ethics of Media, Technology, and Design (TPINIA7014), Prof. Laura Scherling, Spring 2026',
    collaborators: ['Individual project'],
    tags: ['Misinformation', 'Platform Governance', 'Trust & Safety', 'Journalism Ethics'],
    highlights: [
      'Interviews with NewsGuard, The New York Times, and the Knight First Amendment Institute',
      'Thematic coding and rights-based framework analysis',
      'Two interactive demos independently designed and built for the NYT interview',
    ],
    heroMedia: {
      src: misinfoSocialTrust,
      alt: 'NYT Trust Extension demo beside an X feed',
      label: 'Interactive Demo',
    },
    materials: [
      {
        label: 'Social Media Trust Extension Demo',
        note: 'Interactive demo surfacing NYT trust signals beside X posts referencing Times journalism.',
        url: '/demos/social-media-trust.html',
      },
      {
        label: 'Article Trust Layer Demo',
        note: 'Interactive demo adding a transparency layer inside a live New York Times article page.',
        url: '/demos/article-trust-layer.html',
      },
    ],
    links: [
      { label: 'Social Media Trust Extension Demo', url: '/demos/social-media-trust.html' },
      { label: 'Article Trust Layer Demo', url: '/demos/article-trust-layer.html' },
    ],
    related: ['multi-agent-sim', 'crisisnews', 'prism-news'],
    thumbnail: misinfoSocialTrust,
    gallery: [
      { src: misinfoSocialTrust, alt: 'NYT Trust Extension beside an X feed', caption: 'Trust extension: NYT context panel beside X posts citing Times reporting' },
      { src: misinfoInterviewsDemo, alt: 'Article Trust Layer demo', caption: 'Article trust layer inside a Times article page' },
    ],
  },
  {
    id: 'crisisnews',
    title: 'CrisisNews',
    year: '2024-2025',
    sortDate: '2025-10-14',
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
    related: ['prism-news', 'multi-agent-sim', 'vinesight-policy-guide'],
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
];
