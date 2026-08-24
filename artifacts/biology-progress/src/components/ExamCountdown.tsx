import { formatExamDate, getDaysUntilExam } from '@/lib/dates';
import type { Student } from '@/types/biology';

export function ExamCountdown({ student }: { student: Student }) {
  return (
    <aside aria-label="Exam countdown" className="relative overflow-hidden rounded-[18px] bg-[var(--teal)] px-[23px] py-[22px] text-[#f4f8e8] after:absolute after:-right-7 after:-top-[42px] after:h-[130px] after:w-[130px] after:rounded-full after:border after:border-[rgba(212,232,108,.45)] after:shadow-[0_0_0_16px_rgba(212,232,108,.06),0_0_0_33px_rgba(212,232,108,.05)]">
      <div className="relative z-[1] font-[var(--font-mono)] text-[10px] uppercase tracking-[.1em] text-[var(--lime)]">Your exam is in</div>
      <div className="relative z-[1] mt-[13px] font-[var(--font-display)] text-[44px] font-semibold leading-none tracking-[-.04em]">{getDaysUntilExam(student.examDate)} days</div>
      <p className="relative z-[1] m-0 mt-1 text-xs text-[#c4ddd0]">{formatExamDate(student.examDate)} · {student.examBoard} GCSE {student.subject}</p>
    </aside>
  );
}