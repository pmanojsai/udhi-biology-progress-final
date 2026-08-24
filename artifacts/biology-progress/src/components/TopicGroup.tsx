import type { Topic, TopicStatus } from '@/types/biology';
import { TopicCard } from './TopicCard';

interface TopicGroupProps {
  group: TopicStatus;
  topics: Topic[];
  reviewTopic: string | null;
  onAction: (topic: Topic) => void;
}

export function TopicGroup({ group, topics, reviewTopic, onAction }: TopicGroupProps) {
  const dotColor =
    group === 'Strong / Mastered'
      ? 'bg-[var(--teal)]'
      : group === 'Developing'
      ? 'bg-[var(--coral)]'
      : group === 'Needs Attention'
      ? 'bg-[#c96151]'
      : 'bg-[#a4b4ab]';

  return (
    <div className="grid gap-[11px]">
      <h3 className="m-0 flex items-center gap-[9px] text-[13px] font-bold">
        <span aria-hidden="true" className={`h-[7px] w-[7px] rounded-full ${dotColor}`} />
        {group}
        <span className="font-[var(--font-mono)] text-[11px] font-normal text-[var(--ink-soft)]">
          {topics.length} {topics.length === 1 ? 'topic' : 'topics'}
        </span>
      </h3>
      <div className="grid gap-[11px] md:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            group={group}
            reviewOpen={reviewTopic === topic.name}
            onAction={() => onAction(topic)}
          />
        ))}
      </div>
    </div>
  );
}