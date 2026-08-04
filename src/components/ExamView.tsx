import { CHARACTER_BY_ID } from '../data/characters';
import { PLACES, KIND_COLORS } from '../data/places';
import { TERMS, DOMAIN_COLORS, DOMAIN_LABELS } from '../data/terms';
import type { TermDomain } from '../data/terms';
import {
  ACQUISITION,
  CONDITIONS,
  LAND_CLAIMS,
  LANDSCAPE_MODES,
  NAME_LAYERS,
  PLACEMAKING_QUESTIONS,
  SPEECH_GENRES,
  TEACHERS,
  WISDOM_DEF,
} from '../data/wisdom';
import { BOOK_TITLES } from '../data/bookTitles';
import { useFilters } from '../context/FilterContext';

/** One line per section, for the last-minute skim. */
const NUTSHELL: Record<number, string> = {
  1: 'The case for the whole project: people everywhere ask what happened here, yet ethnographers take senses of place for granted. Ronnie Lupe’s phrase — how people know their country — names the subject, and the Cibecue mapping project is the method.',
  2: 'Charles Henry takes Basso to four places and builds a place-world at each. Along the way: the three layers of naming, why a mispronounced name is disrespect, and why the names do not lie even when the water is gone.',
  3: 'Nick Thompson supplies the mechanism. Speech divides into ordinary talk, prayer and narrative; narrative into myths, historical tales, sagas and gossip. Historical tales are arrows — they are shot at offenders, and the place goes on stalking them afterwards.',
  4: 'Lola Machuse’s kitchen. A woman is worried about her sick brother; three place-names are spoken in sequence, with long silences, and no one says a critical word about him. Criticism delivered as pictures to travel to.',
  5: 'Dudley Patterson answers the question the book is named for. Old Man Owl is fired at Talbert Paxton, and the grandmother’s trail of wisdom sets out the three conditions of mind — with exact consequences for each failing.',
  6: 'Basso in his own voice: sense of place, dwelling, and an indictment of a discipline that has left the subject in a dimly lit region. Place-making is a way of doing history, and we are, in a sense, the place-worlds we imagine.',
};

