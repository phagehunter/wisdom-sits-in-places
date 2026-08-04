/**
 * Wisdom Sits in Places is four independent essays plus a preface, each essay
 * centred on a different Apache teacher. Section 6 separates out the closing
 * meditation on sense of place, which the lectures treat as its own unit.
 */
export const BOOK_TITLES: Record<number, string> = {
  1: 'Preface — How People Know Their Country',
  2: 'Ch. 1 — Quoting the Ancestors (Charles Henry)',
  3: 'Ch. 2 — Stalking with Stories (Nick Thompson)',
  4: 'Ch. 3 — Speaking with Names (Lola Machuse)',
  5: 'Ch. 4 — Wisdom Sits in Places (Dudley Patterson)',
  6: 'Coda — Sense of Place',
};

/** Short labels for tight spaces (stream-graph axis, playback bar). */
export const BOOK_SHORT: Record<number, string> = {
  1: 'Preface',
  2: 'Ch. 1 Quoting',
  3: 'Ch. 2 Stalking',
  4: 'Ch. 3 Speaking',
  5: 'Ch. 4 Wisdom',
  6: 'Coda',
};

/** The Apache teacher at the centre of each section. */
export const SECTION_TEACHER: Record<number, string> = {
  1: 'Ronnie Lupe & the Cibecue project',
  2: 'Charles Henry',
  3: 'Nick Thompson',
  4: 'Lola Machuse',
  5: 'Dudley Patterson',
  6: 'Basso in his own voice',
};

export const SECTION_COUNT = 6;

/** The sections that carry the argument — the four essays and the closing meditation. */
export const CORE_SECTIONS: number[] = [2, 3, 4, 5, 6];
