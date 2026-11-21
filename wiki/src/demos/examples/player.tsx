import { useEffect, useState } from "react"
import { Player } from "@protocol/blocks/player/player"
import { Art } from "../Art"

const TRACKS = [
  { title: "Night Drive", artist: "Lena Fischer", duration: 228, seed: "night-drive", palette: "blue" },
  { title: "Paper Boats", artist: "Mira Lindqvist", duration: 194, seed: "paper-boats", palette: "cool" },
  { title: "Low Sun", artist: "Kai Nakamura", duration: 251, seed: "low-sun", palette: "ember" },
] as const

export default function PlayerExample() {
  const [index, setIndex] = useState(0)
  const [position, setPosition] = useState(72)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(true)
  const track = TRACKS[index]
  const go = (step: number) => { setIndex((i) => (i + step + TRACKS.length) % TRACKS.length); setPosition(0) }

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setPosition((p) => (p + 1 >= track.duration ? 0 : p + 1)), 1000)
    return () => clearInterval(timer)
  }, [playing, track.duration])

  const shared = { title: track.title, artist: track.artist, art: <Art seed={track.seed} palette={track.palette} />, position, duration: track.duration, playing, onPlayingChange: setPlaying, onNext: () => go(1) }
  return (
    <div style={{ display: "grid", gap: "var(--x-space-6)", width: 320, maxWidth: "100%" }}>
      <Player {...shared} onSeek={setPosition} onPrevious={() => go(-1)} liked={liked} onLikedChange={setLiked} />
      <Player {...shared} variant="mini" />
    </div>
  )
}
