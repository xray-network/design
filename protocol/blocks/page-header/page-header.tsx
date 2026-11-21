import type { ReactNode } from "react";
import "../../components/button/button.css";
import "./page-header.css";

export type PageHeaderProps = {
  title: ReactNode;
  /** One line: what this page is, or its state right now. */
  description?: ReactNode;
  /** A page below another: where the arrow before the title goes, and what it is called ("Back to payments"). */
  back?: { label: string; href?: string; onClick?: () => void };
  /** The page's actions: one primary at most, last. Small buttons. */
  actions?: ReactNode;
  className?: string;
};

const Arrow = () => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>;

/** The top of a page. One per page: its title is the page's h1. */
export function PageHeader({ title, description, back, actions, className }: PageHeaderProps) {
  return (
    <header className={className ? `x-page-header ${className}` : "x-page-header"}>
      {back && (back.href
        ? <a className="x-icon-button x-page-header-back" data-size="sm" href={back.href} aria-label={back.label} onClick={back.onClick}><Arrow /></a>
        : <button className="x-icon-button x-page-header-back" type="button" data-size="sm" aria-label={back.label} onClick={back.onClick}><Arrow /></button>)}
      <div className="x-page-header-text">
        <h1 className="x-page-header-title">{title}</h1>
        {description != null && <p className="x-page-header-description">{description}</p>}
      </div>
      {actions != null && <div className="x-page-header-actions">{actions}</div>}
    </header>
  );
}
