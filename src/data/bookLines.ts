/**
 * Print-page ranges per section of Wisdom Sits in Places (University of New
 * Mexico Press, 1996). Citations in the commentary use the print pagination
 * ("WSP p. 54"), verified against the book's own index; the guide reader maps
 * a cited page proportionally into that section.
 */
export const SECTION_PAGES: Record<number, [number, number]> = {
  1: [1, 2], // Preface (printed xiii-xviii; mapped here so the reader can scroll)
  2: [3, 35], // Ch. 1 - Quoting the Ancestors
  3: [36, 70], // Ch. 2 - Stalking with Stories
  4: [71, 104], // Ch. 3 - Speaking with Names
  5: [105, 142], // Ch. 4 - Wisdom Sits in Places
  6: [143, 149], // Coda - sense of place
};

/** Kept for reader-scroll parity: "line counts" are page spans per section. */
export const BOOK_LINES: Record<number, number> = Object.fromEntries(
  Object.entries(SECTION_PAGES).map(([k, [a, b]]) => [Number(k), b - a + 1]),
) as Record<number, number>;

/**
 * Parse a "WSP p. 54" / "WSP pp. 130-140" citation into a section and a
 * relative position. Roman-numeral preface citations return null (nothing to
 * scroll to), which callers already treat as "no jump".
 */
export function parseLbCitation(citation: string): { book: number; line: number } | null {
  const m = citation.match(/pp?\.\s*(\d+)/);
  if (!m) return null;
  const page = Number(m[1]);
  for (const [book, [start, end]] of Object.entries(SECTION_PAGES)) {
    if (page >= start && page <= end) {
      return { book: Number(book), line: page - start + 1 };
    }
  }
  return null;
}
