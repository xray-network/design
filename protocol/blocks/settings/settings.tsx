"use client";

import { useId, type FormEvent, type ReactNode } from "react";
import "./settings.css";

export type SettingsSection = {
  title: ReactNode;
  /** One line: what these settings change. */
  description?: ReactNode;
  /** The section's controls: fields, switches, radio groups, a button. */
  fields: ReactNode;
  /** "danger": things that cannot be undone. Last. */
  tone?: "danger";
};

export type SettingsProps = {
  sections: SettingsSection[];
  /** Save and Cancel: small buttons, the primary first. Leave out for settings that save as they change. */
  actions?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onReset?: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

/** A settings form. The app supplies the controls and what saving does. */
export function Settings({ sections, actions, onSubmit, onReset, className }: SettingsProps) {
  const id = useId();
  return (
    <form className={className ? `x-settings ${className}` : "x-settings"} onSubmit={(event) => { event.preventDefault(); onSubmit?.(event); }} onReset={onReset}>
      {sections.map((section, i) => (
        <section key={i} className="x-settings-section" data-tone={section.tone} aria-labelledby={`${id}-${i}`}>
          <div className="x-settings-about">
            <h2 className="x-settings-title" id={`${id}-${i}`}>{section.title}</h2>
            {section.description != null && <p className="x-settings-description">{section.description}</p>}
          </div>
          <div className="x-settings-fields">{section.fields}</div>
        </section>
      ))}
      {actions != null && <div className="x-settings-actions">{actions}</div>}
    </form>
  );
}
