import { useState } from 'react';
import { Calendar, GitBranch, LogOut, Sparkles, Target, AlertTriangle, ArrowRight } from 'lucide-react';
import { data, moduleProgress, type ModuleData } from '../../data/modules';
import { daysBetween, today } from '../../lib/utils';
import { ModuleCard } from './ModuleCard';
import { ModuleModal } from './ModuleModal';

interface DashboardProps {
  onSignOut: () => void;
}

export function Dashboard({ onSignOut }: DashboardProps) {
  const [openModule, setOpenModule] = useState<ModuleData | null>(null);
  const [focusOpen, setFocusOpen] = useState(false);
  const [decisionsOpen, setDecisionsOpen] = useState(false);

  const daysLeft = daysBetween(today(), data.deadline);
  const totalEcts = data.modules.reduce((s, m) => s + m.ects, 0);
  const overallPct = Math.round(
    data.modules.reduce((s, m) => s + moduleProgress(m).pct, 0) / data.modules.length,
  );
  const openDecisions = data.decisions.filter((d) => d.status === 'open').length;

  return (
    <div className="min-h-[100dvh] w-full px-4 md:px-8 py-6 md:py-10 max-w-[1400px] mx-auto">
      {/* PROTOCOL BAR */}
      <div className="animate-element animate-delay-100 glass rounded-2xl px-4 md:px-6 py-3 mb-8 flex items-center justify-between flex-wrap gap-3 font-mono text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <span className="relative flex">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse-soft" />
            <span className="absolute w-2 h-2 rounded-full bg-violet-400/40 animate-pulse-soft" />
          </span>
          <span className="text-muted-foreground">SS26 // Hub v2.0</span>
          <span className="hidden sm:inline text-muted-foreground/50">·</span>
          <span className="hidden sm:inline text-foreground/80">{data.student}</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-muted-foreground hidden md:inline">Updated {data.lastUpdated}</span>
          <span className="text-muted-foreground/50 hidden md:inline">·</span>
          <span className="text-foreground/80">
            <span className="text-violet-300">{daysLeft}</span> days to {data.deadline}
          </span>
          <button
            onClick={onSignOut}
            className="ml-2 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            title="Back to landing"
          >
            <LogOut className="w-3 h-3" /> Sign out
          </button>
        </div>
      </div>

      {/* HERO STRIP */}
      <header className="mb-10">
        <div className="animate-element animate-delay-200 inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono uppercase tracking-widest text-violet-300 mb-5">
          <Sparkles className="w-3 h-3" /> {data.semester} hand-in window
        </div>
        <h1 className="animate-element animate-delay-300 text-4xl md:text-6xl font-semibold tracking-tighter leading-[1.05] mb-3">
          <span className="font-light text-foreground/95">Eight modules.</span>{' '}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            One hub.
          </span>
        </h1>
        <p className="animate-element animate-delay-400 text-muted-foreground max-w-2xl">
          Click any module to expand. Files live in this repo under{' '}
          <code className="text-violet-300 font-mono text-xs px-1.5 py-0.5 rounded bg-white/5">/deliverables/</code>.
          Notes, checklists, deadlines and rules — all click-deep, never blasted at you.
        </p>

        {/* STAT CHIPS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
          <StatChip
            label="Days left"
            value={daysLeft}
            sub={`until ${data.deadline}`}
            tone={daysLeft < 7 ? 'crit' : daysLeft < 14 ? 'warn' : 'default'}
            delay={500}
          />
          <StatChip label="Modules" value={data.modules.length} sub={`${totalEcts} ECTS in scope`} delay={600} />
          <StatChip label="Avg. progress" value={`${overallPct}%`} sub="across all 8 modules" delay={700} />
          <StatChip label="Open decisions" value={openDecisions} sub={openDecisions ? 'click to expand' : 'all clear'} tone={openDecisions > 2 ? 'warn' : 'default'} delay={800} />
        </div>
      </header>

      {/* TODAY'S FOCUS — collapsible */}
      <CollapsibleSection
        icon={<Target className="w-4 h-4" />}
        title="Today's focus"
        sub={`${data.todayFocus.length} items pinned`}
        open={focusOpen}
        onToggle={() => setFocusOpen((o) => !o)}
        accent="#a78bfa"
        delay={900}
      >
        <ul className="space-y-2">
          {data.todayFocus.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-foreground/90 rounded-xl bg-white/[0.025] p-3 border border-white/5"
            >
              <ArrowRight className="w-4 h-4 mt-0.5 text-violet-300 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* OPEN DECISIONS — collapsible */}
      <CollapsibleSection
        icon={<AlertTriangle className="w-4 h-4" />}
        title="Decisions"
        sub={`${openDecisions} open · ${data.decisions.length - openDecisions} resolved`}
        open={decisionsOpen}
        onToggle={() => setDecisionsOpen((o) => !o)}
        accent="#f472b6"
        delay={1000}
      >
        <ul className="space-y-2">
          {data.decisions.map((d) => (
            <li
              key={d.id}
              className="flex items-start gap-3 text-sm rounded-xl bg-white/[0.025] p-3 border border-white/5"
            >
              <span
                className={`text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${
                  d.status === 'open'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-400/30'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                }`}
              >
                {d.status === 'open' ? 'OPEN' : 'DONE'}
              </span>
              <span className={d.status === 'resolved' ? 'text-foreground/60 line-through' : 'text-foreground/90'}>
                {d.label}
              </span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* MODULES — the heart of the dashboard */}
      <section className="mt-10">
        <div className="animate-element animate-delay-1000 flex items-center gap-3 mb-5">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Modules</h2>
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            click to expand
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {data.modules.map((m, i) => (
            <ModuleCard key={m.id} module={m} index={i} onOpen={() => setOpenModule(m)} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 pt-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <GitBranch className="w-3 h-3" /> jeanlucandre-afk/modules-dashboard
        </span>
        <span className="inline-flex items-center gap-2">
          <Calendar className="w-3 h-3" /> {data.semester} · last sync {data.lastUpdated}
        </span>
      </footer>

      {/* MODAL — animated overlay */}
      {openModule && <ModuleModal module={openModule} onClose={() => setOpenModule(null)} />}
    </div>
  );
}

/* =============================================================
   Helpers
   ============================================================= */

function StatChip({
  label,
  value,
  sub,
  tone = 'default',
  delay,
}: {
  label: string;
  value: string | number;
  sub?: string;
  tone?: 'default' | 'warn' | 'crit';
  delay: number;
}) {
  const toneCls =
    tone === 'crit'
      ? 'border-rose-400/40 from-rose-500/10 text-rose-200'
      : tone === 'warn'
      ? 'border-amber-400/40 from-amber-500/10 text-amber-200'
      : 'border-white/10 from-white/5 text-foreground';

  return (
    <div
      className={`animate-element rounded-2xl glass p-4 bg-gradient-to-br to-transparent ${toneCls} border`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      <div className="text-2xl md:text-3xl font-semibold tabular-nums leading-none">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1.5">{sub}</div>}
    </div>
  );
}

function CollapsibleSection({
  icon,
  title,
  sub,
  open,
  onToggle,
  accent,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  open: boolean;
  onToggle: () => void;
  accent: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-element mb-3" style={{ animationDelay: `${delay}ms` }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl glass hover:border-violet-400/30 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span style={{ color: accent }}>{icon}</span>
          <span className="font-medium">{title}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">— {sub}</span>
        </span>
        <span className={`text-muted-foreground transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>
          <ArrowRight className="w-4 h-4" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          open ? 'max-h-[2000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 md:px-3">{children}</div>
      </div>
    </div>
  );
}
