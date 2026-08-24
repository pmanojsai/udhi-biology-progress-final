'use client';

import { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SessionPanelProps {
  topicName: string;
  onClose: () => void;
}

export function SessionPanel({ topicName, onClose }: SessionPanelProps) {
  const [started, setStarted] = useState(false);

  const handleBegin = () => {
    setStarted(true);
  };

  if (started) {
    return (
      <div
        role="status"
        aria-live="assertive"
        data-testid="status-session-started"
        className="flex items-start gap-3 rounded-xl border border-[var(--teal)] bg-[var(--teal)] p-5 text-[#eef5e8]"
      >
        <CheckCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--lime)]" size={20} />
        <div>
          <div className="font-semibold">Session underway — {topicName}</div>
          <p className="mt-1 text-sm text-[#c4ddd0]">
            Work through your 10 questions, then note which ideas still feel slow.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border border-[var(--lime)] bg-[var(--teal-dark)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--teal)] hover:border-white"
              onClick={onClose}
            >
              Back to progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="status-session-ready"
      className="rounded-xl border border-[var(--lime)] bg-[#f2fae0] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-[var(--font-mono)] text-[10px] uppercase tracking-[.14em] text-[var(--teal)]">
            Session ready
          </div>
          <div className="mt-2 font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--teal-dark)]">
            {topicName}
          </div>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            10 questions prepared. Work through them, then note which ideas still feel slow.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close session panel"
          className="mt-0.5 shrink-0 rounded-lg p-1.5 text-[var(--ink-soft)] transition hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
          onClick={onClose}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          data-testid="button-begin-practice"
          className="rounded-lg bg-[var(--teal)] px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--teal-dark)]"
          onClick={handleBegin}
        >
          Begin practice
        </button>
        <button
          type="button"
          className="rounded-lg border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[var(--ink-soft)] transition hover:bg-[var(--paper-deep)]"
          onClick={onClose}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
