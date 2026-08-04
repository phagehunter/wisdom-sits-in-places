import { useEffect, useMemo, useState } from 'react';
import { PLACES, KIND_COLORS, KIND_LABELS } from '../data/places';
import { BOOK_SHORT } from '../data/bookTitles';
import { useFilters } from '../context/FilterContext';
import { useElementSize } from '../hooks/useElementSize';
import type { Feature, Place } from '../types';

const W = 1500;
const H = 600;

/**
 * The Named Land — every place Basso is taken to, laid out as a schematic
 * country rather than a map.
 *
 * This is deliberate. Basso recorded Cibecue's place-names on topographic maps
 * under restrictions agreed with the community, and this companion reproduces
 * no locations at all: the places are arranged left to right in the order the
 * book walks through them, gathered into four chapter grounds, with a creek
 * drawn through to hold the water-names together. Nothing here can be used to
 * find anything.
 */
const CHAPTER_BANDS: { book: number; x0: number; x1: number }[] = [
  { book: 2, x0: 20, x1: 400 },
  { book: 3, x0: 400, x1: 720 },
  { book: 4, x0: 720, x1: 990 },
  { book: 5, x0: 990, x1: 1480 },
];

// Sits below the mid-row labels so it never crosses a place-name.
const CREEK =
  'M 30 366 C 190 340, 320 396, 470 356 S 700 318, 880 350 S 1150 322, 1470 340';

/** Terrain glyphs, drawn at the origin so each place can translate them. */
function Glyph({ feature, color }: { feature: Feature; color: string }) {
  switch (feature) {
    case 'water':
      return (
        <g stroke={color} strokeWidth={1.7} fill="none" strokeLinecap="round">
          <path d="M -9 -3 q 4.5 -3 9 0 q 4.5 3 9 0" />
          <path d="M -9 1.5 q 4.5 -3 9 0 q 4.5 3 9 0" />
          <path d="M -9 6 q 4.5 -3 9 0 q 4.5 3 9 0" />
        </g>
      );
    case 'rock':
      return (
        <g fill="none" stroke={color} strokeWidth={1.7} strokeLinejoin="round">
          <path d="M -10 6 L -4 -5 L 2 6 Z" />
          <path d="M 0 6 L 6 -2 L 11 6 Z" />
        </g>
      );
    case 'tree':
      return (
        <g stroke={color} strokeWidth={1.7} fill="none" strokeLinecap="round">
          <path d="M 0 7 L 0 -1" />
          <path d="M 0 -1 L -6 4 M 0 -1 L 6 4 M 0 -4 L -4 0 M 0 -4 L 4 0" />
          <path d="M 0 -8 L -3 -4 M 0 -8 L 3 -4" />
        </g>
      );
    case 'trail':
      return (
        <g stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeDasharray="3 3.5">
          <path d="M -10 7 q 7 -8 10 -7 q 4 1 10 -7" />
        </g>
      );
    default: // plain
      return (
        <g stroke={color} strokeWidth={1.7} fill="none" strokeLinecap="round">
          <path d="M -10 5 L 10 5" />
          <path d="M -6 5 L -7 -1 M -1 5 L -1 -3 M 5 5 L 6 -1" />
        </g>
      );
  }
}

