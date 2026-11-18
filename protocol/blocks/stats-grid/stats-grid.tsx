import type { CSSProperties, ReactNode } from "react";
import { Skeleton, skeletonWidth } from "../../components/skeleton/skeleton";
import "./stats-grid.css";

export type StatsGridTone = "success" | "accent" | "warning" | "danger" | "neutral";

export type StatsGridPart = {
  label: string;
  /** The part's value as shown ("4,010,362", "12.73 GiB"). */
  value: ReactNode;
  /** Share of the total, 0 to 100. Sets the segment width and the written share. */
  share: number;
  /** Defaults: success for the first part, accent for the second, then warning, danger. */
  tone?: StatsGridTone;
};

export type StatsGridItem = {
  label: ReactNode;
  value: ReactNode;
  /** Period and detail: "Last 30 days · Total". */
  sub?: ReactNode;
  /** How the total splits: a bar and a legend. */
  split?: StatsGridPart[];
};

export type StatsGridProps = {
  items: StatsGridItem[];
  /** Columns on wide containers (one column under 560px). Default 3. */
  columns?: number;
  /** While the figures load: bars of varied widths in place of values, notes and legend values; split bars show their empty track. */
  loading?: boolean;
  className?: string;
};

const TONES: StatsGridTone[] = ["success", "accent", "warning", "danger"];
const pct = (n: number) => `${Math.round(n * 10) / 10}%`;

/** Headline figures in one framed grid; a cell can split its total in a bar with a legend. */
export function StatsGrid({ items, columns, loading, className }: StatsGridProps) {
  const bar = (seed: number, min: number, max: number) => <Skeleton shape="text" width={skeletonWidth(seed, min, max)} />;
  return (
    <div className={className ? `x-stats-grid ${className}` : "x-stats-grid"} aria-busy={loading || undefined}>
      <dl className="x-stats-grid-list" style={columns ? ({ "--x-stats-grid-columns": columns } as CSSProperties) : undefined}>
        {items.map((item, i) => (
          <div key={i} className="x-stats-grid-cell">
            <dt className="x-stats-grid-label">{item.label}</dt>
            <dd className="x-stats-grid-value">{loading ? bar(i * 5, 35, 60) : item.value}</dd>
            {item.sub != null && <dd className="x-stats-grid-sub">{loading ? bar(i * 5 + 1, 50, 85) : item.sub}</dd>}
            {item.split?.length ? (
              <dd className="x-stats-grid-split">
                <div className="x-stats-grid-bar" role="img" aria-label={item.split.map((p) => `${p.label} ${pct(p.share)}`).join(", ")}>
                  {!loading && item.split.filter((p) => p.share > 0).map((p, j) => (
                    <span key={p.label} className="x-stats-grid-segment" data-tone={p.tone ?? TONES[item.split!.indexOf(p) % TONES.length] ?? TONES[j]} style={{ width: `${Math.min(100, p.share)}%` }} />
                  ))}
                </div>
                <dl className="x-stats-grid-legend">
                  {item.split.map((p, j) => (
                    <div key={p.label} className="x-stats-grid-row">
                      <dt><span className="x-stats-grid-dot" data-tone={p.tone ?? TONES[j % TONES.length]} />{p.label}</dt>
                      <dd>{loading ? <Skeleton shape="text" width={skeletonWidth(i * 5 + j + 2, 40, 70)} /> : <>{p.value} <span className="x-stats-grid-share">({pct(p.share)})</span></>}</dd>
                    </div>
                  ))}
                </dl>
              </dd>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}
