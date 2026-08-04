import { useState } from 'react';
import { FilterProvider } from './context/FilterContext';
import BookSlider from './components/BookSlider';
import GroupFilters from './components/GroupFilters';
import NetworkGraph from './components/NetworkGraph';
import StreamGraph from './components/StreamGraph';
import TermsGraph from './components/TermsGraph';
import ExamView from './components/ExamView';
import PlacescapeView from './components/PlacescapeView';
import TrailView from './components/TrailView';
import SidePanel from './components/SidePanel';

type View = 'exam' | 'land' | 'network' | 'terms' | 'trail' | 'stream';

const TABS: { id: View; label: string; sub: string }[] = [
  { id: 'exam', label: 'Study / Exam', sub: 'everything the notes flagged, at a glance' },
  { id: 'land', label: 'The Named Land', sub: 'every place, and what happened there' },
  { id: 'network', label: 'People & Places', sub: 'who names what — and who gets shot with it' },
  { id: 'terms', label: 'Key Terms', sub: 'the book’s vocabulary as a concept map' },
  { id: 'trail', label: 'Trail of Wisdom', sub: 'the three conditions of mind' },
  { id: 'stream', label: 'Narrative Gravity', sub: 'what each section attends to' },
];

/** Views the global section window and group toggles actually drive. */
const FILTERED_VIEWS: View[] = ['land', 'network', 'stream'];

/**
 * Brand mark: water lying in an open container, with a trail coming down to it.
 * Goshtł’ish Tú Bił Sikáné is the first place Basso learns to pronounce, and
 * sikaa — "it sits" — is the container verb that makes wisdom sit in places.
 */
function BrandMark() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10 shrink-0" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      {/* the trail, coming down between two hills */}
      <path
        d="M 12 16 q 8 6 14 4 q 7 -2 12 6"
        fill="none"
        stroke="#b3854a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      {/* the open container */}
      <path
        d="M 16 30 L 19 46 Q 32 51 45 46 L 48 30"
        fill="none"
        stroke="#e0c088"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M 14 30 L 50 30" stroke="#e0c088" strokeWidth="2.2" strokeLinecap="round" />
      {/* the water standing in it */}
      <path
        d="M 18.5 38 q 6.75 -4 13.5 0 q 6.75 4 13.5 0 L 45 46 Q 32 51 19 46 Z"
        fill="#0e7490"
        opacity="0.6"
      />
      <path
        d="M 18.5 38 q 6.75 -4 13.5 0 q 6.75 4 13.5 0"
        fill="none"
        stroke="#5eead4"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState<View>('exam');
  const showFilters = FILTERED_VIEWS.includes(view);

  return (
    <FilterProvider>
      <div className="h-full flex flex-col bg-slate-950">
        {/* ——— Branded header ——— */}
        <header className="border-b border-slate-800 px-4 sm:px-5 py-2 sm:py-3 flex flex-wrap items-center gap-x-8 gap-y-1.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <BrandMark />
            <div>
              <h1 className="font-display font-bold text-[15px] sm:text-[20px] leading-none text-sepia-200 uppercase tracking-[0.1em] sm:tracking-[0.16em]">
                Wisdom Sits in Places — Study Companion
              </h1>
              <p className="text-[12px] text-slate-400 mt-1 tracking-wide">
                A study aid to Keith H. Basso&apos;s ethnography of landscape and language among the
                Western Apache
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Project by{' '}
                <a
                  href="https://curtishoffmann.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-orange-300 underline decoration-dotted underline-offset-2"
                >
                  Curtis Hoffmann
                </a>
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1 ml-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                title={t.sub}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md text-[13px] sm:text-[15px] transition-colors border ${
                  view === t.id
                    ? 'bg-orange-900/40 border-orange-600/60 text-orange-200'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </header>

        {/* ——— Global controls: section window + group toggles ——— */}
        {showFilters && (
          <div className="border-b border-slate-800 px-4 sm:px-5 py-2 sm:py-2.5 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-1.5 bg-slate-900/40">
            <BookSlider />
            {view === 'network' && <GroupFilters />}
          </div>
        )}

        {/* ——— Main: view + reading panel (side-by-side on desktop, stacked on mobile) ——— */}
        <main className="flex-1 flex flex-col md:flex-row min-h-0">
          <section className="flex-1 min-w-0 min-h-0">
            {view === 'exam' && <ExamView onNavigate={(v) => setView(v as View)} />}
            {view === 'land' && <PlacescapeView />}
            {view === 'network' && <NetworkGraph />}
            {view === 'terms' && <TermsGraph />}
            {view === 'trail' && <TrailView />}
            {view === 'stream' && <StreamGraph />}
          </section>
          <SidePanel />
        </main>
      </div>
    </FilterProvider>
  );
}
