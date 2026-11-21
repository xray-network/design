"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { bindCommand } from "./command.controller.js";
import "./command.css";

export type CommandItem = {
  value: string;
  label: string;
  /** The second line: an id, a path, a balance. */
  description?: string;
  /** An icon in the lead tile (an svg.x-icon). */
  icon?: ReactNode;
  /** The app's own mark in place of the icon tile: an Avatar or a Tile. */
  lead?: ReactNode;
  /** The item's own shortcut, one key per entry: ["⌘", "S"]. Shown at rest; the app binds it. */
  shortcut?: string[];
  /** Extra words the filter matches. */
  keywords?: string;
  disabled?: boolean;
};

export type CommandGroup = { label: ReactNode; items: CommandItem[] };

export type CommandProps = {
  groups: CommandGroup[];
  /** Runs the chosen item. The command never runs actions itself. */
  onSelect: (value: string) => void;
  /** Called on Esc. Pass it when the menu sits in something that closes: the "esc" hints then show. */
  onClose?: () => void;
  placeholder?: string;
  /** Names the search field and the list. */
  "aria-label"?: string;
  /** Focus the input when it appears. */
  autoFocus?: boolean;
  /** Hide the row of key hints under the list. */
  hideHints?: boolean;
  className?: string;
};

const Search = () => (
  <svg className="x-command-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21 21-5.2-5.2m0 0A7.5 7.5 0 1 0 5.2 5.2a7.5 7.5 0 0 0 10.6 10.6Z" />
  </svg>
);

/** A command menu: search, grouped actions and key hints in one framed panel. The app decides what holds it. */
export function Command({ groups, onSelect, onClose, placeholder = "Search commands", autoFocus, hideHints, className, "aria-label": label = "Commands" }: CommandProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const select = useRef(onSelect);
  select.current = onSelect;
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => (ref.current ? bindCommand(ref.current, { onSelect: (v) => select.current(v), onClose: () => close.current?.() }) : undefined), []);

  return (
    <div ref={ref} className={className ? `x-command ${className}` : "x-command"}>
      <label className="x-command-search">
        <Search />
        <input
          className="x-command-input"
          type="text"
          role="combobox"
          aria-controls={`${id}-list`}
          aria-expanded="true"
          aria-autocomplete="list"
          aria-label={label}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {onClose && <kbd>esc</kbd>}
      </label>
      <div className="x-command-list" id={`${id}-list`} role="listbox" aria-label={label}>
        {groups.map((group, g) => (
          <div key={g} className="x-command-group" role="group" aria-labelledby={`${id}-g${g}`}>
            <div className="x-command-group-label" id={`${id}-g${g}`}>{group.label}</div>
            {group.items.map((item) => (
              <div
                key={item.value}
                id={`${id}-${item.value}`}
                className="x-command-item"
                role="option"
                aria-selected="false"
                aria-disabled={item.disabled || undefined}
                data-value={item.value}
                data-keywords={item.keywords}
              >
                {(item.lead != null || item.icon != null) && <span className="x-command-lead" aria-hidden="true">{item.lead ?? item.icon}</span>}
                <span className="x-command-text">
                  <span className="x-command-label">{item.label}</span>
                  {item.description != null && <span className="x-command-sub">{item.description}</span>}
                </span>
                {item.shortcut && <span className="x-command-keys">{item.shortcut.map((key) => <kbd key={key}>{key}</kbd>)}</span>}
                <kbd className="x-command-enter" aria-hidden="true">Enter</kbd>
              </div>
            ))}
          </div>
        ))}
        <p className="x-command-empty" hidden>No results for "<span className="x-command-query" />".</p>
      </div>
      {!hideHints && (
        <div className="x-command-foot" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>Enter</kbd> Run</span>
          {onClose && <span><kbd>esc</kbd> Close</span>}
        </div>
      )}
    </div>
  );
}
