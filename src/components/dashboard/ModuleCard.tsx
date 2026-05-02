import { useRef, useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { ModuleData } from '../../data/modules';
import { getAccent, moduleProgress, moduleStatusLabel } from '../../data/modules';
import { ProgressRing } from './ProgressRing';

interface ModuleCardProps {
  module: ModuleData;
  index: number;
  onOpen: () => void;
}

export function ModuleCard({ module: m, index, onOpen }: ModuleCardProps) {
  const accent = getAccent(m);
  const { pct, doneCount, totalCount } = moduleProgress(m);
  const status = moduleStatusLabel(m);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const toneClass: Record<typeof status.tone, string> = {
    ok:   'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    warn: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
    crit: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
    todo: 'bg-white/5 text-muted-foreground border-white/10',
  };

  /** 3D tilt on mousemove */
  const onMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    // Tilt up to 7° — subtle, not a carnival ride
    const rotY = ((x / w) - 0.5) * 14;
    const rotX = -((y / h) - 0.5) * 14;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    setGlowPos({ x: (x / w) * 100, y: (y / h) * 100 });
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <button
      ref={cardRef}
      onClick={onOpen}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="animate-card group relative text-left overflow-hidden rounded-3xl glass p-6 transition-[border-color,box-shadow,transform] duration-300 hover:border-violet-400/40 hover:shadow-[0_30px_60px_-15px_rgba(167,139,250,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
      style={{
        animationDelay: `${0.2 + index * 0.08}s`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Cursor-aware accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${glowPos.x}% ${glowPos.y}%, ${accent.from}30, transparent 40%)`,
        }}
      />
      {/* Top stripe */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.from}, ${accent.to}, transparent)` }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
              {m.code}
            </span>
            <span
              className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
              style={{ background: accent.chip, color: accent.from, borderColor: `${accent.from}33` }}
            >
              {m.ects} ECTS
            </span>
          </div>
          <h3 className="text-xl md:text-[1.35rem] font-semibold leading-tight tracking-tight mb-3">
            {m.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${toneClass[status.tone]}`}>
              {status.label}
            </span>
            <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {doneCount}/{totalCount} deliverables
            </span>
          </div>
        </div>

        <ProgressRing pct={pct} from={accent.from} to={accent.to} label="done" />
      </div>

      {/* Footer reveal — next action peeks in on hover */}
      <div className="relative mt-4 pt-4 border-t border-white/5">
        <div className="flex items-start justify-between gap-3">
          <div className="text-xs text-muted-foreground line-clamp-2 flex-1">
            <span className="text-foreground/70">Next:</span> {m.nextAction}
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-violet-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
        </div>
      </div>
    </button>
  );
}