function Section({
  title,
  flag,
  children,
}: {
  title: string;
  flag?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900/40 p-4">
      <h3 className="font-display text-[17px] text-sepia-200 flex items-baseline gap-2 flex-wrap">
        {title}
        {flag && (
          <span className="text-[10px] uppercase tracking-widest text-orange-300 border border-orange-700/60 rounded-full px-1.5 py-0.5">
            {flag}
          </span>
        )}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default function ExamView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const { setSelection, openText } = useFilters();
  const examPlaces = PLACES.filter((p) => p.exam);
  const ch1Places = examPlaces.filter((p) => p.book === 2);
  const laterPlaces = examPlaces.filter((p) => p.book !== 2);
  const examTerms = TERMS.filter((t) => t.exam);
  const domains = [...new Set(examTerms.map((t) => t.domain))] as TermDomain[];

  return (
    <div className="w-full h-full overflow-y-auto p-4 space-y-4">
      {/* ——— the book in one idea ——— */}
      <section className="rounded-xl border border-sepia-700/50 bg-slate-900/60 p-4">
        <h2 className="font-display text-lg text-sepia-200">The book in one idea</h2>
        <p className="text-[15px] text-slate-100 leading-relaxed mt-1">
          Among the Western Apache of Cibecue, places are not scenery and place-names are not labels.
          A name is a picture made of words, spoken by the ancestors and quoted verbatim every time it
          is used. Attached to each name is a story, and the stories are aimed at people who are
          living badly — so the landscape works as a moral instrument that instructs without accusing.
          Learn the places and you inherit the ancestors’ knowledge; learn to think with them and you
          become wise. Lose them, and you lose the ability to live right.
        </p>
        <p className="text-[13.5px] italic font-reading text-sepia-200 leading-relaxed mt-2 border-l-2 border-sepia-600/60 pl-2.5">
          Basso’s wider claim is disciplinary: what people make of their places is closely connected
          to what they make of themselves, and anthropology has barely studied it. He calls the
          subject a dimly lit region, and proposes an ethnography of lived topographies.
        </p>
      </section>

      {/* ——— the four teachers ——— */}
      <Section title="The four Apache individuals & the lesson each teaches" flag="★★★ on the exam">
        <p className="text-[12px] text-slate-500 mb-2">
          Know each one by first and last name, their significance, and the lesson about place-names
          and language they teach Basso.
        </p>
        <div className="grid gap-2.5 lg:grid-cols-2">
          {TEACHERS.map((t) => {
            const c = CHARACTER_BY_ID[t.id];
            return (
              <button
                key={t.id}
                onClick={() => setSelection({ kind: 'character', id: t.id })}
                className="text-left rounded-lg border border-slate-700 bg-slate-900/70 p-3 hover:border-orange-600/60 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span className="font-display text-[16px] text-slate-50">{c?.name}</span>
                  <span className="text-[10.5px] text-orange-300/90">{t.chapter}</span>
                </div>
                <div className="text-[14px] text-sepia-200 mt-0.5">
                  <b>Lesson:</b> {t.lesson}
                </div>
                <p className="text-[13px] text-slate-400 leading-snug mt-1">{t.why}</p>
                {c?.epithets?.length ? (
                  <div className="text-[11.5px] italic text-slate-500 mt-1">
                    {c.epithets.join(' · ')}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </Section>

      {/* ——— the four places of Ch. 1 ——— */}
      <Section
        title="Ch. 1: the four places — toponym, how it was named, the story, the lesson"
        flag="★★★ on the exam"
      >
        <div className="space-y-2.5">
          {ch1Places.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelection({ kind: 'place', id: p.id })}
              className="w-full text-left rounded-lg border border-slate-700 bg-slate-900/70 p-3 hover:border-orange-600/60 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <span className="font-display text-[16px] text-slate-50">{p.gloss}</span>
                <span className="text-[11px] font-mono" style={{ color: KIND_COLORS[p.kind] }}>
                  {p.kind} · {p.pages}
                </span>
              </div>
              {p.apache && <div className="font-display text-[15px] text-sepia-200">{p.apache}</div>}
              <p className="text-[13px] text-slate-300 leading-snug mt-1">
                <b className="text-slate-400">Named:</b> {p.naming}
              </p>
              {p.story && (
                <p className="text-[13px] text-slate-300 leading-snug mt-1">
                  <b className="text-slate-400">Story:</b> {p.story}
                </p>
              )}
              <p className="text-[13px] italic font-reading text-sepia-200 leading-snug mt-1 border-l-2 border-sepia-600/60 pl-2">
                <b>Why it matters:</b> {p.lesson}
              </p>
            </button>
          ))}
        </div>
        <p className="text-[12px] text-slate-500 mt-2">
          The other exam-flagged places sit in later chapters:{' '}
          {laterPlaces.map((p, i) => (
            <span key={p.id}>
              {i > 0 && ' · '}
              <button
                onClick={() => setSelection({ kind: 'place', id: p.id })}
                className="text-teal-300 hover:text-teal-200 underline decoration-dotted underline-offset-2"
              >
                {p.gloss}
              </button>
            </span>
          ))}
          . See them all on{' '}
          <button
            onClick={() => onNavigate?.('land')}
            className="text-orange-300 hover:text-orange-200 underline decoration-dotted underline-offset-2"
          >
            the Named Land
          </button>
          .
        </p>
      </Section>

      {/* ——— the trail of wisdom ——— */}
      <Section
        title="The Trail of Wisdom — three conditions, and what happens without each"
        flag="★★★ know all three, be specific"
      >
        <p className="text-[13.5px] text-slate-200 leading-relaxed">
          <b className="text-sepia-200">{WISDOM_DEF.apache}</b> — {WISDOM_DEF.short}. Smoothness is
          the primary condition; resilience wards off distraction from outside and steadiness from
          within, and together they produce it. None is given at birth.
        </p>
        <div className="grid gap-2.5 mt-2 lg:grid-cols-3">
          {CONDITIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelection({ kind: 'condition', id: c.id })}
              className="text-left rounded-lg border border-slate-700 bg-slate-900/70 p-3 hover:border-orange-600/60 transition-colors"
            >
              <div className="font-display text-[15.5px] text-slate-50">{c.name}</div>
              <div className="font-display text-[14px] text-sepia-200">{c.apache}</div>
              <div className="text-[11px] text-violet-300/90 mt-0.5">{c.wards}</div>
              <p className="text-[12.5px] text-slate-400 leading-snug mt-1.5">{c.metaphor}</p>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-red-300/90">
                If not met
              </div>
              <ul className="mt-0.5">
                {c.ifAbsent.map((l) => (
                  <li key={l} className="text-[12.5px] text-red-100/90 leading-snug flex gap-1.5">
                    <span className="text-red-400/70 shrink-0">–</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              {c.story && (
                <div className="text-[11.5px] text-orange-300/90 mt-1.5">→ {c.story.title}</div>
              )}
            </button>
          ))}
        </div>
        <p className="text-[12px] text-slate-500 mt-2">
          How it is acquired, in one line:{' '}
          <span className="text-slate-300">
            {ACQUISITION.map((a) => a.step.toLowerCase()).join(' → ')}
          </span>
          . Full version on{' '}
          <button
            onClick={() => onNavigate?.('trail')}
            className="text-orange-300 hover:text-orange-200 underline decoration-dotted underline-offset-2"
          >
            the Trail of Wisdom
          </button>
          .
        </p>
      </Section>

      {/* ——— the arrow, and why indirection ——— */}
      <Section title="Stalking with stories — and why nobody says it straight" flag="★ on the exam">
        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">
              The hunting metaphor
            </div>
            <p className="text-[13.5px] text-slate-200 leading-snug mt-0.5">
              Storytellers are hunters, stories are arrows, and mountains are grandmothers. Someone
              stalks you — a grandmother, a grandfather, an uncle, anyone — and tells a story about
              what happened long ago. You know it is aimed at you. A weak one bounces off; a strong
              one goes in deep and starts working on your mind. You feel weak, you don’t want to eat
              or talk. Then you want to <b className="text-sepia-200">replace yourself</b>. You may
              try to pull the arrow out, but the place keeps stalking you — even in a distant city,
              even after the person who shot you has died.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">
              Why the horsemen did not simply tell Talbert Paxton
            </div>
            <ol className="text-[13.5px] text-slate-200 leading-snug mt-0.5 space-y-1 list-decimal list-inside">
              <li>
                Explicit criticism would have insulted and condescended — from his manner he had
                already reached those conclusions himself, and telling a man what he knows treats him
                as a child.
              </li>
              <li>
                None of them had the standing: instruction on personal life belongs to his older
                matrilineal kinsmen, and he was unrelated to Dudley and Sam and only distantly to
                Charles Cromwell.
              </li>
              <li>They were fond of him, and valued his company and his hard work.</li>
              <li>
                Above all, they wanted the lesson attached to something concrete, fixed and
                permanent — something he had seen and could go to see again: a place upon the land.
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* ——— the short lists ——— */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="What the land does" flag="★ know these claims">
          <ul className="space-y-1">
            {LAND_CLAIMS.map((l) => (
              <li key={l} className="text-[14px] text-slate-200 flex gap-2">
                <span className="text-orange-400/70 shrink-0">›</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-slate-500 mt-2">
            Annie Peaches, Nick Thompson, Ronnie Lupe and Benson Lewis, pp. 38–39, 62, 70. The
            landscape is a repository of distilled wisdom and a stern but benevolent keeper of
            tradition.
          </p>
        </Section>

        <Section title="Place-making: the four questions" flag="★ on the exam">
          <ul className="space-y-1">
            {PLACEMAKING_QUESTIONS.map((q) => (
              <li key={q} className="text-[15px] text-slate-100 italic font-reading">
                {q}
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-slate-500 mt-2">
            Place-making needs no special skill — anyone with the inclination can do it, which makes
            it a universal tool of the historical imagination. Answering these questions builds a
            place-world.
          </p>
        </Section>

        <Section title="The three layers of Apache naming" flag="★ in order">
          <ol className="space-y-2">
            {NAME_LAYERS.map((l, i) => (
              <li key={l.kind} className="text-[13.5px]">
                <span className="font-semibold" style={{ color: KIND_COLORS[l.kind] }}>
                  {i + 1}. {l.kind}
                </span>
                <div className="text-slate-300 leading-snug">{l.when}</div>
                <div className="text-slate-500 leading-snug">{l.note}</div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Three ways Cibecue involves itself with the landscape" flag="★ Ch. 3">
          <ol className="space-y-1.5">
            {LANDSCAPE_MODES.map((m, i) => (
              <li key={m.mode} className="text-[13.5px]">
                <span className="text-sepia-200 font-semibold">
                  {i + 1}. {m.mode}
                </span>
                <div className="text-slate-400 leading-snug">{m.detail}</div>
              </li>
            ))}
          </ol>
          <p className="text-[12px] text-slate-500 mt-2">
            People alternate freely among these modes, and combine them.
          </p>
        </Section>
      </div>

      {/* ——— speech genres ——— */}
      <Section title="Western Apache speech & narrative" flag="★ know the genres">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="py-1 pr-3 font-normal">Genre</th>
                <th className="py-1 pr-3 font-normal">When it happened</th>
                <th className="py-1 font-normal">What it is for</th>
              </tr>
            </thead>
            <tbody>
              {SPEECH_GENRES.map((g) => (
                <tr key={g.name} className="border-t border-slate-800 align-top">
                  <td className="py-1.5 pr-3 text-slate-100">{g.name}</td>
                  <td className="py-1.5 pr-3 text-slate-400 whitespace-nowrap">{g.temporal}</td>
                  <td className="py-1.5 text-slate-400">{g.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ——— every flagged term ——— */}
      <Section title={`Every flagged term (${examTerms.length})`} flag="★ vocabulary">
        <div className="space-y-3">
          {domains.map((d) => (
            <div key={d}>
              <div
                className="text-[10px] uppercase tracking-widest mb-1"
                style={{ color: DOMAIN_COLORS[d] }}
              >
                {DOMAIN_LABELS[d]}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {examTerms
                  .filter((t) => t.domain === d)
                  .map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelection({ kind: 'term', id: t.id })}
                      title={t.gloss}
                      className="text-[13px] rounded-full border px-2 py-0.5 text-slate-200 hover:text-white transition-colors"
                      style={{ borderColor: `${DOMAIN_COLORS[d]}66` }}
                    >
                      {t.term}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-slate-500 mt-2">
          Click any term for its gloss and its links. The full network is on{' '}
          <button
            onClick={() => onNavigate?.('terms')}
            className="text-orange-300 hover:text-orange-200 underline decoration-dotted underline-offset-2"
          >
            Key Terms
          </button>
          .
        </p>
      </Section>

      {/* ——— chapter nutshells ——— */}
      <Section title="Chapter by chapter, in a nutshell">
        <div className="space-y-2">
          {Object.entries(NUTSHELL).map(([b, text]) => (
            <button
              key={b}
              onClick={() => openText(Number(b))}
              className="w-full text-left rounded-lg border border-slate-800 bg-slate-900/50 p-2.5 hover:border-orange-600/50 transition-colors"
            >
              <div className="text-[13.5px] text-sepia-200">
                §{b}. {BOOK_TITLES[Number(b)]}
              </div>
              <p className="text-[13px] text-slate-400 leading-snug mt-0.5">{text}</p>
            </button>
          ))}
        </div>
      </Section>

      <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800 pt-3">
        Compiled from the course lectures and reading notes for ANTHR 101, weighted toward everything
        flagged <span className="text-orange-300">EXAM</span> or{' '}
        <span className="text-orange-300">***</span>. All summaries and glosses are original
        paraphrase; page numbers are the print pagination of the 1996 edition, checked against the
        book’s own index. Basso is worth reading in full.
      </p>
    </div>
  );
}
