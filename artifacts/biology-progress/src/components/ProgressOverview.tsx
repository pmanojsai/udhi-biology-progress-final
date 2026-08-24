import { BookOpen, FlaskConical, Target } from 'lucide-react';

interface ProgressOverviewProps {
  averageMastery: number;
  startedCount: number;
  totalCount: number;
  totalQuestions: number;
}

export function ProgressOverview({ averageMastery, startedCount, totalCount, totalQuestions }: ProgressOverviewProps) {
  const metrics = [
    { label: 'Topics started', value: <>{startedCount}<span className="font-[var(--font-sans)] text-lg font-medium"> / {totalCount}</span></>, note: 'Keep the rhythm going', icon: FlaskConical },
    { label: 'Questions answered', value: totalQuestions, note: 'Across your topic sessions', icon: BookOpen },
  ];
  return (
    <section aria-label="Progress at a glance" className="mb-[39px] grid grid-cols-2 gap-[14px] lg:mb-[51px] lg:grid-cols-[1.55fr_.85fr_.85fr]">
      <article className="col-span-2 min-h-[112px] rounded-[15px] border border-[var(--lime)] bg-[var(--lime)] p-4 lg:col-span-1 lg:min-h-[123px] lg:p-5">
        <div className="flex items-center justify-between text-xs text-[var(--teal-dark)]"><span>Average mastery</span><Target aria-hidden="true" size={16} /></div>
        <div className="mt-[14px] font-[var(--font-display)] text-[33px] font-semibold leading-none tracking-[-.05em] lg:mt-[18px] lg:text-[39px]">{averageMastery}%</div>
        <div className="mt-1 text-[11px] text-[var(--teal-dark)]">Across {startedCount} topics you&apos;ve started</div>
        <div className="mt-[15px] h-[5px] overflow-hidden rounded-full bg-[rgba(23,59,60,.12)]" role="progressbar" aria-label="Average mastery" aria-valuenow={averageMastery} aria-valuemin={0} aria-valuemax={100}><span className="block h-full rounded-full bg-[var(--teal)]" style={{ width: `${averageMastery}%` }} /></div>
      </article>
      {metrics.map(({ label, value, note, icon: Icon }) => (
        <article key={label} className="min-h-[112px] rounded-[15px] border border-[var(--line)] bg-[var(--card)] p-4 lg:min-h-[123px] lg:p-5">
          <div className="flex items-center justify-between text-xs text-[var(--ink-soft)]"><span>{label}</span><Icon aria-hidden="true" size={16} /></div>
          <div className="mt-[14px] font-[var(--font-display)] text-[33px] font-semibold leading-none tracking-[-.05em] lg:mt-[18px] lg:text-[39px]">{value}</div>
          <div className="mt-1 text-[11px] text-[var(--ink-soft)]">{note}</div>
        </article>
      ))}
    </section>
  );
}