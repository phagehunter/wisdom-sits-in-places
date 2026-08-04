import { useFilters } from '../context/FilterContext';
import { SECTION_COUNT } from '../data/bookTitles';

/**
 * Global dual-thumb section-range slider (Preface … Coda). Drives the network
 * graph, the Named Land dimming, and stream-graph emphasis.
 */
export default function BookSlider() {
  const { bookRange, setBookRange } = useFilters();
  const [from, to] = bookRange;

  const pct = (v: number) => ((v - 1) / (SECTION_COUNT - 1)) * 100;

  return (
    <div className="flex items-center gap-3 sm:gap-4 min-w-[230px] flex-1 max-w-xl">
      <span className="text-xs uppercase tracking-widest text-slate-400 whitespace-nowrap">
        Sections
      </span>
      <div className="relative flex-1 h-8">
        {/* track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded bg-slate-700" />
        {/* active window */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded bg-orange-500/80"
          style={{ left: `${pct(from)}%`, right: `${100 - pct(to)}%` }}
        />
        <input
          type="range"
          min={1}
          max={SECTION_COUNT}
          value={from}
          onChange={(e) => setBookRange([Math.min(Number(e.target.value), to), to])}
          className="book-thumb absolute inset-0 w-full h-full z-20"
          aria-label="First section"
        />
        <input
          type="range"
          min={1}
          max={SECTION_COUNT}
          value={to}
          onChange={(e) => setBookRange([from, Math.max(Number(e.target.value), from)])}
          className="book-thumb absolute inset-0 w-full h-full z-30"
          aria-label="Last section"
        />
        {/* tick labels */}
        <div className="absolute -bottom-1.5 left-0 right-0 flex justify-between text-[9px] text-slate-500 pointer-events-none">
          {Array.from({ length: SECTION_COUNT }, (_, i) => i + 1).map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
      <span className="font-display font-semibold text-base text-sepia-200 whitespace-nowrap tabular-nums">
        {from === to ? `Section ${from}` : `Sections ${from}–${to}`}
      </span>
    </div>
  );
}
