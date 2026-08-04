/** Shared domain types for the Wisdom Sits in Places study companion. */

/**
 * Fine-grained alignment used for node colouring. Basso's book is built out of
 * four Apache teachers, the places they take him to, the ancestral figures who
 * inhabit the stories told at those places, and the scholars he argues with.
 * The network therefore mixes people, places, and story-characters — which is
 * exactly Basso's point: in Cibecue these are not separate orders of thing.
 * Alignments map onto the four coarse UI filter groups
 * (see GROUP_OF_ALIGNMENT in src/context/FilterContext.tsx).
 */
export type Alignment =
  | 'Elder' // Apache teachers & consultants — the wise ones of Cibecue
  | 'Learner' // those being taught, or "shot" with a story
  | 'Ethnographer' // Basso, and the fieldwork frame
  | 'Place' // named places — full participants in the social world
  | 'Ancestor' // ancestors & figures who act inside the stories
  | 'Scholar'; // the writers and theorists Basso reads alongside Cibecue

export type CharacterType = 'Person' | 'Place' | 'Collective' | 'Figure';

export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  alignment: Alignment;
  /** Short identifying descriptors shown on the character card. */
  epithets: string[];
  /** >1 marks an aggregate/collective node (a clan, a crowd, the ancestors). */
  group_size: number;
  note?: string;
  /** For place nodes: the id in PLACES, so the card can show the full entry. */
  placeId?: string;
}

export type InteractionType =
  | 'naming' // conferring or explaining a place-name
  | 'stalking' // shooting someone with a story (the hunting metaphor)
  | 'speaking' // "speaking with names" — yalti' bee'izhi
  | 'teaching' // instruction, interview, or fieldwork exchange
  | 'travel' // riding or driving to a place together
  | 'story' // narrating a tale set at a place
  | 'dwelling' // using, working, or living at a place
  | 'citing' // Basso reading a scholar against Cibecue
  | 'mapping'; // the Cibecue place-name mapping project itself

export interface Interaction {
  source: string;
  target: string;
  /** Section 1-6 (Preface, Chs. 1-4, Coda). */
  book: number;
  type: InteractionType;
  weight: number;
  /**
   * true = the story was aimed at someone as an arrow, or the exchange is one
   * the exam turns on. Rendered as a red dashed edge.
   */
  arrow: boolean;
  summary: string;
  insight?: string;
  citation?: string;
}

export interface FocalizationRow {
  book: number;
  places: number; // place-names, toponymy, the land itself
  language: number; // speech genres, metaphor, linguistic structure
  wisdom: number; // wisdom, mind, morality
  history: number; // ancestors, the tribal past, place-making as history
  method: number; // ethnography, theory, the discipline
}

/** Coarse UI filter groups (checkbox toggles). */
export type GroupKey = 'people' | 'places' | 'stories' | 'theory';

/** The three kinds of Western Apache place-name, in order of historical layer. */
export type NameKind = 'descriptive' | 'clan' | 'commemorative';

/** Terrain glyph drawn for a place on the schematic landscape. */
export type Feature = 'water' | 'rock' | 'tree' | 'trail' | 'plain';

export interface Place {
  id: string;
  /** Apache toponym as printed in Basso's text (see the orthography note). */
  apache?: string;
  /** Basso's English translation — the form the lectures and exam use. */
  gloss: string;
  kind: NameKind;
  feature: Feature;
  /** Section (1-6) where the place does its main work. */
  book: number;
  pages: string;
  /** Who takes Basso there, or speaks the name. */
  teacher?: string;
  /** How the place got its name (original paraphrase of Basso's account). */
  naming: string;
  /** The story told at the place, in brief. */
  story?: string;
  /** What Cibecue draws from it — the moral or lesson. */
  lesson: string;
  /** true = flagged for the exam in the course notes. */
  exam?: boolean;
  /** Schematic coordinates on the Named Land view (0-1000 x 0-560). */
  x: number;
  y: number;
}

/** What is currently pinned in the Close Reading panel. */
export type Selection =
  | { kind: 'edge'; a: string; b: string; interactions: Interaction[] }
  | { kind: 'character'; id: string }
  | { kind: 'term'; id: string }
  | { kind: 'place'; id: string }
  | { kind: 'condition'; id: string };
