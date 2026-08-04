# Wisdom Sits in Places — Study Companion

A single-page study aid for Keith H. Basso's *Wisdom Sits in Places: Landscape and Language Among the Western Apache* (University of New Mexico Press, 1996), covering the preface, all four essays, and the closing meditation on sense of place.

A **★** throughout the app marks material flagged as essential — the passages, places and terms the book keeps returning to, and the ones worth committing to memory.

It combines **distant reading** (the named land, a concept map, a narrative-gravity chart) with **close reading** (a chapter-by-chapter guide and entry-level commentary on every place, person and term), in a dark academic theme.

## Six views

| View | What it shows |
|---|---|
| **Study Guide** | The landing sheet: the book in one idea, the four Apache teachers and the lesson each one teaches, the four Chapter 1 places with toponym / naming / story / lesson, the three conditions of mind with the consequences of each failing, the hunting metaphor, why the horsemen never criticize Talbert directly, the short lists (what the land does, the four place-making questions, the three naming layers, the three modes of landscape involvement), the speech-genre table, every ★ starred term, and a per-chapter nutshell. |
| **The Named Land** | All eighteen named places as a schematic country — terrain glyphs, ring colour by naming layer (descriptive / clan / commemorative), gold stars on the places that carry the most weight. Click any place for how it got its name, what happened there, and what Cibecue draws from it. **Deliberately not a map** — see *Ethics & orthography* below. |
| **People & Places** | A force-directed graph in which people, places, story-figures and cited scholars share one network — because in Cibecue a mountain can be spoken of as a grandmother and a place can stalk a person for life. **Red dashed edges** mark an *arrow*: a story aimed at someone. Node size ∝ degree centrality (capped). The cited scholars start hidden so the Apache world reads first. |
| **Key Terms** | The book's vocabulary as a concept map — Basso's analytic terms, the Western Apache words the argument turns on, and the theory he borrows, linked by the relations the text itself draws. A **gold ring** marks the essential vocabulary. |
| **Trail of Wisdom** | Chapter 4 laid out as a study sheet: what wisdom is, then the dependency structure — smoothness is primary, and resilience (against distraction from outside) and steadiness (against distraction from within) produce it — each with its metaphor, what such a mind does, the consequences if it is absent, and Dudley Patterson's illustrative story. Then how wisdom is acquired, and how its presence or absence is detected. |
| **Narrative Gravity** | A D3 stream graph of what each section attends to (places, language, wisdom, the ancestral past, method), with a teacher strip under the axis. Ch. 1 is thick with the past, Ch. 3 with language, Ch. 4 almost entirely with mind. |

A **global section slider** (Preface … Coda) and, in the network, **group toggles** re-render the filtered views, and a **playback control** animates the book section by section. Clicking any place, node, edge, term or condition opens the **Commentary** panel with notes and page citations — each linking into the **Guide** tab, original per-section synopses written for this project.

## Ethics & orthography

Two decisions are worth stating plainly, because both are departures from what the data would allow.

- **No locations.** Basso's survey was authorized by the White Mountain Apache Tribal Council to found a local Apache atlas, and he published the material under restrictions he said would never be violated. Cibecue's places are not ours to locate, so the Named Land positions nothing geographically: the layout is a reading order, with a schematic creek drawn only to gather the water-names. Nothing here can be used to find anything.
- **No invented diacritics.** Toponyms and Apache terms follow Basso's spellings as printed, checked against the book's own index. Two names — Trail Extends Into A Grove Of Sticklike Trees, and Coyote Pisses In The Water — appear in translation only, because their nasalized vowels could not be reproduced reliably and a study aid should not guess.

The book is in copyright and is not reproduced here. Every summary, gloss and guide is original paraphrase. Buy the book — it is extraordinary.

## Develop & build

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Deploy to GitHub Pages

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds on every push to `main` and force-pushes `dist/` to the `gh-pages` branch. In the repository settings, set **Pages → Source: Deploy from a branch → `gh-pages` → `/ (root)`**.

## Caveats

- Narrative-gravity percentages and interaction weights are reading estimates for visualization, not counts.
- The names of Basso's consultants are their own; he names them in his acknowledgments, and all of them had died by the time the book appeared.
- Page numbers are the print pagination of the 1996 edition.

## Data model

All content is embedded as TypeScript constants in `src/data/`, so the views can never drift apart:

- `places.ts` — the eighteen named places: toponym, naming layer, terrain, pages, teacher, how it was named, the story, the lesson. Place nodes in the network are generated from this file.
- `characters.ts` — teachers, learners, story-figures, cited scholars, plus a place node per entry in `places.ts`.
- `interactions.ts` — the scene ledger: who names what, who is shot with which story, who cites whom.
- `terms.ts` — the concept map and its typed relations.
- `wisdom.ts` — the spine of the argument: the conditions of mind, acquisition, detection, and the short lists.
- `public/text/book-1..6.json` — the section guides.
