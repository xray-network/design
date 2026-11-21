import type { CSSProperties, ReactNode } from "react";
import { Icon } from "../../components/icon/icon";
import { backward, forward, heart, pause, play } from "../../components/icon/icons.js";
import { Slider } from "../../components/slider/slider";
import "../../components/button/button.css";
import "./player.css";

export type PlayerProps = {
  title: string;
  artist: string;
  /** The artwork: an img or the app's own art. It fills a square. */
  art: ReactNode;
  /** Seconds played, and the length in seconds. */
  position: number;
  duration: number;
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
  onSeek?: (position: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  /** With a handler, a like button sits beside the title. */
  liked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  /** "mini": one row for the foot of a screen. `onOpen` then opens the full player. */
  variant?: "full" | "mini";
  onOpen?: () => void;
  className?: string;
};

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

/** What is playing. The app plays the sound and keeps the position; this block shows it and asks for changes. */
export function Player({ title, artist, art, position, duration, playing, onPlayingChange, onSeek, onPrevious, onNext, liked, onLikedChange, variant = "full", onOpen, className }: PlayerProps) {
  const toggle = <button className="x-icon-button x-player-play" type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => onPlayingChange(!playing)}><Icon icon={playing ? pause : play} /></button>;
  const next = <button className="x-icon-button" type="button" aria-label="Next" onClick={onNext}><Icon icon={forward} /></button>;
  const name = className ? `x-player ${className}` : "x-player";

  if (variant === "mini") {
    return (
      <section className={name} data-variant="mini" aria-label="Now playing">
        <button className="x-player-open" type="button" aria-label={`Open the player: ${title}, ${artist}`} onClick={onOpen}>
          <span className="x-player-art">{art}</span>
          <span className="x-player-text"><span className="x-player-title">{title}</span><span className="x-player-artist">{artist}</span></span>
        </button>
        <div className="x-player-controls">{toggle}{next}</div>
        <span className="x-player-line" style={{ "--x-player-progress": duration > 0 ? Math.min(1, position / duration) : 0 } as CSSProperties} aria-hidden="true" />
      </section>
    );
  }
  return (
    <section className={name} aria-label="Now playing">
      <div className="x-player-art">{art}</div>
      <div className="x-player-meta">
        <div className="x-player-text">
          <h2 className="x-player-title">{title}</h2>
          <p className="x-player-artist">{artist}</p>
        </div>
        {onLikedChange && <button className="x-icon-button" type="button" aria-label="Like" aria-pressed={!!liked} onClick={() => onLikedChange(!liked)}><Icon icon={heart} /></button>}
      </div>
      <div className="x-player-progress">
        <Slider size="sm" aria-label="Position" min={0} max={Math.max(1, Math.round(duration))} value={Math.round(position)} onValueChange={onSeek} format={(value) => `${clock(value)} of ${clock(duration)}`} />
        <div className="x-player-times" aria-hidden="true"><span>{clock(position)}</span><span>{clock(duration)}</span></div>
      </div>
      <div className="x-player-controls">
        <button className="x-icon-button" type="button" aria-label="Previous" onClick={onPrevious}><Icon icon={backward} /></button>
        {toggle}
        {next}
      </div>
    </section>
  );
}
