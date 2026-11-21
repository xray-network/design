"use client";

import { useId, type ReactNode } from "react";
import { Skeleton } from "../../components/skeleton/skeleton";
import "./profile.css";

export type ProfileProps = {
  name: ReactNode;
  /** "@jane.cooper", an address, an id. */
  handle?: ReactNode;
  bio?: ReactNode;
  /** The Avatar (size "lg"), or the app's own picture. */
  avatar: ReactNode;
  /** Two to four counts, each a value with its label. */
  stats?: { label: string; value: ReactNode }[];
  /** Buttons: one primary at most, first. */
  actions?: ReactNode;
  loading?: boolean;
  className?: string;
};

/** The top of a person's or an organization's page. The app supplies the identity, the counts and the actions. */
export function Profile({ name, handle, bio, avatar, stats = [], actions, loading, className }: ProfileProps) {
  const nameId = useId();
  return (
    <section className={className ? `x-profile ${className}` : "x-profile"} aria-labelledby={nameId} aria-busy={loading || undefined}>
      <div className="x-profile-top">
        <span className="x-profile-lead">{loading ? <Skeleton shape="circle" width={72} /> : avatar}</span>
        {stats.length > 0 && (
          <dl className="x-profile-stats">
            {stats.map((stat) => (
              <div key={stat.label}><dd>{loading ? <Skeleton shape="text" width="2.5em" /> : stat.value}</dd><dt>{stat.label}</dt></div>
            ))}
          </dl>
        )}
      </div>
      <div className="x-profile-id">
        <h2 className="x-profile-name" id={nameId}>{loading ? <Skeleton shape="text" width="9em" /> : name}</h2>
        {handle != null && <span className="x-profile-handle">{loading ? <Skeleton shape="text" width="7em" /> : handle}</span>}
      </div>
      {bio != null && <p className="x-profile-bio">{loading ? <Skeleton shape="text" width="90%" /> : bio}</p>}
      {actions != null && !loading && <div className="x-profile-actions">{actions}</div>}
    </section>
  );
}
