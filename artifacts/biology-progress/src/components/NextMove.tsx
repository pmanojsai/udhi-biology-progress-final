import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import type { Topic } from '@/types/biology';
import { formatDate } from '@/lib/dates';
import { SessionPanel } from './SessionPanel';

interface NextMoveProps {
  recommendedTopic: Topic;
  secondaryTopic?: Topic;
}

export function NextMove({ recommendedTopic, secondaryTopic }: NextMoveProps) {
  const [sessionActive, setSessionActive] = useState(false);

  return (
    <section aria-labelledby="focus-title" className="mb-14">
      <div className="mb-5 flex flex-col items-start gap-1 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[.16em] text-[var(--teal)]">A considered next step</div>
          <h2 id="focus-title" className="m-0 mt-[7px] font-[var(--font-display)] text-[29px] font-semibold tracking-[-.035em]">Your focus today</h2>
        </div>
        <p className="m-0 text-[13px] text-[var(--ink-soft)]">Based on your recent practice, not a prediction.</p>
      </div>
      <div className="grid gap-[18px] lg:grid-cols-[1.25fr_.75fr]">
        {/* Primary recommendation card */}
        <article className="relative min-h-[257px] overflow-hidden rounded-[17px] bg-[var(--teal-dark)] px-[27px] py-[25px] text-[#eef5e8] after:absolute after:-bottom-[132px] after:right-[30px] after:h-[205px] after:w-[205px] after:rounded-full after:border after:border-[rgba(212,232,108,.35)] after:shadow-[0_0_0_17px_rgba(212,232,108,.06),0_0_0_35px_rgba(212,232,108,.04)]">
          <div className="relative z-[1] font-[var(--font-mono)] text-[11px] uppercase tracking-[.16em] text-[var(--lime)]">Recommended session</div>
          <h3 className="relative z-[1] mb-2 mt-[18px] font-[var(--font-display)] text-[32px] font-semibold leading-tight tracking-[-.04em]">
            {recommendedTopic.name}
          </h3>
          <div className="relative z-[1] mb-1 flex flex-wrap gap-4 text-xs text-[#bdd3c6]">
            <span>{recommendedTopic.mastery}% mastery</span>
            <span>{recommendedTopic.questionsAttempted} questions answered</span>
            <span>Last studied {formatDate(recommendedTopic.lastStudied)}</span>
          </div>
          <p className="relative z-[1] mb-[21px] max-w-[455px] text-[13px] leading-[1.55] text-[#bdd3c6]">
            Lowest mastery of started topics, least practice volume, and the longest gap since last study. A focused session here will lift your overall picture the most.
          </p>
          
          {sessionActive ? (
            <div className="relative z-[1] mt-6">
              <SessionPanel
                topicName={recommendedTopic.name}
                onClose={() => setSessionActive(false)}
              />
            </div>
          ) : (
            <button
              className="relative z-[1] inline-flex items-center justify-center gap-2 rounded-lg border-0 bg-[var(--lime)] px-4 py-[11px] text-xs font-bold text-[var(--teal-dark)] transition hover:-translate-y-0.5 hover:bg-[#e4f49a]"
              type="button"
              data-testid="button-start-recommended"
              onClick={() => setSessionActive(true)}
            >
              <Play aria-hidden="true" fill="currentColor" size={14} />
              Start 10 questions
            </button>
          )}
        </article>

        {/* Secondary topic */}
        {secondaryTopic && (
          <article className="rounded-[17px] border border-[var(--line)] bg-[var(--card)] p-[22px]">
            <div className="font-[var(--font-mono)] text-[11px] uppercase tracking-[.12em] text-[var(--ink-soft)]">Then revisit</div>
            <h3 className="mb-[7px] mt-[19px] font-[var(--font-display)] text-[25px] font-semibold tracking-[-.03em]">{secondaryTopic.name}</h3>
            <p className="mb-[18px] text-xs leading-[1.5] text-[var(--ink-soft)]">{secondaryTopic.mastery}% mastery so far. Give it a retrieval check after today&apos;s session.</p>
            <div className="flex items-center gap-2 border-t border-[var(--line)] pt-[13px] text-[11px] text-[var(--ink-soft)]">
              <RotateCcw aria-hidden="true" className="text-[var(--coral)]" size={14} />
              Last studied {formatDate(secondaryTopic.lastStudied)}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}