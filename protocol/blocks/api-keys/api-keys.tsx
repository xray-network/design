"use client";

import { useId, useState, type ReactNode } from "react";
import { Copy } from "../../components/copy/copy";
import "../../components/button/button.css";
import "../../components/input/input.css";
import "../../components/tag/tag.css";
import "./api-keys.css";

export type ApiKey = {
  id: string;
  /** What the key is for: the service or the person using it. */
  name: string;
  /** The key with its middle hidden: "key_live_···· 81f2". Never the full key. */
  masked: string;
  /** "Used 2 minutes ago", "Never used", "Revoked on Mar 2". */
  note?: ReactNode;
  revoked?: boolean;
};

export type ApiKeysProps = {
  keys: ApiKey[];
  /** The form is showing. The app opens it from its own "New key" button. */
  creating?: boolean;
  /** Called with the name; the app makes the key and passes its full value as `secret`. */
  onCreate?: (name: string) => void;
  onCancel?: () => void;
  /** A key that was just made, in full. Shown once, to copy, until `onDone`. */
  secret?: string;
  onDone?: () => void;
  /** The app confirms (a Popconfirm) before it revokes. */
  onRevoke?: (id: string) => void;
  "aria-label"?: string;
  className?: string;
};

/** The keys of an account. The app makes, stores and revokes them; this block never keeps a full key. */
export function ApiKeys({ keys, creating, onCreate, onCancel, secret, onDone, onRevoke, className, "aria-label": label = "API keys" }: ApiKeysProps) {
  const [name, setName] = useState("");
  const nameId = useId();
  return (
    <section className={className ? `x-api-keys ${className}` : "x-api-keys"} aria-label={label}>
      {creating && (
        <form className="x-api-keys-new" onSubmit={(event) => { event.preventDefault(); if (name.trim()) { onCreate?.(name.trim()); setName(""); } }}>
          <div className="x-field">
            <label className="x-field-label" htmlFor={nameId}>Name</label>
            <div className="x-input" data-size="sm"><input id={nameId} type="text" placeholder="The service or person using it" autoComplete="off" value={name} onChange={(event) => setName(event.target.value)} /></div>
          </div>
          <button className="x-button" type="submit" data-size="sm" disabled={!name.trim()}>Create key</button>
          <button className="x-button" type="button" data-variant="ghost" data-size="sm" onClick={onCancel}>Cancel</button>
        </form>
      )}
      {secret && (
        <div className="x-api-keys-secret" role="status">
          <div>
            <p className="x-api-keys-secret-title">Copy your new key now</p>
            <p className="x-api-keys-secret-note">This is the only time it is shown in full.</p>
          </div>
          <Copy value={secret} label="key" variant="block" />
          <button className="x-button" type="button" data-variant="ghost" data-size="sm" onClick={onDone}>Done</button>
        </div>
      )}
      <ul className="x-api-keys-list">
        {keys.map((key) => (
          <li key={key.id} className="x-api-keys-key" data-state={key.revoked ? "revoked" : undefined}>
            <span className="x-api-keys-name">{key.name}</span>
            <span className="x-api-keys-meta"><code className="x-api-keys-value">{key.masked}</code>{key.note != null && <span>{key.note}</span>}</span>
            {key.revoked
              ? <span className="x-tag" data-size="sm">Revoked</span>
              : <span className="x-tag" data-size="sm" data-tone="success"><span className="x-status-dot" aria-hidden="true" />Active</span>}
            {!key.revoked && <button className="x-button" type="button" data-variant="ghost" data-size="sm" onClick={() => onRevoke?.(key.id)}>Revoke</button>}
          </li>
        ))}
      </ul>
    </section>
  );
}
