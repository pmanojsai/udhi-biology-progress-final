'use client';

import { useMemo, useState } from 'react';
import type { Topic, TopicStatus } from '@/types/biology';
import { getTopicStatus } from '@/lib/progress';
import { TopicGroup } from './TopicGroup';

const ALL_GROUPS: TopicStatus[] = ['Strong / Mastered', 'Developing', 'Needs Attention', 'Not Started'];
type Filter = 'All' | TopicStatus;

interface TopicOverviewProps {
  topics: Topic[];
}

export function TopicOverview({ topics }: TopicOverviewProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const [reviewTopic, setReviewTopic] = useState<string | null>(null);

  const grouped = useMemo(
    () =>
      ALL_GROUPS.map((group) => ({
        group,
        topics: topics.filter(
          (t) => getTopicStatus(t) === group && (filter === 'All' || filter === group)
        ),
      })).filter(({ topics: g }) => g.length > 0),
    [filter, topics]
  );

  const handleAction = (topic: Topic) => {
    setReviewTopic(reviewTopic === topic.name ? null : topic.name);
  };

  return (
    <section id="topic-library" className="scroll-mt-[25px]" aria-labelledby="topics-title">
      <div className="mb-5 flex flex-col items-start gap-1 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[.16em] text-[var(--teal)]">The full picture</div>
          <h2 id="topics-title" className="m-0 mt-[7px] font-[var(--font-display)] text-[29px] font-semibold tracking-[-.035em]">Topic library</h2>
        </div>
        <p className="m-0 text-[13px] text-[var(--ink-soft)]">Eight AQA Biology topics, grouped by what to do next.</p>
      </div>

      {/* Filters toolbar */}
      <div className="mb-[22px] flex flex-col items-start gap-[15px] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full overflow-x-auto pb-2 scrollbar-hide lg:w-auto lg:overflow-visible lg:pb-0">
          <div className="flex gap-[5px]" role="group" aria-label="Filter topics">
            {(['All', ...ALL_GROUPS] as Filter[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-').replaceAll('/', '')}`}
                className={`shrink-0 rounded-[7px] border px-[11px] py-[7px] text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)] ${
                  filter === item
                    ? 'border-[var(--teal)] bg-[var(--teal)] text-[#eef5e8]'
                    : 'border-transparent text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]'
                }`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <span className="text-xs text-[var(--ink-soft)]">{topics.length} topics total</span>
      </div>

      {/* Grouped topic cards */}
      <div className="grid gap-[30px]">
        {grouped.map(({ group, topics: groupTopics }) => (
          <TopicGroup
            key={group}
            group={group}
            topics={groupTopics}
            reviewTopic={reviewTopic}
            onAction={handleAction}
          />
        ))}
        {grouped.length === 0 && (
          <p className="py-8 text-center text-sm text-[var(--ink-soft)]">No topics match this filter.</p>
        )}
      </div>
    </section>
  );
}