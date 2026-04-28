import { useEffect } from 'react';
import { X, FileText, ExternalLink, Check, Minus, HelpCircle, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import type { ModuleData, DeliverableStatus } from '../../data/modules';
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

  // Build the file URL: deliverable.url (external) OR deliverable.file (relative to /deliverables/{moduleId}/)
  const fileHref = (deliverableFile?: string, deliverableUrl?: string) => {
    if (deliverableUrl) return deliverableUrl;
    if (!deliverableFile) return undefined;
    // deliverables live next to dist root
    const base = import.meta.env.BASE_URL || '/';
    return `${base}deliverables/${m.id}/${deliverableFile}`;
  };

  return (
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
        {/* Accent header */}
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
          <div className="flex items-start gap-6 flex-wrap mb-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">{m.code}</span>
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                  style={{ background: accent.chip, color: accent.from, borderColor: `${accent.from}33` }}
                >
                  {m.ects} ECTS
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  · Target Level {m.targetLevel}
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

          {/* NEXT ACTION — hero callout */}
          <Section icon={<Sparkles className="w-4 h-4" />} title="Next action" delay={100}>
            <div
              className="rounded-2xl p-4 border text-foreground/90"
              style={{ background: accent.chip, borderColor: `${accent.from}33` }}
            >
              {m.nextAction}
            </div>
          </Section>

          {/* DELIVERABLES */}
          <Section icon={<FileText className="w-4 h-4" />} title="Deliverables" delay={200}>
            <ul className="space-y-2">
              {m.deliverables.map((d, i) => {
                const href = fileHref(d.file, d.url);
                const meta = statusMeta[d.status];
                return (
                  <li
                    key={i}
                    className="group rounded-2xl border border-white/8 bg-white/[0.025] hover:bg-white/[0.05] transition-colors p-4"
                  >
                    <div className="flex items-start gap-4 flex-wrap">
                      <span className={`flex-shrink-0 text-[10px] font-mono tracking-widest px-2 py-1 rounded-full border ${meta.cls}`}>
                        {meta.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm md:text-[15px] text-foreground/95 leading-snug">{d.name}</div>
                        {d.notes && <div className="text-xs text-muted-foreground mt-1">{d.notes}</div>}
                      </div>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
                        >
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Section>

          {/* CHECKLIST */}
          <Section icon={<Check className="w-4 h-4" />} title="Checklist" delay={300}>
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
          <Section icon={<AlertCircle className="w-4 h-4" />} title="Key rules" delay={400}>
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
            <Section icon={<BookOpen className="w-4 h-4" />} title="Notes" delay={500}>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.notes}</p>
            </Section>
          )}

          {/* DEADLINE STRIP */}
          {m.oralExamDate && (
            <div className="mt-6 text-xs text-muted-foreground">
              Oral exam: <span className="text-foreground/80">{m.oralExamDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----- helpers ----- */

function Section({
  icon,
  title,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 animate-element" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-violet-300">{icon}</span>
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{title}</h3>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      {children}
    </div>
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
