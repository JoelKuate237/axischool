
export interface Workshop {
  id: string;
  title: string;
  promise: string;
  colorTheme: 'amber' | 'indigo' | 'rose' | 'emerald' | 'violet' | 'sky' | 'orange';
  forWhom: string[];
  expectedResults: string[];
  deliverables: string[];
  prerequisites: string[];
  timeline: { time: string; activity: string; deliverable?: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
