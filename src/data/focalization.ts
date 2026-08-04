import type { FocalizationRow } from '../types';

/**
 * Narrative-gravity table: editorial estimates of how much of each section
 * attends to places themselves, to language and speech, to wisdom and
 * morality, to the ancestral past, and to method and theory. Values are
 * percentages summing to 100. These are reading estimates for visualization,
 * not counts.
 */
export const FOCALIZATION: FocalizationRow[] = [
  // 1 Preface - the case for studying places at all
  { book: 1, places: 30, language: 10, wisdom: 8, history: 12, method: 40 },
  // 2 Ch. 1 - four place-worlds built on the ground with Charles Henry
  { book: 2, places: 40, language: 14, wisdom: 8, history: 30, method: 8 },
  // 3 Ch. 2 - speech genres, the arrow metaphor, cultural ecology
  { book: 3, places: 22, language: 34, wisdom: 14, history: 12, method: 18 },
  // 4 Ch. 3 - a kitchen conversation made almost entirely of place-names
  { book: 4, places: 26, language: 42, wisdom: 12, history: 8, method: 12 },
  // 5 Ch. 4 - the trail of wisdom
  { book: 5, places: 22, language: 16, wisdom: 48, history: 8, method: 6 },
  // 6 Coda - sense of place, dwelling, and what anthropology has missed
  { book: 6, places: 34, language: 6, wisdom: 14, history: 8, method: 38 },
];
