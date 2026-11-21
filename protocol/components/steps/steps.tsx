import type { ReactNode } from "react";
import { Spinner } from "../spinner/spinner";
import "./steps.css";

export type StepState = "complete" | "current" | "upcoming" | "loading" | "error";

export type Step = {
  title: ReactNode;
  description?: ReactNode;
  /** Default: complete before `current`, upcoming after it. Set "loading" or "error" on the step in progress. */
  state?: StepState;
};

export type StepsProps = {
  steps: Step[];
  /** Index of the step in progress. Steps before it are complete unless they set their own state. */
  current: number;
  /** Makes completed steps buttons that go back to them. Leave it out when going back is not safe. */
  onStepClick?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  /** Names the list ("Send progress"). */
  "aria-label": string;
  className?: string;
};

const Check = () => <svg viewBox="0 0 24 24" role="img" aria-label="Completed"><path d="m4.5 12.75 6 6 9-13.5" /></svg>;
const Cross = () => <svg viewBox="0 0 24 24" role="img" aria-label="Failed"><path d="M6 18 18 6M6 6l12 12" /></svg>;

/** The stages of a multi-step flow. State comes from `current`, or from a step's own `state` (loading, error). */
export function Steps({ steps, current, onStepClick, orientation = "horizontal", className, "aria-label": label }: StepsProps) {
  return (
    <ol className={className ? `x-steps ${className}` : "x-steps"} data-orientation={orientation === "vertical" ? "vertical" : undefined} aria-label={label}>
      {steps.map((step, i) => {
        const state: StepState = step.state ?? (i < current ? "complete" : i === current ? "current" : "upcoming");
        const content = (
          <>
            <span className="x-steps-marker">
              {state === "complete" ? <Check /> : state === "error" ? <Cross /> : state === "loading" ? <Spinner size="sm" /> : i + 1}
            </span>
            <span className="x-steps-title">{step.title}</span>
            {step.description != null && <span className="x-steps-description">{step.description}</span>}
          </>
        );
        return (
          <li key={i} className="x-steps-item" data-state={state} aria-current={i === current ? "step" : undefined} aria-busy={state === "loading" || undefined}>
            {onStepClick && state === "complete" ? (
              <button className="x-steps-trigger" type="button" onClick={() => onStepClick(i)}>{content}</button>
            ) : (
              <span className="x-steps-trigger">{content}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
