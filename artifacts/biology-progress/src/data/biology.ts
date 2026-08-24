import type { BiologyData } from '@/types/biology';

export const biologyData: BiologyData = {
  student: {
    name: 'Priya',
    subject: 'Biology',
    examBoard: 'AQA',
    examDate: '2027-05-18',
  },
  topics: [
    { id: 1, name: 'Cell Structure', mastery: 92, questionsAttempted: 40, lastStudied: '2026-08-19' },
    { id: 2, name: 'Cell Division', mastery: 71, questionsAttempted: 28, lastStudied: '2026-08-14' },
    { id: 3, name: 'Transport in Cells', mastery: 45, questionsAttempted: 12, lastStudied: '2026-07-30' },
    { id: 4, name: 'Photosynthesis', mastery: 88, questionsAttempted: 35, lastStudied: '2026-08-20' },
    { id: 5, name: 'Respiration', mastery: 23, questionsAttempted: 6, lastStudied: '2026-06-11' },
    { id: 6, name: 'Homeostasis', mastery: 0, questionsAttempted: 0, lastStudied: null },
    { id: 7, name: 'Inheritance', mastery: 0, questionsAttempted: 0, lastStudied: null },
    { id: 8, name: 'Ecology', mastery: 58, questionsAttempted: 19, lastStudied: '2026-08-02' },
  ],
};