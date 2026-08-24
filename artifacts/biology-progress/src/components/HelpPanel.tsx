'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
}

export function HelpPanel({ open, onClose }: HelpPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    // Focus the close button when the panel opens
    closeRef.current?.focus();
    // Escape key closes the panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-title"
      className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-8"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-[var(--ink)]/20"
        aria-label="Close help panel"
        onClick={onClose}
        tabIndex={-1}
      />
      {/* Panel */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="help-title" className="font-[var(--font-display)] text-xl font-semibold tracking-tight">
            How this works
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close help"
            className="rounded-lg p-1.5 text-[var(--ink-soft)] transition hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
            onClick={onClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <dl className="space-y-4 text-sm text-[var(--ink-soft)]">
          <div>
            <dt className="font-semibold text-[var(--ink)]">Mastery score</dt>
            <dd className="mt-1 leading-relaxed">Based entirely on questions you&apos;ve answered. It reflects your practice, not a prediction of your final grade.</dd>
          </div>
          <div>
            <dt className="font-semibold text-[var(--ink)]">Not started</dt>
            <dd className="mt-1 leading-relaxed">A topic is only marked &ldquo;Not started&rdquo; when you have no questions attempted and no study record. This is not the same as knowing nothing — you may already have notes or classroom learning on it.</dd>
          </div>
          <div>
            <dt className="font-semibold text-[var(--ink)]">Recommendation logic</dt>
            <dd className="mt-1 leading-relaxed">The suggested topic is chosen by weighing three signals: low mastery, low practice volume, and a long gap since last study. A topic that scores poorly on all three gets the highest priority.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
