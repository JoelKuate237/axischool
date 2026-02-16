
export interface Workshop {
  id: string;
  title: string;
  level: 1 | 2 | 3 | 4;
  levelLabel: string;
  inspiration: string;
  goal: string;
  objectives: string[];
  veille: string;
  practice: string;
  deliverable: string;
  colorTheme: 'emerald' | 'amber' | 'orange' | 'rose' | 'indigo' | 'violet' | 'sky';
}

export interface FAQItem {
  question: string;
  answer: string;
}
