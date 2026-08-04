import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useFilters } from '../context/FilterContext';
import { NAME_REGEX, NAME_TO_ID } from '../data/nameMap';
import { BOOK_LINES, SECTION_PAGES } from '../data/bookLines';
import { BOOK_TITLES, SECTION_COUNT } from '../data/bookTitles';

interface SectionGuide {
  title: string;
  pages: string;
  paragraphs: string[];
}

/** In-memory cache: each section guide is fetched at most once per session. */
const guideCache = new Map<number, SectionGuide>();

/** Character names become live links: hover spotlights the node in the
 *  network view; click flies the camera to it. */
function LinkedText({ text }: { text: string }) {
  const { setHighlight } = useFilters();
  const parts = text.split(NAME_REGEX);
  return (
    <>
      {parts.map((part, idx): ReactNode => {
        const id = NAME_TO_ID[part];
        if (!id) return part;
        return (
          <span
            key={idx}
            role="button"
            tabIndex={0}
            className="text-orange-300 border-b border-dotted border-orange-500/50 cursor-pointer rounded-sm hover:text-orange-200 hover:bg-orange-900/30 transition-colors"
            title="Hover: highlight in network · Click: fly to node"
            onMouseEnter={() => setHighlight({ id, focus: false })}
            onMouseLeave={() => setHighlight(null)}
            onClick={() => setHighlight({ id, focus: true })}
            onKeyDown={(e) => e.key === 'Enter' && setHighlight({ id, focus: true })}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}

/**
 * Section-guide reader. Wisdom Sits in Places (Univ. of New Mexico Press, 1996) is in
 * copyright, so instead of the full text this tab serves original synopses
 * written for this study aid, one per section, from public/text/.
 */
export default function TextReader() {
  const { readerBook, readerLine, setReaderBook } = useFilters();
  const [guide, setGuide] = useState<SectionGuide | null>(guideCache.get(readerBook) ?? null);
  const [failed, setFailed] = useState(false);
  const [flashPara, setFlashPara] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    if (guideCache.has(readerBook)) {
      setGuide(guideCache.get(readerBook)!);
      setFailed(false);
      return;
    }
    setGuide(null);
    setFailed(false);
    fetch(`${import.meta.env.BASE_URL}text/book-${readerBook}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d: SectionGuide) => {
        guideCache.set(readerBook, d);
        if (alive) setGuide(d);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [readerBook]);

  // Land near the cited passage: the cited page's position within the
  // section maps proportionally onto the guide's paragraphs. Without a
  // page target, start at the top.
  useEffect(() => {
    if (!guide) return;
    const paragraphs = guide.paragraphs;
    if (readerLine) {
      const total = BOOK_LINES[readerBook] ?? 30;
      const idx = Math.min(
        paragraphs.length - 1,
        Math.max(0, Math.round((readerLine / total) * (paragraphs.length - 1))),
      );
      const el = document.getElementById(`lb-${readerBook}-${idx}`);
      if (el) {
        el.scrollIntoView({ block: 'center' });
        setFlashPara(idx);
        const t = setTimeout(() => setFlashPara(null), 2600);
        return () => clearTimeout(t);
      }
    }
    scrollRef.current?.scrollTo({ top: 0 });
  }, [guide, readerBook, readerLine]);

  const pages = SECTION_PAGES[readerBook];

  return (
    <div className="flex flex-col min-h-0 h-full">
      {/* Section navigation */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/40">
        <button
          onClick={() => setReaderBook(Math.max(1, readerBook - 1))}
          disabled={readerBook <= 1}
          className="px-2 py-0.5 rounded text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Previous section"
        >
          ‹
        </button>
        <select
          value={readerBook}
          onChange={(e) => setReaderBook(Number(e.target.value))}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-orange-600"
          aria-label="Select section"
        >
          {Array.from({ length: SECTION_COUNT }, (_, i) => i + 1).map((b) => (
            <option key={b} value={b}>
              {b}. {BOOK_TITLES[b]}
            </option>
          ))}
        </select>
        <button
          onClick={() => setReaderBook(Math.min(SECTION_COUNT, readerBook + 1))}
          disabled={readerBook >= SECTION_COUNT}
          className="px-2 py-0.5 rounded text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Next section"
        >
          ›
        </button>
      </div>

      {/* Guide body — measure capped so wide panels stay comfortable to read */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4">
        <div className="max-w-[42rem] mx-auto">
          <h3 className="font-display text-2xl text-sepia-200 mb-1 tracking-wide">
            {guide?.title ?? BOOK_TITLES[readerBook]}
          </h3>
          <div className="text-[11px] text-slate-500 mb-3">
            Section guide · covers {guide?.pages ?? (pages ? `pp. ${pages[0]}–${pages[1]}` : '')} of the book
          </div>

          {failed && (
            <p className="text-sm text-rose-300">
              Could not load this section guide. Try reloading the page.
            </p>
          )}
          {!failed && !guide && <p className="text-sm text-slate-500 italic">Loading…</p>}

          {guide && (
            <div className="space-y-4">
              {guide.paragraphs.map((p, i) => (
                <p
                  key={i}
                  id={`lb-${readerBook}-${i}`}
                  className={`font-reading text-[16px] leading-[1.8] text-slate-100 rounded-md transition-colors duration-700 ${
                    i === 0 ? 'drop-cap' : ''
                  } ${flashPara === i ? 'bg-orange-900/30 ring-1 ring-orange-600/50 px-2 -mx-2' : ''}`}
                >
                  <LinkedText text={p} />
                </p>
              ))}
            </div>
          )}

          {/* Attribution & name key */}
          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
            <p>
              <span className="text-orange-400/80">Names are linked</span> — hover one to spotlight
              that person in the network view; click to fly the camera to their node.
            </p>
            <p>
              These guides are original summaries written for this study aid. The book itself —{' '}
              <b className="text-slate-400">
                Keith H. Basso, <i>Wisdom Sits in Places: Landscape and Language Among the Western
                Apache</i> (University of New Mexico Press, 1996)
              </b>{' '}
              — is in copyright and very much worth reading in full.
            </p>
            <p>
              Basso published his Cibecue material under restrictions agreed with the community and
              the White Mountain Apache Tribal Council. This companion follows that spirit: it
              paraphrases rather than reproduces, and gives no locations for any named place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
