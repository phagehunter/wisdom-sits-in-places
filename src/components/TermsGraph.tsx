import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceX, forceY } from 'd3';
import { DOMAIN_COLORS, DOMAIN_LABELS, TERMS, TERM_BY_ID, TERM_LINKS } from '../data/terms';
import { useFilters } from '../context/FilterContext';
import { useElementSize } from '../hooks/useElementSize';
import type { Term, TermDomain } from '../data/terms';

interface TermNode {
  id: string;
  term: Term;
  degree: number;
  x?: number;
  y?: number;
}

interface TermEdge {
  source: string | TermNode;
  target: string | TermNode;
  relation: string;
  note?: string;
}

/**
 * Key-term network: the book's vocabulary as a concept map. Unlike the
 * character network this view is static — the terms span the whole book —
 * so the section slider and group toggles do not filter it.
 */
export default function TermsGraph() {
  const { setSelection, selection } = useFilters();
  const { ref, width, height } = useElementSize<HTMLDivElement>();
  const [hoverNode, setHoverNode] = useState<TermNode | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const fgRef = useRef<any>(null);
  const nodeCache = useRef<Map<string, TermNode>>(new Map());
  const [phone, setPhone] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setPhone(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const graphData = useMemo(() => {
    const degree = new Map<string, number>();
    for (const l of TERM_LINKS) {
      degree.set(l.source, (degree.get(l.source) ?? 0) + 1);
      degree.set(l.target, (degree.get(l.target) ?? 0) + 1);
    }
    const nodes: TermNode[] = TERMS.map((t) => {
      let node = nodeCache.current.get(t.id);
      if (!node) {
        node = { id: t.id, term: t, degree: 0 };
        nodeCache.current.set(t.id, node);
      }
      node.degree = degree.get(t.id) ?? 0;
      return node;
    });
    const links: TermEdge[] = TERM_LINKS.map((l) => ({ ...l }));
    return { nodes, links };
  }, []);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.d3Force('charge')?.strength(-330);
    fg.d3Force('link')?.distance(62);
    fg.d3Force('x', forceX(0).strength(0.07));
    fg.d3Force('y', forceY(0).strength(0.07));
    const pad = width < 768 ? 24 : 70;
    const t1 = setTimeout(() => fgRef.current?.zoomToFit(400, pad), 350);
    const t2 = setTimeout(() => fgRef.current?.zoomToFit(400, pad), 1400);
    const t3 = setTimeout(() => fgRef.current?.zoomToFit(400, pad), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [graphData]);

  useEffect(() => {
    if (!width || !height) return;
    const t = setTimeout(() => fgRef.current?.zoomToFit(300, width < 768 ? 24 : 70), 250);
    return () => clearTimeout(t);
  }, [width, height]);

  // Selecting a related term from the Commentary panel flies the camera to it.
  const selectedId = selection?.kind === 'term' ? selection.id : null;
  useEffect(() => {
    if (!selectedId) return;
    const node = nodeCache.current.get(selectedId);
    if (node && node.x !== undefined) fgRef.current?.centerAt(node.x, node.y, 600);
  }, [selectedId]);

  const nodeRadius = (n: TermNode) => 4 + Math.sqrt(n.degree + 1) * 2.2;

  const drawNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, scale: number) => {
      const n = node as TermNode;
      const r = nodeRadius(n);
      const color = DOMAIN_COLORS[n.term.domain];
      const dimmed = selectedId !== null && n.id !== selectedId;

      ctx.globalAlpha = dimmed ? 0.35 : 0.92;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Exam-flagged terms wear a gold ring so the KEY vocabulary stands out.
      if (n.term.exam) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 2.2, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e0c088';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      if (n.id === selectedId) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 3.5, 0, 2 * Math.PI);
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      if (scale > 0.7) {
        const fontSize = Math.max(3.5, 12 / scale);
        ctx.font = `italic 600 ${fontSize}px 'Source Serif 4', Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.strokeStyle = 'rgba(2, 6, 23, 0.85)';
        ctx.lineWidth = Math.max(0.8, 3 / scale);
        ctx.lineJoin = 'round';
        ctx.strokeText(n.term.term, node.x, node.y + r + 2);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(n.term.term, node.x, node.y + r + 2);
      }
      ctx.globalAlpha = 1;
    },
    [selectedId],
  );

  const hoverLinks = useMemo(() => {
    if (!hoverNode) return [];
    return TERM_LINKS.filter((l) => l.source === hoverNode.id || l.target === hoverNode.id).map(
      (l) => ({
        other: TERM_BY_ID[l.source === hoverNode.id ? (l.target as string) : (l.source as string)],
        relation: l.relation,
      }),
    );
  }, [hoverNode]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
    >
      {width > 0 && height > 0 && (
        <ForceGraph2D
          ref={fgRef}
          width={width}
          height={height}
          graphData={graphData}
          backgroundColor="#020617"
          nodeVal={(n: any) => nodeRadius(n as TermNode) ** 2 / 4}
          nodeLabel={() => ''}
          nodeCanvasObject={drawNode}
          nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius(node as TermNode) + (phone ? 11 : 4), 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
          }}
          linkWidth={1.1}
          linkColor={(l: any) => {
            const link = l as TermEdge;
            if (selectedId) {
              const s = typeof link.source === 'object' ? link.source.id : link.source;
              const t = typeof link.target === 'object' ? link.target.id : link.target;
              return s === selectedId || t === selectedId ? '#e2e8f0' : 'rgba(51, 65, 85, 0.25)';
            }
            return '#475569';
          }}
          onNodeHover={(node: any) => setHoverNode((node as TermNode) ?? null)}
          onNodeClick={(node: any) => setSelection({ kind: 'term', id: (node as TermNode).id })}
          cooldownTicks={120}
          d3AlphaDecay={0.035}
          d3VelocityDecay={0.35}
        />
      )}

      {/* Domain legend */}
      <div
        className="absolute bottom-3 left-3 bg-slate-900/85 border border-slate-700 rounded-lg px-3 py-2 text-[11px] space-y-1 pointer-events-none max-w-[230px]"
        style={{ display: width < 640 ? 'none' : undefined }}
      >
        <div className="text-slate-400 uppercase tracking-widest text-[9px] mb-1">Domains</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {(Object.keys(DOMAIN_LABELS) as TermDomain[]).map((d) => (
            <span key={d} className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: DOMAIN_COLORS[d] }} />
              {DOMAIN_LABELS[d]}
            </span>
          ))}
        </div>
        <div className="pt-1 border-t border-slate-700/60 text-slate-400 space-y-0.5">
          <div><span className="text-sepia-300">◯ gold ring</span> = flagged KEY / on the exam</div>
          <div>size ∝ connections · click a term for its full entry</div>
        </div>
      </div>

      {/* Hover lookup card — desktop only */}
      {hoverNode && !phone && (
        <div
          className="absolute z-40 w-72 bg-slate-900/95 border border-slate-600 rounded-lg shadow-2xl p-3 pointer-events-none"
          style={{
            left: Math.min(mousePos.current.x + 14, Math.max(width - 300, 0)),
            top: Math.min(mousePos.current.y + 14, Math.max(height - 240, 0)),
          }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-base italic text-sepia-200">
              {hoverNode.term.exam && <span className="text-orange-300 not-italic mr-1">★</span>}
              {hoverNode.term.term}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full border whitespace-nowrap"
              style={{ color: DOMAIN_COLORS[hoverNode.term.domain], borderColor: DOMAIN_COLORS[hoverNode.term.domain] }}
            >
              {hoverNode.term.lang} · {DOMAIN_LABELS[hoverNode.term.domain]}
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-1 leading-relaxed">{hoverNode.term.gloss}</p>
          {hoverLinks.length > 0 && (
            <div className="mt-2 pt-1.5 border-t border-slate-700">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Related</div>
              <ul className="text-xs space-y-0.5">
                {hoverLinks.slice(0, 5).map(({ other, relation }, i) => (
                  <li key={i} className="flex justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-slate-300 italic">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: DOMAIN_COLORS[other.domain] }} />
                      {other.term}
                    </span>
                    <span className="text-slate-500 whitespace-nowrap">{relation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-1.5 text-[10px] text-slate-500">Click for the full entry</div>
        </div>
      )}
    </div>
  );
}
