import { ACQUISITION, CONDITIONS, DETECTION, WISDOM_DEF } from '../data/wisdom';
import { useFilters } from '../context/FilterContext';
import type { Condition } from '../data/wisdom';

/**
 * The Trail of Wisdom — Ch. 4 laid out as a study sheet: what wisdom is, the
 * three conditions of mind with the consequences of each failing, how it is
 * acquired, and how its presence or absence is detected.
 *
 * The layout encodes the dependency that matters: smoothness is the
 * PRIMARY condition, and it is produced and preserved by the two subsidiary
 * ones — resilience against distraction from outside, steadiness against
 * distraction from within.
 */

/** A vessel of water: places are containers, and wisdom is what stands in them. */
function Vessel() {
  return (
    <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0" aria-hidden="true">
      <path d="M 10 12 L 13 40 Q 24 44 35 40 L 38 12" fill="none" stroke="#d9c19a" strokeWidth="2" />
      <path d="M 8 12 L 40 12" stroke="#d9c19a" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M 12 24 q 6 -3.5 12 0 q 6 3.5 12 0 L 35 40 Q 24 44 13 40 Z"
        fill="#0e7490"
        opacity="0.55"
      />
      <path d="M 12 24 q 6 -3.5 12 0 q 6 3.5 12 0" fill="none" stroke="#5eead4" strokeWidth="1.5" />
    </svg>
  );
}

function ConditionCard({ c, primary }: { c: Condition; primary?: boolean }) {
  const { setSelection, selection } = useFilters();
  const active = selection?.kind === 'condition' && selection.id === c.id;
  return (
    <button
      onClick={() => setSelection({ kind: 'condition', id: c.id })}
      className={`text-left w-full rounded-xl border bg-slate-900/60 p-3.5 transition-colors ${
        active ? 'border-orange-500/80' : primary ? 'border-violet-600/70' : 'border-slate-700'
      } hover:border-orange-600/70`}
    >
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <span className="font-display text-[17px] text-slate-50">{c.name}</span>
        {primary && (
          <span className="text-[10px] uppercase tracking-widest text-violet-300 border border-violet-600/60 rounded-full px-1.5 py-0.5">
            primary condition
          </span>
        )}
      </div>
      <div className="font-display text-[15px] text-sepia-200">{c.apache}</div>
      {c.wards && <div className="text-[11px] text-violet-300/90 mt-0.5">{c.wards}</div>}

      <div className="mt-2 text-[10px] uppercase tracking-widest text-slate-500">The metaphor</div>
      <p className="text-[13.5px] text-slate-200 leading-snug">{c.metaphor}</p>

      <div className="mt-2 text-[10px] uppercase tracking-widest text-slate-500">
        What such a mind does
      </div>
      <p className="text-[13px] text-slate-400 leading-snug">{c.does}</p>

      <div className="mt-2.5 rounded-lg border border-red-800/60 bg-red-950/25 p-2.5">
        <div className="text-[10px] uppercase tracking-widest text-red-300/90 mb-1">
          ★ If it is not met
        </div>
        <ul className="space-y-0.5">
          {c.ifAbsent.map((line) => (
            <li key={line} className="text-[13px] text-red-100/90 leading-snug flex gap-1.5">
              <span className="text-red-400/70 shrink-0">–</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {c.story && (
        <div className="mt-2 text-[12px] text-slate-400">
          <span className="text-slate-500">Dudley’s illustration: </span>
          <span className="text-orange-300">{c.story.title}</span>
        </div>
      )}
    </button>
  );
}

export default function TrailView() {
  const smooth = CONDITIONS.find((c) => c.id === 'smooth')!;
  const subsidiary = CONDITIONS.filter((c) => c.id !== 'smooth');

  return (
    <div className="w-full h-full overflow-y-auto p-4 space-y-4">
      <div>
        <h2 className="font-display text-lg text-sepia-200">
          The Trail of Wisdom — the three conditions of mind
        </h2>
        <p className="text-xs text-slate-400 max-w-4xl">
          Dudley Patterson learned this from his grandmother and delivers it in a register close to
          Apache prayer — grammatical parallelism, marked repetition of words, and the measured
          repetition of a few very old metaphors. Read it bottom-up: the two subsidiary conditions
          produce the primary one, and the primary one produces wisdom. Click any card for the full
          entry.
        </p>
      </div>

      {/* ——— what wisdom is ——— */}
      <div className="rounded-xl border border-sepia-700/50 bg-slate-900/60 p-4">
        <div className="flex items-start gap-3">
          <Vessel />
          <div className="min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-display text-xl text-slate-50">{WISDOM_DEF.apache}</span>
              <span className="text-[13px] text-sepia-300 italic">wisdom — {WISDOM_DEF.short}</span>
            </div>
            <p className="text-[14px] text-slate-200 leading-relaxed mt-1">{WISDOM_DEF.long}</p>
            <p className="text-[13px] italic font-reading text-sepia-200 leading-relaxed mt-2 border-l-2 border-sepia-600/60 pl-2.5">
              {WISDOM_DEF.water}
            </p>
            <p className="text-[12.5px] text-slate-400 leading-relaxed mt-2">
              {WISDOM_DEF.distribution}
            </p>
            <div className="text-[11px] font-mono text-orange-400/80 mt-1">
              {WISDOM_DEF.citation}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] uppercase tracking-[0.25em] text-slate-500">
        ↑ produced by ↑
      </div>

      {/* ——— the primary condition ——— */}
      <ConditionCard c={smooth} primary />

      <div className="text-center text-[11px] uppercase tracking-[0.25em] text-slate-500">
        ↑ produced &amp; preserved by ↑
      </div>

      {/* ——— the two subsidiary conditions ——— */}
      <div className="grid gap-3 md:grid-cols-2">
        {subsidiary.map((c) => (
          <ConditionCard key={c.id} c={c} />
        ))}
      </div>

      {/* ——— the trail: how wisdom is acquired ——— */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4">
        <h3 className="font-display text-[17px] text-sepia-200">
          How it is acquired — the trail itself
        </h3>
        <p className="text-[13px] italic font-reading text-sepia-300 leading-relaxed mt-1 border-l-2 border-sepia-600/60 pl-2.5">
          Your life is like a trail, and you must be watchful as you go: wherever you go there is
          some kind of danger waiting to happen, and you must see it in your mind before it happens.
          Walk it well and your trail extends a long way.
        </p>
        <ol className="mt-3 space-y-2.5">
          {ACQUISITION.map((a, i) => (
            <li key={a.step} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full border border-orange-600/60 text-orange-300 text-[12px] flex items-center justify-center tabular-nums">
                {i + 1}
              </span>
              <div className="min-w-0">
                <div className="text-[14.5px] text-slate-100">{a.step}</div>
                <p className="text-[13px] text-slate-400 leading-snug">{a.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[13px] text-slate-300 border-t border-slate-800 pt-2">
          <b className="text-sepia-200">The knowledge wisdom depends on comes from places.</b>{' '}
          Knowing them, their names, and what happened at them long ago gives numerous worked
          examples of the conditions a mind needs — and an authoritative reason to want them. So the
          instruction to the young is: drink from places. Then you can work on your mind.
        </p>
      </div>

      {/* ——— detection ——— */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4">
        <h3 className="font-display text-[17px] text-sepia-200">
          How you would detect its presence — or its absence
        </h3>
        <ul className="mt-2 space-y-1.5">
          {DETECTION.map((d) => (
            <li key={d} className="text-[13.5px] text-slate-300 leading-snug flex gap-2">
              <span className="text-teal-400/70 shrink-0">◦</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
