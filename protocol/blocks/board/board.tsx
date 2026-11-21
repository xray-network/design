"use client";

import { useId, type ReactNode } from "react";
import "../../components/button/button.css";
import "./board.css";

export type BoardCard = {
  id: string;
  /** The card's short id: "ENG-142". */
  key?: ReactNode;
  title: ReactNode;
  /** Small Tags: its kind, its area. Two at most. */
  tags?: ReactNode;
  /** The Avatar of who has it. */
  assignee?: ReactNode;
  href?: string;
};

export type BoardColumn = {
  id: string;
  title: string;
  cards: BoardCard[];
};

export type BoardProps = {
  columns: BoardColumn[];
  onOpen?: (card: string) => void;
  /** With a handler, each column head gets an add button. */
  onAdd?: (column: string) => void;
  /** Said in a column that has no cards. */
  empty?: ReactNode;
  "aria-label": string;
  className?: string;
};

const Plus = () => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5v15m7.5-7.5h-15" /></svg>;

/** Work in columns by state. The app supplies the cards and moves them between columns. */
export function Board({ columns, onOpen, onAdd, empty = "Nothing here yet", className, "aria-label": label }: BoardProps) {
  const id = useId();
  return (
    <div className={className ? `x-board ${className}` : "x-board"} role="group" aria-label={label}>
      {columns.map((column) => (
        <section key={column.id} className="x-board-column" aria-labelledby={`${id}-${column.id}`}>
          <header className="x-board-head">
            <h3 className="x-board-title" id={`${id}-${column.id}`}>{column.title}</h3>
            <span className="x-board-count">{column.cards.length}</span>
            {onAdd && <button className="x-icon-button" type="button" data-size="sm" aria-label={`Add to ${column.title}`} onClick={() => onAdd(column.id)}><Plus /></button>}
          </header>
          <ol className="x-board-cards">
            {column.cards.map((card) => {
              const content = (
                <>
                  {card.key != null && <span className="x-board-key">{card.key}</span>}
                  <span className="x-board-name">{card.title}</span>
                  {(card.tags != null || card.assignee != null) && <span className="x-board-foot">{card.tags != null && <span className="x-board-tags">{card.tags}</span>}{card.assignee}</span>}
                </>
              );
              return (
                <li key={card.id}>
                  {card.href
                    ? <a className="x-board-card" href={card.href} onClick={() => onOpen?.(card.id)}>{content}</a>
                    : <button className="x-board-card" type="button" onClick={() => onOpen?.(card.id)}>{content}</button>}
                </li>
              );
            })}
          </ol>
          {column.cards.length === 0 && <p className="x-board-empty">{empty}</p>}
        </section>
      ))}
    </div>
  );
}
