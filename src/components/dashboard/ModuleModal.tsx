import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X, FileText, ExternalLink, Check, Minus, HelpCircle,
  AlertCircle, Sparkles, BookOpen, Target, Trophy, ChevronDown,
} from 'lucide-react';
import type { ModuleData, DeliverableStatus, Deliverable, Level3Step, ChecklistItem } from '../../data/modules';
import { getAccent, moduleProgress, moduleStatusLabel } from '../../data/modules';

interface ModuleModalProps {
  module: ModuleData;
  onClose: () => void;
}

const statusMeta: Record<DeliverableStatus, { label: string; cls: string }> = {
  done:       { label: 'DONE',       cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30' },
  inprogress: { label: 'IN PROGRESS',cls: 'bg-amber-500/15 text-amber-300 border-amber-400/30' },
  todo:       { label: 'TO DO',      cls: 'bg-white/5 text-muted-foreground border-white/10' },
  undecided:  { label: 'UNDECIDED',  cls: 'bg-rose-500/15 text-rose-300 border-rose-400/30' },
};

export function ModuleModal({ module: m, onClose }: ModuleModalProps) {
  const accent = getAccent(m);
  const { pct, doneCount, totalCount } = moduleProgress(m);
  const status = moduleStatusLabel(m);
  const [expandedDeliverables, setExpandedDeliverables] = useState<Set<number>>(new Set());
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const fileHref = (deliverableFile?: string, deliverableUrl?: string) => {
    if (deliverableUrl) return deliverableUrl;
    if (!deliverableFile) return undefined;
    const base = import.meta.env.BASE_URL || '/';
    return `${base}deliverables/${m.id}/${deliverableFile}`;
  };

  const toggleDeliverable = (i: number) => {
    setExpandedDeliverables(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  const toggleStep = (i: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  const expandAllDeliverables = () => {
    setExpandedDeliverables(new Set(m.deliverables.map((_, i) => i)));
  };
  const collapseAllDeliverables = () => setExpandedDeliverables(new Set());

  const planDone = m.level3Plan.filter(s => s.done === true).length;
  const planTotal = m.level3Plan.length;
  const planPct = Math.round((planDone / planTotal) * 100);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-modal-backdrop"
      style={{ background: 'rgba(8, 8, 16, 0.65)' }}
      onClick={onClose}
    >
      <div
        className="animate-modal-pop relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-3xl glass-strong shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 25px 80px -10px ${accent.from}40, 0 0 0 1px rgba(255,255,255,0.08)`,
        }}
      >
        {/* Accent header glow */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 opacity-30 rounded-t-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${accent.from}, transparent 70%)` }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-7 md:p-10">
          {/* HEADER */}
          <div className="flex items-start gap-6 flex-wrap mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">{m.code}</span>
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                  style={{ background: accent.chip, color: accent.from, borderColor: `${accent.from}33` }}
                >
                  {m.ects} ECTS
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{m.title}</h2>
              <div className="text-sm text-muted-foreground">
                Organizer: <span className="text-foreground/80">{m.organizer}</span>
                <span className="opacity-60"> · </span>
                <span className="text-foreground/80">{m.type}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div
                className="text-3xl font-semibold tabular-nums"
                style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {pct}%
              </div>
              <div className="text-xs text-muted-foreground">{doneCount}/{totalCount} done · {status.label}</div>
              {m.briefFile && (
                <a
                  href={fileHref(m.briefFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
                >
                  Module brief <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* PATH CHIP */}
          <div
            className="animate-element animate-delay-100 mb-7 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase"
            style={{
              background: `linear-gradient(135deg, ${accent.from}15, ${accent.to}10)`,
              borderColor: `${accent.from}40`,
              color: accent.from,
            }}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Path: {m.assessmentPath}</span>
          </div>

          {/* NEXT ACTION */}
          <Section icon={<Sparkles className="w-4 h-4" />} title="Next action" delay={150}>
            <div
              className="rounded-2xl p-4 border text-foreground/90"
              style={{ background: accent.chip, borderColor: `${accent.from}33` }}
            >
              {m.nextAction}
            </div>
          </Section>

          {/* LEVEL 3 PLAN — each step expandable for detail */}
          <Section
            icon={<Target className="w-4 h-4" />}
            title={`What it takes for a 3 — ${planDone}/${planTotal} done (${planPct}%)`}
            delay={250}
          >
            <ol className="space-y-2.5">
              {m.level3Plan.map((step, i) => (
                <Level3StepRow
                  key={i}
                  step={step}
                  index={i}
                  accent={accent}
                  open={expandedSteps.has(i)}
                  onToggle={() => toggleStep(i)}
                />
              ))}
            </ol>
          </Section>

          {/* DELIVERABLES — each clickable to expand requirements + sub-todos */}
          <Section
            icon={<FileText className="w-4 h-4" />}
            title={`Deliverables — click any row to expand`}
            delay={350}
            actions={
              m.deliverables.some(d => d.requirements || d.subTodos) && (
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                  <button onClick={expandAllDeliverables} className="hover:text-violet-300 transition-colors">Expand all</button>
                  <span className="opacity-40">·</span>
                  <button onClick={collapseAllDeliverables} className="hover:text-violet-300 transition-colors">Collapse</button>
                </div>
              )
            }
          >
            <ul className="space-y-2">
              {m.deliverables.map((d, i) => (
                <DeliverableRow
                  key={i}
                  deliverable={d}
                  open={expandedDeliverables.has(i)}
                  onToggle={() => toggleDeliverable(i)}
                  fileHref={fileHref}
                  accent={accent}
                />
              ))}
            </ul>
          </Section>

          {/* GRANULAR CHECKLIST — kept for the cross-module audit view */}
          <Section icon={<Check className="w-4 h-4" />} title="Granular checklist" delay={450}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              {m.checklist.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ChecklistIcon done={c.done} />
                  <span className={c.done === true ? 'text-foreground/60 line-through' : 'text-foreground/90'}>
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* KEY RULES */}
          <Section icon={<AlertCircle className="w-4 h-4" />} title="Key rules" delay={550}>
            <ul className="space-y-1.5 text-sm text-foreground/85">
              {m.keyRules.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">·</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* NOTES */}
          {m.notes && (
            <Section icon={<BookOpen className="w-4 h-4" />} title="Notes" delay={650}>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.notes}</p>
            </Section>
          )}

          {m.oralExamDate && (
            <div className="mt-6 text-xs text-muted-foreground">
              Oral exam: <span className="text-foreground/80">{m.oralExamDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ============================================================================
   Sub-components
   ============================================================================ */

function Section({
  icon,
  title,
  delay,
  children,
  actions,
}: {
  icon: React.ReactNode;
  title: string;
  delay: number;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 animate-element" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-violet-300">{icon}</span>
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{title}</h3>
        <div className="flex-1 h-px bg-white/5" />
        {actions}
      </div>
      {children}
    </div>
  );
}

function Level3StepRow({
  step, index, accent, open, onToggle,
}: {
  step: Level3Step;
  index: number;
  accent: { from: string; to: string };
  open: boolean;
  onToggle: () => void;
}) {
  const isDone = step.done === true;
  const isPending = step.done === null;
  const hasDetail = !!(step.detail && step.detail.length > 0);

  return (
    <li
      className={`rounded-2xl border bg-white/[0.025] transition-all hover:bg-white/[0.045] ${
        hasDetail ? 'cursor-pointer' : ''
      }`}
      style={{
        borderColor: isDone ? '#10b98140' : isPending ? '#f59e0b30' : 'rgba(255,255,255,0.08)',
      }}
      onClick={hasDetail ? onToggle : undefined}
    >
      <div className="flex items-start gap-3 p-4">
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-medium"
          style={{
            background: isDone
              ? 'rgba(16, 185, 129, 0.2)'
              : isPending
              ? 'rgba(245, 158, 11, 0.15)'
              : `linear-gradient(135deg, ${accent.from}30, ${accent.to}20)`,
            color: isDone ? '#6ee7b7' : isPending ? '#fcd34d' : accent.from,
            border: `1px solid ${isDone ? '#10b98180' : isPending ? '#f59e0b40' : `${accent.from}40`}`,
          }}
        >
          {isDone ? <Check className="w-3.5 h-3.5" /> : index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className={`text-sm md:text-[15px] leading-snug ${isDone ? 'text-foreground/55 line-through' : 'text-foreground/95'}`}>
            {step.step}
          </div>
          {step.why && (
            <div className="mt-1 text-xs text-muted-foreground italic">
              <span className="text-foreground/50">why:</span> {step.why}
            </div>
          )}
        </div>
        {hasDetail && (
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 mt-1 flex-shrink-0 ${
              open ? 'rotate-180 text-violet-300' : ''
            }`}
          />
        )}
      </div>
      {hasDetail && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="px-4 pb-4 pl-14 space-y-1.5 text-sm text-foreground/80">
            {step.detail!.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-violet-400 mt-1">›</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function DeliverableRow({
  deliverable: d,
  open,
  onToggle,
  fileHref,
  accent,
}: {
  deliverable: Deliverable;
  open: boolean;
  onToggle: () => void;
  fileHref: (file?: string, url?: string) => string | undefined;
  accent: { from: string; to: string };
}) {
  const meta = statusMeta[d.status];
  const href = fileHref(d.file, d.url);
  const isStarred = d.name.startsWith('⭐');
  const expandable = !!(d.requirements || d.subTodos || d.detail);
  const subDone = d.subTodos?.filter(s => s.done === true).length ?? 0;
  const subTotal = d.subTodos?.length ?? 0;

  return (
    <li
      className={`group rounded-2xl border transition-all overflow-hidden ${
        isStarred
          ? 'border-violet-400/40 bg-violet-500/5 hover:bg-violet-500/10'
          : 'border-white/8 bg-white/[0.025] hover:bg-white/[0.05]'
      }`}
    >
      <div
        className={`flex items-start gap-4 flex-wrap p-4 ${expandable ? 'cursor-pointer' : ''}`}
        onClick={expandable ? onToggle : undefined}
      >
        <span className={`flex-shrink-0 text-[10px] font-mono tracking-widest px-2 py-1 rounded-full border ${meta.cls}`}>
          {meta.label}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm md:text-[15px] text-foreground/95 leading-snug">{d.name}</div>
          {d.notes && <div className="text-xs text-muted-foreground mt-1">{d.notes}</div>}
          {expandable && subTotal > 0 && (
            <div className="mt-1.5 text-[11px] font-mono text-muted-foreground">
              <span style={{ color: accent.from }}>{subDone}/{subTotal}</span> sub-tasks done
            </div>
          )}
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
          >
            Open <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {expandable && (
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 mt-1.5 flex-shrink-0 ${
              open ? 'rotate-180 text-violet-300' : ''
            }`}
          />
        )}
      </div>

      {/* EXPANDED CONTENT */}
      {expandable && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            open ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-5 pl-4 md:pl-12 space-y-5 border-t border-white/5 pt-4 mt-1 bg-black/10">
            {d.detail && (
              <p className="text-sm text-foreground/75 leading-relaxed italic">{d.detail}</p>
            )}
            {d.requirements && d.requirements.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-violet-300" />
                  Requirements
                </div>
                <ul className="space-y-1.5 text-sm text-foreground/85">
                  {d.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1">·</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {d.subTodos && d.subTodos.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                  <Target className="w-3 h-3 text-violet-300" />
                  Sub-tasks ({subDone}/{subTotal})
                </div>
                <ol className="space-y-1.5">
                  {d.subTodos.map((c, i) => (
                    <SubTodoRow key={i} item={c} index={i} />
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

function SubTodoRow({ item, index }: { item: ChecklistItem; index: number }) {
  return (
    <li className="flex items-start gap-3 text-sm pl-1">
      <span className="text-[10px] font-mono text-muted-foreground mt-1 w-5 flex-shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <ChecklistIcon done={item.done} />
      <span className={item.done === true ? 'text-foreground/55 line-through' : 'text-foreground/90'}>
        {item.label}
      </span>
    </li>
  );
}

function ChecklistIcon({ done }: { done: boolean | null }) {
  if (done === true) {
    return (
      <span className="mt-0.5 w-4 h-4 rounded flex items-center justify-center bg-emerald-500/20 border border-emerald-400/40 flex-shrink-0">
        <Check className="w-3 h-3 text-emerald-300" />
      </span>
    );
  }
  if (done === false) {
    return (
      <span className="mt-0.5 w-4 h-4 rounded flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0">
        <Minus className="w-3 h-3 text-muted-foreground/50" />
      </span>
    );
  }
  return (
    <span className="mt-0.5 w-4 h-4 rounded flex items-center justify-center bg-amber-500/10 border border-amber-400/20 border-dashed flex-shrink-0">
      <HelpCircle className="w-3 h-3 text-amber-300/80" />
    </span>
  );
}
