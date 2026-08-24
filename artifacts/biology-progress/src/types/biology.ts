export interface Student {
  name: string;
  subject: string;
  examBoard: string;
  examDate: string;
}

export interface Topic {
  id: number;
  name: string;
  mastery: number;
  questionsAttempted: number;
  lastStudied: string | null;
}

export interface BiologyData {
  student: Student;
  topics: Topic[];
}

export type TopicStatus =
  | 'Strong / Mastered'
  | 'Developing'
  | 'Needs Attention'
  | 'Not Started';

export type Filter = 'All' | TopicStatus;