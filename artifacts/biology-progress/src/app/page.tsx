'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Sidebar, Topbar } from '@/components/StudentHeader';
import { ProgressOverview } from '@/components/ProgressOverview';
import { ExamCountdown } from '@/components/ExamCountdown';
import { NextMove } from '@/components/NextMove';
import { TopicOverview } from '@/components/TopicOverview';
import { HelpPanel } from '@/components/HelpPanel';
import { biologyData } from '@/data/biology';
import {
  calculateAverageStartedMastery,
  getStartedTopics,
  getTotalQuestions,
  getRecommendedTopic,
  getSecondaryTopic,
} from '@/lib/progress';

const SNAPSHOT_DATE = new Date('2026-08-21T12:00:00');

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'topic-library'>('overview');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const topicLibraryRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('topic-library');
    if (!el) return;
    topicLibraryRef.current = el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActiveSection(entry.isIntersecting ? 'topic-library' : 'overview');
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startedTopics = getStartedTopics(biologyData.topics);
  const averageMastery = calculateAverageStartedMastery(biologyData.topics);
  const totalQuestions = getTotalQuestions(biologyData.topics);
  const recommendedTopic = getRecommendedTopic(biologyData.topics, SNAPSHOT_DATE);
  const secondaryTopic = getSecondaryTopic(biologyData.topics, SNAPSHOT_DATE);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />

      <div className="flex min-h-[100dvh]">
        <Sidebar
          student={biologyData.student}
          mobileOpen={mobileOpen}
          onCloseMenu={() => setMobileOpen(false)}
          activeSection={activeSection}
        />

        <div className="flex min-w-0 flex-1 flex-col relative">
          <Topbar
            student={biologyData.student}
            mobileOpen={mobileOpen}
            onOpenMenu={() => setMobileOpen(true)}
            onCloseMenu={() => setMobileOpen(false)}
            onToggleHelp={() => setHelpOpen((v) => !v)}
          />

          <main
            className="mx-auto w-full max-w-[1320px] px-[18px] pb-[55px] pt-[34px] md:px-[42px] md:pb-[72px] md:pt-[48px]"
            id="overview"
          >
            <section
              className="mb-8 grid grid-cols-1 items-end gap-6 lg:mb-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-11"
              aria-labelledby="page-title"
            >
              <div>
                <div className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[.16em] text-[var(--teal)]">
                  {biologyData.student.examBoard} &middot; GCSE {biologyData.student.subject}
                </div>
                <h1
                  id="page-title"
                  className="mb-4 mt-3 max-w-[650px] font-[var(--font-display)] text-[44px] font-semibold leading-[.98] tracking-[-.045em] lg:text-[clamp(38px,5vw,62px)]"
                >
                  Keep going, <em className="not-italic text-[var(--teal)]">{biologyData.student.name}.</em>
                  <br />You&apos;re building something solid.
                </h1>
                <p className="m-0 max-w-[535px] text-[14px] leading-[1.65] text-[var(--ink-soft)] lg:text-base">
                  Here&apos;s the honest picture of your {biologyData.student.subject} right now — what&apos;s holding,
                  what needs another pass, and the one session that will make the biggest difference next.
                </p>
              </div>
              <ExamCountdown student={biologyData.student} />
            </section>

            <ProgressOverview
              averageMastery={averageMastery}
              startedCount={startedTopics.length}
              totalCount={biologyData.topics.length}
              totalQuestions={totalQuestions}
            />

            <NextMove
              recommendedTopic={recommendedTopic}
              secondaryTopic={secondaryTopic}
            />

            <TopicOverview
              topics={biologyData.topics}
            />

            <footer className="mt-16 flex flex-col justify-between gap-3 border-t border-[var(--line)] pt-5 text-[11px] leading-[1.55] text-[var(--ink-soft)] md:flex-row md:gap-9">
              <p className="m-0 max-w-[580px]">
                <strong className="text-[var(--ink)]">How this works.</strong> Mastery reflects answered questions.
                Topics are only marked &ldquo;Not started&rdquo; when there are no questions and no study record —
                that is not the same as knowing nothing. The focus suggestion weighs mastery, practice volume, and time
                since last study.
              </p>
              <div className="whitespace-nowrap font-[var(--font-display)] text-[15px] font-semibold text-[var(--teal)]">
                Small steps. Real progress.
              </div>
            </footer>
          </main>
          
          {/* Back to top button */}
          <button
            type="button"
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--teal-dark)] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[var(--teal)] hover:bg-[var(--paper-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)] ${
              showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            onClick={scrollToTop}
          >
            <ArrowUp size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}