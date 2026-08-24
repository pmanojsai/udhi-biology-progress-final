import type { Topic, TopicStatus } from '@/types/biology';
import { daysSinceStudy } from './dates';

export function isNotStarted(topic: Topic): boolean {
  return topic.questionsAttempted === 0 && topic.lastStudied === null;
}

export function getTopicStatus(topic: Topic): TopicStatus {
  if (isNotStarted(topic)) return 'Not Started';
  if (topic.mastery >= 80) return 'Strong / Mastered';
  if (topic.mastery >= 50) return 'Developing';
  return 'Needs Attention';
}

export function getStartedTopics(topics: Topic[]): Topic[] {
  return topics.filter((topic) => !isNotStarted(topic));
}

export function getNotStartedTopics(topics: Topic[]): Topic[] {
  return topics.filter(isNotStarted);
}

export function getTopicPriority(topic: Topic, now = new Date()): number {
  if (isNotStarted(topic)) return -1;
  return (
    (100 - topic.mastery) * 0.6 +
    Math.max(0, 20 - topic.questionsAttempted) * 1.25 +
    daysSinceStudy(topic.lastStudied, now) * 0.7
  );
}

export function getRecommendedTopic(topics: Topic[], now = new Date()): Topic {
  const started = getStartedTopics(topics);
  if (started.length === 0) throw new Error('At least one started topic is required.');
  return [...started].sort((a, b) => getTopicPriority(b, now) - getTopicPriority(a, now))[0];
}

export function getSecondaryTopic(topics: Topic[], now = new Date()): Topic | undefined {
  return [...getStartedTopics(topics)]
    .sort((a, b) => getTopicPriority(b, now) - getTopicPriority(a, now))[1];
}

export function calculateAverageStartedMastery(topics: Topic[]): number {
  const started = getStartedTopics(topics);
  if (started.length === 0) return 0;
  return Math.round(started.reduce((sum, topic) => sum + topic.mastery, 0) / started.length);
}

export function getTotalQuestions(topics: Topic[]): number {
  return topics.reduce((sum, topic) => sum + topic.questionsAttempted, 0);
}