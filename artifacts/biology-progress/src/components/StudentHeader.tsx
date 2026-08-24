import { BookOpen, CircleHelp, LayoutDashboard, Menu, X } from 'lucide-react';
import type { Student } from '@/types/biology';
import { getSnapshotDate } from '@/lib/dates';

interface SidebarProps {
  student: Student;
  mobileOpen: boolean;
  onCloseMenu: () => void;
  activeSection: 'overview' | 'topic-library';
}

export function Sidebar({ student, mobileOpen, onCloseMenu, activeSection }: SidebarProps) {
  const navigation = [
    { href: '#overview', label: 'Overview', icon: LayoutDashboard, id: 'overview' as const },
    { href: '#topic-library', label: 'Topic library', icon: BookOpen, id: 'topic-library' as const },
  ];

  return (
    <>
      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-[278px] -translate-x-[102%] flex-col bg-[var(--teal-dark)] px-[22px] py-[30px] text-[#eef5e8] shadow-[12px_0_35px_rgba(10,79,76,.18)] transition-transform duration-200 md:sticky md:top-0 md:z-0 md:h-screen md:w-[220px] md:translate-x-0 md:shadow-none lg:w-[260px] ${mobileOpen ? 'translate-x-0' : ''}`}
      >
        <a className="flex items-center gap-[11px] no-underline" href="#overview" onClick={onCloseMenu}>
          <span className="grid h-9 w-9 place-items-center rounded-[12px_12px_12px_4px] bg-[var(--lime)] font-[var(--font-display)] text-xl font-bold text-[var(--teal-dark)]">P</span>
          <span className="text-lg font-bold tracking-[-.03em]">m<span className="text-[var(--lime)]">e</span>iosis</span>
        </a>
        <div className="mb-[13px] mt-[54px] px-2.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[.15em] text-[#9cb9ae]">Your study space</div>
        <nav>
          <ul className="m-0 grid list-none gap-[5px] p-0">
            {navigation.map(({ href, label, icon: Icon, id }) => {
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    className={`flex items-center gap-3 rounded-[10px] px-3 py-[11px] text-sm no-underline transition duration-200 hover:translate-x-0.5 hover:bg-[rgba(214,232,108,.12)] hover:text-white ${isActive ? 'bg-[rgba(214,232,108,.17)] text-[var(--lime)]' : 'text-[#c8d9cf]'}`}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={onCloseMenu}
                  >
                    <Icon aria-hidden="true" size={17} />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto border-t border-white/15 pt-[18px]">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[var(--coral)] text-[13px] font-bold text-[#fff7eb]">P</span>
            <div><strong className="block text-[13px]">{student.name}</strong><small className="mt-0.5 block text-[11px] text-[#9cb9ae]">{student.examBoard} · GCSE {student.subject}</small></div>
          </div>
        </div>
      </aside>
      {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-[var(--ink)]/25 md:hidden" onClick={onCloseMenu} />}
    </>
  );
}

interface TopbarProps {
  student: Student;
  mobileOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onToggleHelp: () => void;
}

export function Topbar({ student, mobileOpen, onOpenMenu, onCloseMenu, onToggleHelp }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[62px] items-center justify-between border-b border-[var(--line)] bg-[rgba(246,247,239,.92)] px-[18px] backdrop-blur md:h-[76px] md:px-7 lg:px-[42px]">
      <button className="rounded-lg p-2 text-[var(--ink-soft)] transition hover:bg-[var(--paper-deep)] md:hidden" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={mobileOpen ? onCloseMenu : onOpenMenu}>
        {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <div className="text-xs text-[var(--ink-soft)]"><strong className="text-[var(--ink)]">Overview</strong><span aria-hidden="true"> / </span>{student.subject}</div>
      <div className="flex items-center gap-[18px]">
        <span className="hidden text-xs text-[var(--ink-soft)] sm:inline">Snapshot · {getSnapshotDate()}</span>
        <button className="rounded-lg p-2 text-[var(--ink-soft)] transition hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]" type="button" aria-label="Help about this page" onClick={onToggleHelp}><CircleHelp aria-hidden="true" /></button>
      </div>
    </header>
  );
}