export default function PlacescapeView() {
  const { bookRange, setSelection, selection } = useFilters();
  const { ref, width } = useElementSize<HTMLDivElement>();
  const [examOnly, setExamOnly] = useState(false);
  const [hover, setHover] = useState<Place | null>(null);
  // Device detection uses the viewport, NOT the container width — on desktop
  // the reading panel can squeeze this pane well below phone widths.
  const [phone, setPhone] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setPhone(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const shown = useMemo(() => PLACES.filter((p) => !examOnly || p.exam), [examOnly]);
  const inWindow = (p: Place) => p.book >= bookRange[0] && p.book <= bookRange[1];
  const selectedId = selection?.kind === 'place' ? selection.id : null;

  return (
    <div ref={ref} className="relative w-full h-full overflow-auto p-4">
      <div className="mb-1 flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
        <div>
          <h2 className="font-display text-lg text-sepia-200">
            The Named Land — every place, and what happened there
          </h2>
          <p className="hidden sm:block text-xs text-slate-400 max-w-4xl">
            Eighteen named places, in the order the book walks through them. Ring colour gives the
            naming layer — <span style={{ color: KIND_COLORS.descriptive }}>descriptive</span>,{' '}
            <span style={{ color: KIND_COLORS.clan }}>clan</span>,{' '}
            <span style={{ color: KIND_COLORS.commemorative }}>commemorative</span> — and a gold star
            marks the places the exam asks for. Click any place for its name, its story and its
            lesson. <b>Not a map:</b> the layout is schematic on purpose (see the note below).
          </p>
          <p className="sm:hidden text-[10px] text-slate-500">
            ← swipe sideways · tap a place for its story →
          </p>
        </div>
        <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none hover:text-slate-100 whitespace-nowrap">
          <input
            type="checkbox"
            checked={examOnly}
            onChange={() => setExamOnly((v) => !v)}
            className="accent-orange-500 w-3.5 h-3.5"
          />
          ★ exam places only
        </label>
      </div>

      {width > 0 && (
        <div className="overflow-x-auto">
          <svg width={Math.max(width - 32, W)} height={H}>
            {/* chapter grounds */}
            {CHAPTER_BANDS.map((b, i) => {
              const dim = !(b.book >= bookRange[0] && b.book <= bookRange[1]);
              return (
                <g key={b.book} opacity={dim ? 0.25 : 1}>
                  <rect
                    x={b.x0}
                    y={16}
                    width={b.x1 - b.x0}
                    height={H - 40}
                    fill={i % 2 === 0 ? '#0b1220' : '#0d1526'}
                    stroke="#1e293b"
                  />
                  <text
                    x={(b.x0 + b.x1) / 2}
                    y={34}
                    textAnchor="middle"
                    className="fill-slate-500 text-[10px] font-semibold tracking-[0.2em] uppercase"
                  >
                    {BOOK_SHORT[b.book]}
                  </text>
                </g>
              );
            })}

            {/* the creek, drawn to gather the water-names — not a real course */}
            <path d={CREEK} fill="none" stroke="#1e4d5c" strokeWidth={7} opacity={0.8} />
            <path d={CREEK} fill="none" stroke="#2dd4bf" strokeWidth={1.4} opacity={0.4} />
            <text x={36} y={388} className="fill-teal-700 text-[9px] italic">
              a creek, schematically
            </text>

            {/* the places */}
            {shown.map((p) => {
              const dim = !inWindow(p);
              const color = KIND_COLORS[p.kind];
              const isSel = selectedId === p.id;
              const anchorEnd = p.x > 1290;
              const lx = anchorEnd ? -18 : 18;
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.x},${p.y})`}
                  opacity={dim ? 0.22 : 1}
                  className="cursor-pointer"
                  onClick={() => setSelection({ kind: 'place', id: p.id })}
                  onMouseEnter={() => setHover(p)}
                  onMouseLeave={() => setHover((h) => (h?.id === p.id ? null : h))}
                >
                  {/* generous invisible hit area for fingers */}
                  <circle r={22} fill="transparent" />
                  <circle
                    r={13}
                    fill="#020617"
                    stroke={color}
                    strokeWidth={isSel ? 2.6 : 1.4}
                    strokeDasharray={p.kind === 'commemorative' ? '3 2.5' : undefined}
                  />
                  <Glyph feature={p.feature} color={color} />
                  {p.exam && (
                    <text
                      x={0}
                      y={-17}
                      textAnchor="middle"
                      className="fill-amber-300 text-[12px] font-bold"
                    >
                      ★
                    </text>
                  )}
                  {isSel && <circle r={19} fill="none" stroke="#f8fafc" strokeWidth={1.2} />}

                  <text
                    x={lx}
                    y={-1}
                    textAnchor={anchorEnd ? 'end' : 'start'}
                    className="fill-sepia-200 font-display text-[12.5px]"
                  >
                    {p.apache ?? p.gloss}
                  </text>
                  <text
                    x={lx}
                    y={12}
                    textAnchor={anchorEnd ? 'end' : 'start'}
                    className="fill-slate-400 text-[10.5px]"
                  >
                    {p.apache ? p.gloss : '(toponym in translation only)'}
                  </text>
                  <text
                    x={lx}
                    y={24}
                    textAnchor={anchorEnd ? 'end' : 'start'}
                    className="fill-slate-600 text-[9px]"
                  >
                    {p.pages}
                    {p.teacher ? ` · ${p.teacher}` : ''}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* legend + the reason this is not a map */}
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-slate-400">
        <div className="space-y-0.5">
          {(Object.keys(KIND_LABELS) as Place['kind'][]).map((k) => (
            <div key={k} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border shrink-0"
                style={{ borderColor: KIND_COLORS[k] }}
              />
              <span style={{ color: KIND_COLORS[k] }}>{KIND_LABELS[k]}</span>
            </div>
          ))}
        </div>
        <div className="space-y-0.5">
          <div>Glyphs mark terrain: water · rock · tree · trail · open ground.</div>
          <div>Dashed ring = commemorative, the names that carry a moral.</div>
          <div>Sections outside the slider window are dimmed.</div>
        </div>
      </div>

      <p className="mt-2 max-w-4xl text-[11px] text-slate-500 leading-relaxed border-t border-slate-800 pt-2">
        <b className="text-slate-400">Why this is not a map.</b> Basso&apos;s survey was authorized
        by the White Mountain Apache Tribal Council to found a local Apache atlas, and he published
        the material under restrictions he said would never be violated. Cibecue&apos;s places are
        not ours to locate, so nothing here is positioned geographically — the arrangement is a
        reading order, not a country. On orthography: toponyms follow Basso&apos;s spellings as
        printed, and the two names whose nasalized vowels could not be reproduced reliably are shown
        in translation only rather than guessed at.
      </p>

      {/* hover card — desktop only */}
      {hover && !phone && (
        <div className="absolute z-40 top-16 right-6 w-80 bg-slate-900/95 border border-slate-600 rounded-lg shadow-2xl p-3 pointer-events-none">
          <div className="font-display text-base text-sepia-200">{hover.apache ?? hover.gloss}</div>
          {hover.apache && <div className="text-[13px] text-slate-300">{hover.gloss}</div>}
          <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: KIND_COLORS[hover.kind] }}>
            {hover.kind} · {hover.pages}
          </div>
          <p className="text-[12.5px] text-slate-400 mt-1.5 leading-snug">{hover.naming}</p>
          <div className="mt-1.5 text-[10px] text-slate-500">click for the story &amp; the lesson</div>
        </div>
      )}
    </div>
  );
}
