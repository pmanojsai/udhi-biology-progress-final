'use client';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import type { Topic, TopicStatus } from '@/types/biology';
import { formatDateRelative } from '@/lib/dates';
import { isNotStarted } from '@/lib/progress';

interface TopicCardProps {
  topic: Topic;
  group: TopicStatus;
  reviewOpen: boolean;
  onAction: () => void;
}

export function TopicCard({ topic, group, reviewOpen, onAction }: TopicCardProps) {
  const untouched = isNotStarted(topic);
  const [topicSessionReady, setTopicSessionReady] = useState(false);

  const barColor =
    group === 'Developing'
      ? 'bg-[var(--coral)]'
      : group === 'Needs Attention'
      ? 'bg-[#c96151]'
      : group === 'Not Started'
      ? 'bg-[#b7c5bd]'
      : 'bg-[var(--teal)]';

  const handleAction = () => {
    if (untouched) {
      setTopicSessionReady(true);
    } else {
      onAction();
    }
  };

  return (
    <article
      data-testid={`card-topic-${topic.id}`}
      className="flex flex-col gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-[18px] transition hover:-translate-y-0.5 hover:border-[#a6c0b2] hover:bg-[#fffffa]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm font-bold leading-tight" data-testid={`text-topic-name-${topic.id}`}>{topic.name}</div>
        <div
          className={`shrink-0 text-right font-[var(--font-display)] leading-none ${untouched ? 'text-lg text-[var(--ink-soft)]' : 'text-[22px]'}`}
          data-testid={`text-topic-mastery-${topic.id}`}
        >
          {untouched ? 'Not started' : `${topic.mastery}%`}
        </div>
      </div>
      
      <div className="text-[12px] text-[var(--ink-soft)]">
        {untouched ? 'No questions attempted yet' : `${topic.questionsAttempted} questions · ${formatDateRelative(topic.lastStudied)}`}
      </div>

      {/* Progress bar */}
      <div
        className="h-[5px] overflow-hidden rounded-full bg-[var(--paper-deep)]"
        role="progressbar"
        aria-label={untouched ? `${topic.name} not started` : `${topic.name} ${topic.mastery}% mastery`}
        aria-valuenow={untouched ? 0 : topic.mastery}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className={`block h-full rounded-full ${barColor}`} style={{ width: `${untouched ? 0 : topic.mastery}%` }} />
      </div>

      {/* Action button */}
      {!topicSessionReady && (
        <div className="mt-1 flex">
          <button
            type="button"
            data-testid={`button-topic-action-${topic.id}`}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--teal)] hover:bg-[var(--paper-deep)] hover:text-[var(--teal-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)]"
            onClick={handleAction}
          >
            {untouched ? 'Start topic' : reviewOpen ? 'Close review' : 'Review topic'}
            <ArrowRight aria-hidden="true" size={14} className="opacity-70" />
          </button>
        </div>
      )}

      {/* Review panel (started topics) */}
      {!untouched && reviewOpen && (
        <div
          className="mt-1 rounded-r-lg border-l-[3px] border-[var(--lime)] bg-[var(--paper-deep)] px-3.5 py-3 text-xs leading-relaxed text-[var(--teal-dark)]"
          role="status"
          data-testid={`status-review-${topic.id}`}
        >
          Review prompt: explain the key idea in your own words, then answer one question without notes.
        </div>
      )}

      {/* Session-ready panel (Not Started topics) */}
      {untouched && topicSessionReady && (
        <div
          className="mt-1 rounded-r-lg border-l-[3px] border-[var(--lime)] bg-[#f2fae0] px-3.5 py-3 text-xs text-[var(--teal-dark)]"
          role="status"
          data-testid={`status-start-${topic.id}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold">{topic.name} — ready to begin</div>
              <div className="mt-1 text-[var(--ink-soft)] leading-relaxed">Start with a first set of questions. No pressure on the score — this is your baseline.</div>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              className="shrink-0 rounded p-1 text-[var(--ink-soft)] hover:bg-[rgba(23,59,60,.05)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--teal)]"
              onClick={() => setTopicSessionReady(false)}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}