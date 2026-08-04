import { CHARACTER_BY_ID } from '../data/characters';
import { PLACE_BY_ID, KIND_COLORS, KIND_LABELS } from '../data/places';
import { CONDITIONS } from '../data/wisdom';
import { DOMAIN_COLORS, DOMAIN_LABELS, TERM_BY_ID, TERM_LINKS } from '../data/terms';
import { parseLbCitation } from '../data/bookLines';
import { INTERACTIONS } from '../data/interactions';
import { ALIGNMENT_COLORS, useFilters } from '../context/FilterContext';
import type { Interaction, InteractionType } from '../types';

/** Thematic tags inferred from interaction type — the book's own vocabulary. */
const TYPE_THEMES: Record<InteractionType, string[]> = {
  naming: ['Place-naming'],
  stalking: ['Stalking with stories'],
  speaking: ['Speaking with names'],
  teaching: ['Instruction & fieldwork'],
  travel: ['Riding the country'],
  story: ['Narrative'],
  dwelling: ['Using the land'],
  citing: ['Theory'],
  mapping: ['The Cibecue atlas project'],
};

function ThemeChips({ themes }: { themes: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {themes.map((t) => (
        <span
          key={t}
          className="text-[11px] px-1.5 py-0.5 rounded-full bg-sepia-700/30 text-sepia-300 border border-sepia-600/40"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/** Citation that jumps the Guide tab to the cited section. */
function CitationLink({ citation, book }: { citation?: string; book: number }) {
  const { openText } = useFilters();
  const parsed = citation ? parseLbCitation(citation) : null;
  return (
    <button
      onClick={() => openText(parsed?.book ?? book, parsed?.line)}
      className="text-[11px] font-mono text-orange-400/90 hover:text-orange-300 hover:underline whitespace-nowrap"
      title={
        parsed
          ? `Open the section guide near the cited pages`
          : `Open section ${book} in the Guide tab`
      }
    >
      {citation ?? `Section ${book}`} ↗
    </button>
  );
}

function InteractionCard({ i }: { i: Interaction }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3 space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-orange-300">§{i.book}</span>
        <span className="text-[11px] uppercase tracking-wider text-slate-400">
          {i.type} · weight {i.weight}
        </span>
      </div>
      {i.arrow && (
        <div className="text-[11px] text-red-300 border border-red-700/50 rounded px-1.5 py-0.5 inline-block">
          ★ An arrow — a story aimed at someone, or an exam-flagged exchange
        </div>
      )}
      <p className="text-[15px] text-slate-100 leading-relaxed">{i.summary}</p>
      {i.insight && (
        <p className="text-[13.5px] italic font-reading text-sepia-200 leading-relaxed border-l-2 border-sepia-600/60 pl-2.5">
          {i.insight}
        </p>
      )}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <ThemeChips themes={TYPE_THEMES[i.type]} />
        <CitationLink citation={i.citation} book={i.book} />
      </div>
    </div>
  );
}

/**
 * Commentary tab: close-reading notes for the current selection — a network
 * edge (a scene), an entity/node, or a key term.
 */
export default function CloseReadingPanel() {
  const { selection, setSelection } = useFilters();

  return (
    <div className="h-full overflow-y-auto p-4 space-y-3">
      {selection && (
        <div className="flex justify-end -mb-1">
          <button
            onClick={() => setSelection(null)}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            clear selection ✕
          </button>
        </div>
      )}

      {!selection && (
        <div className="text-[15px] text-slate-300 leading-relaxed space-y-3">
          <p>
            Select a <b className="text-slate-100">place</b> on the Named Land, an{' '}
            <b className="text-slate-100">edge</b> or <b className="text-slate-100">node</b> in
            People &amp; Places, a <b className="text-slate-100">term</b> in the Key Terms map, or a{' '}
            <b className="text-slate-100">condition of mind</b> on the Trail of Wisdom, to see
            notes and page citations here.
          </p>
          <p>
            Every citation links into the <b className="text-slate-100">Guide</b> tab — original
            section-by-section synopses written for this study aid (the book itself is in copyright
            and worth owning).
          </p>
          <p className="text-[13px] text-slate-500 italic font-reading">
            Red dashed edges mark an <b className="text-red-300/90">arrow</b> — a story shot at
            someone, in Nick Thompson’s metaphor, or an exchange the exam turns on.
          </p>
        </div>
      )}

      {selection?.kind === 'edge' && (
        <>
          <div className="font-display text-xl text-slate-50">
            {CHARACTER_BY_ID[selection.a]?.name} ↔ {CHARACTER_BY_ID[selection.b]?.name}
          </div>
          <div className="text-xs text-slate-500 -mt-2">
            {selection.interactions.length} scene
            {selection.interactions.length === 1 ? '' : 's'} in the selected window · combined
            weight {selection.interactions.reduce((s, i) => s + i.weight, 0)}
          </div>
          {selection.interactions
            .slice()
            .sort((a, b) => a.book - b.book)
            .map((i, idx) => (
              <InteractionCard key={idx} i={i} />
            ))}
        </>
      )}

      {selection?.kind === 'term' && (() => {
        const t = TERM_BY_ID[selection.id];
        if (!t) return null;
        const related = TERM_LINKS.filter((l) => l.source === t.id || l.target === t.id);
        return (
          <>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-xl italic text-slate-50">{t.term}</span>
              <span
                className="text-[11px] px-1.5 py-0.5 rounded-full border whitespace-nowrap"
                style={{ color: DOMAIN_COLORS[t.domain], borderColor: DOMAIN_COLORS[t.domain] }}
              >
                {t.lang} · {DOMAIN_LABELS[t.domain]}
              </span>
            </div>
            {t.exam && (
              <div className="text-[11px] text-orange-300 border border-orange-700/50 rounded px-1.5 py-0.5 inline-block">
                ★ Flagged KEY / on the exam
              </div>
            )}
            <p className="text-[15px] text-slate-100 leading-relaxed">{t.gloss}</p>
            {t.note && (
              <p className="text-[13.5px] italic font-reading text-sepia-200 leading-relaxed border-l-2 border-sepia-600/60 pl-2.5">
                {t.note}
              </p>
            )}
            <div className="text-[11px] uppercase tracking-widest text-slate-500 pt-1">
              Related terms ({related.length})
            </div>
            <div className="space-y-2">
              {related.map((l, idx) => {
                const other = TERM_BY_ID[l.source === t.id ? l.target : l.source];
                if (!other) return null;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelection({ kind: 'term', id: other.id })}
                    className="w-full text-left rounded-lg border border-slate-700 bg-slate-900/70 p-2.5 hover:border-orange-600/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-[15px] italic text-slate-100">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: DOMAIN_COLORS[other.domain] }} />
                        {other.term}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 whitespace-nowrap">
                        {l.relation}
                      </span>
                    </div>
                    {l.note && <p className="text-[13px] text-slate-400 mt-1">{l.note}</p>}
                  </button>
                );
              })}
            </div>
          </>
        );
      })()}

      {selection?.kind === 'character' && (() => {
        const c = CHARACTER_BY_ID[selection.id];
        if (!c) return null;
        const involved = INTERACTIONS.filter(
          (i) => i.source === c.id || i.target === c.id,
        ).sort((a, b) => a.book - b.book);
        return (
          <>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-xl text-slate-50">{c.name}</span>
              <span
                className="text-[11px] px-1.5 py-0.5 rounded-full border whitespace-nowrap"
                style={{ color: ALIGNMENT_COLORS[c.alignment], borderColor: ALIGNMENT_COLORS[c.alignment] }}
              >
                {c.type} · {c.alignment}
              </span>
            </div>
            {c.epithets.length > 0 && (
              <div className="italic text-[13.5px] font-reading text-sepia-300 -mt-1">
                {c.epithets.join(' · ')}
              </div>
            )}
            {c.group_size > 1 && (
              <div className="text-[13px] text-slate-400">
                Collective / institution node representing{' '}
                <b className="text-slate-200">{c.group_size}</b> or more.
              </div>
            )}
            {c.note && <p className="text-[13px] text-slate-400">{c.note}</p>}
            {c.placeId && (
              <button
                onClick={() => setSelection({ kind: 'place', id: c.placeId! })}
                className="text-[12px] text-teal-300 hover:text-teal-200 underline decoration-dotted underline-offset-2"
              >
                Open the full place entry — naming, story &amp; lesson ↗
              </button>
            )}
            <div className="text-[11px] uppercase tracking-widest text-slate-500 pt-1">
              All recorded scenes ({involved.length})
            </div>
            {involved.map((i, idx) => (
              <InteractionCard key={idx} i={i} />
            ))}
          </>
        );
      })()}

      {selection?.kind === 'place' && (() => {
        const p = PLACE_BY_ID[selection.id];
        if (!p) return null;
        const scenes = INTERACTIONS.filter(
          (i) => i.source === `p_${p.id}` || i.target === `p_${p.id}`,
        ).sort((a, b) => a.book - b.book);
        return (
          <>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-xl text-slate-50">{p.gloss}</span>
              <span
                className="text-[11px] px-1.5 py-0.5 rounded-full border whitespace-nowrap"
                style={{ color: KIND_COLORS[p.kind], borderColor: KIND_COLORS[p.kind] }}
              >
                {p.kind}
              </span>
            </div>
            {p.apache ? (
              <div className="font-display text-[17px] text-sepia-200 -mt-1">{p.apache}</div>
            ) : (
              <div className="text-[12px] text-slate-500 italic -mt-1">
                Toponym given in translation only — see the orthography note.
              </div>
            )}
            <div className="text-[12px] text-slate-400">
              {KIND_LABELS[p.kind]} · {p.pages}
              {p.teacher ? ` · with ${p.teacher}` : ''}
            </div>
            {p.exam && (
              <div className="text-[11px] text-orange-300 border border-orange-700/50 rounded px-1.5 py-0.5 inline-block">
                ★ Flagged for the exam
              </div>
            )}
            <div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                How it got its name
              </div>
              <p className="text-[15px] text-slate-100 leading-relaxed">{p.naming}</p>
            </div>
            {p.story && (
              <div>
                <div className="text-[11px] uppercase tracking-widest text-slate-500">
                  What happened here
                </div>
                <p className="text-[15px] text-slate-100 leading-relaxed">{p.story}</p>
              </div>
            )}
            <div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                Why it matters
              </div>
              <p className="text-[13.5px] italic font-reading text-sepia-200 leading-relaxed border-l-2 border-sepia-600/60 pl-2.5">
                {p.lesson}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] uppercase tracking-widest text-slate-500">
                Scenes ({scenes.length})
              </span>
              <CitationLink citation={p.pages} book={p.book} />
            </div>
            {scenes.map((i, idx) => (
              <InteractionCard key={idx} i={i} />
            ))}
          </>
        );
      })()}

      {selection?.kind === 'condition' && (() => {
        const c = CONDITIONS.find((k) => k.id === selection.id);
        if (!c) return null;
        return (
          <>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-xl text-slate-50">{c.name}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full border border-violet-500 text-violet-300 whitespace-nowrap">
                condition of mind
              </span>
            </div>
            <div className="font-display text-[17px] text-sepia-200 -mt-1">{c.apache}</div>
            {c.wards && <div className="text-[12px] text-violet-300">{c.wards}</div>}
            <div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                The word by itself
              </div>
              <p className="text-[14px] text-slate-300 leading-relaxed">{c.literal}</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                The metaphor
              </div>
              <p className="text-[15px] text-slate-100 leading-relaxed">{c.metaphor}</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                What such a mind does
              </div>
              <p className="text-[15px] text-slate-100 leading-relaxed">{c.does}</p>
            </div>
            <div className="rounded-lg border border-red-800/60 bg-red-950/20 p-3">
              <div className="text-[11px] uppercase tracking-widest text-red-300/90 mb-1">
                ★ If this condition is not met
              </div>
              <ul className="space-y-1">
                {c.ifAbsent.map((line) => (
                  <li key={line} className="text-[14px] text-red-100/90 leading-snug flex gap-1.5">
                    <span className="text-red-400/70">–</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            {c.story && (
              <button
                onClick={() => setSelection({ kind: 'place', id: c.story!.placeId })}
                className="w-full text-left rounded-lg border border-slate-700 bg-slate-900/70 p-2.5 hover:border-orange-600/60 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-widest text-slate-500">
                  Dudley’s illustration
                </div>
                <div className="text-[15px] text-slate-100">{c.story.title} ↗</div>
                <p className="text-[13px] text-slate-400 mt-1">{c.story.failing}</p>
              </button>
            )}
          </>
        );
      })()}
    </div>
  );
}
