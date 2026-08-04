import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Alignment, GroupKey, Selection } from '../types';
import { SECTION_COUNT } from '../data/bookTitles';

/** Maps fine-grained alignments onto the four coarse checkbox groups. */
export const GROUP_OF_ALIGNMENT: Record<Alignment, GroupKey> = {
  Elder: 'people',
  Learner: 'people',
  Place: 'places',
  Ancestor: 'stories',
  Ethnographer: 'people',
  Scholar: 'theory',
};

export const GROUP_LABELS: Record<GroupKey, string> = {
  people: 'People (Cibecue & Basso)',
  places: 'Named places',
  stories: 'Figures in the stories',
  theory: 'Cited scholars',
};

/** Node colour per alignment — the "Academic Dark Mode" palette. */
export const ALIGNMENT_COLORS: Record<Alignment, string> = {
  Elder: '#ea8a4c', // the teachers, in canyon orange
  Learner: '#fbbf24', // those taught, or shot, in gold
  Place: '#5eead4', // places, in spring teal
  Ancestor: '#a78bfa', // story figures, in violet
  Ethnographer: '#e879f9', // Basso, in fuchsia
  Scholar: '#38bdf8', // the cited theorists, in sky
};

export type PanelTab = 'commentary' | 'text';
export type PlayMode = 'cumulative' | 'single';

/** An entity to spotlight in the network (e.g. from a name in the guide). */
export interface Highlight {
  id: string;
  /** true = pin & fly the camera to the node (click); false = transient hover. */
  focus: boolean;
}

const PLAY_STEP_MS = 2600; // dwell per section during playback

interface FilterState {
  /** Inclusive section range [from, to], 1–8. */
  bookRange: [number, number];
  setBookRange: (r: [number, number]) => void;
  enabledGroups: Record<GroupKey, boolean>;
  toggleGroup: (g: GroupKey) => void;
  selection: Selection | null;
  setSelection: (s: Selection | null) => void;
  /** Sidebar mode: analytical commentary vs. the section guides. */
  panelTab: PanelTab;
  setPanelTab: (t: PanelTab) => void;
  /** Section currently open in the Guide reader. */
  readerBook: number;
  setReaderBook: (b: number) => void;
  /** Book page to approximate-scroll to. */
  readerLine: number | null;
  /** Jump the sidebar to the Guide tab at a section (and optionally a page offset). */
  openText: (book: number, line?: number) => void;
  /** Entity spotlighted in the network from the Guide reader. */
  highlight: Highlight | null;
  setHighlight: (h: Highlight | null) => void;
  // ——— Playback (lives here so it survives view switches) ———
  playing: boolean;
  playBook: number | null;
  playMode: PlayMode;
  setPlayMode: (m: PlayMode) => void;
  playToggle: () => void;
  playReset: () => void;
}

const FilterContext = createContext<FilterState | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [bookRange, setBookRange] = useState<[number, number]>([1, SECTION_COUNT]);
  const [enabledGroups, setEnabledGroups] = useState<Record<GroupKey, boolean>>({
    people: true,
    places: true,
    stories: true,
    // The scholars start hidden: with all twenty of them on, Basso's citation
    // spokes swamp the Apache world the book is actually about.
    theory: false,
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const [panelTab, setPanelTab] = useState<PanelTab>('commentary');
  const [readerBook, setReaderBook] = useState(1);
  const [readerLine, setReaderLine] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const [playing, setPlaying] = useState(false);
  const [playBook, setPlayBook] = useState<number | null>(null);
  const [playMode, setPlayMode] = useState<PlayMode>('cumulative');

  // Advance the playhead while playing (runs here so playback continues
  // even when the user switches between views).
  useEffect(() => {
    if (!playing || playBook === null) return;
    if (playBook >= SECTION_COUNT) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setPlayBook((b) => (b ?? 1) + 1), PLAY_STEP_MS);
    return () => clearTimeout(t);
  }, [playing, playBook]);

  // Apply the playhead to the global section window (all views follow).
  useEffect(() => {
    if (playBook === null) return;
    setBookRange(playMode === 'cumulative' ? [1, playBook] : [playBook, playBook]);
  }, [playBook, playMode]);

  const value = useMemo<FilterState>(
    () => ({
      bookRange,
      setBookRange,
      enabledGroups,
      toggleGroup: (g) => setEnabledGroups((prev) => ({ ...prev, [g]: !prev[g] })),
      selection,
      // Selecting something surfaces the Commentary tab so the notes are visible.
      setSelection: (s) => {
        setSelection(s);
        if (s) setPanelTab('commentary');
      },
      panelTab,
      setPanelTab,
      readerBook,
      setReaderBook: (b) => {
        setReaderBook(b);
        setReaderLine(null); // manual navigation clears the page target
      },
      readerLine,
      openText: (book, line) => {
        setReaderBook(Math.max(1, Math.min(SECTION_COUNT, book)));
        setReaderLine(line ?? null);
        setPanelTab('text');
      },
      highlight,
      setHighlight,
      playing,
      playBook,
      playMode,
      setPlayMode,
      playToggle: () => {
        if (playing) {
          setPlaying(false);
        } else {
          if (playBook === null || playBook >= SECTION_COUNT) setPlayBook(1);
          setPlaying(true);
        }
      },
      playReset: () => {
        setPlaying(false);
        setPlayBook(null);
        setBookRange([1, SECTION_COUNT]);
      },
    }),
    [bookRange, enabledGroups, selection, panelTab, readerBook, readerLine, highlight, playing, playBook, playMode],
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters(): FilterState {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}
