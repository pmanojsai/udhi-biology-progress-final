const DAY_MS = 86_400_000;

export function parseDate(value: string): Date {
  return new Date(`${value}T12:00:00`);
}

export function getDaysUntilExam(examDate: string, now = new Date()): number {
  const exam = new Date(`${examDate}T09:00:00`);
  return Math.max(0, Math.ceil((exam.getTime() - now.getTime()) / DAY_MS));
}

export function formatDate(value: string | null): string {
  if (!value) return 'Not studied yet';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseDate(value));
}

export function formatExamDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseDate(value));
}

export function getSnapshotDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(now);
}

export function daysSinceStudy(value: string | null, now = new Date()): number {
  if (!value) return 0;
  return Math.max(0, Math.floor((now.getTime() - parseDate(value).getTime()) / DAY_MS));
}

export function formatDateRelative(value: string | null, now = new Date()): string {
  if (!value) return 'Not studied yet';
  const days = daysSinceStudy(value, now);
  if (days === 0) return 'studied today';
  if (days === 1) return 'studied yesterday';
  if (days < 7) return `studied ${days} days ago`;
  if (days < 14) return 'studied a week ago';
  if (days < 30) return `studied ${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return 'studied a month ago';
  return `studied ${Math.floor(days / 30)} months ago`;
}