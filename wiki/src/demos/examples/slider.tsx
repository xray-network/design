import { useState } from "react"
import { Slider } from "@protocol/components/slider/slider"

const SPEEDS = ["Slow", "Standard", "Fast"]

export default function SliderExample() {
  const [share, setShare] = useState(40)
  return (
    <>
      <Slider label="Amount to stake" value={share} onValueChange={setShare} step={5} format={(v) => `${v}%`} marks={["0%", "50%", "100%"]} />
      <Slider label="Network fee" min={0} max={2} defaultValue={1} format={(v) => SPEEDS[v]} marks={SPEEDS} />
      <Slider aria-label="Volume" size="sm" max={10} defaultValue={7} />
      <Slider aria-label="Fee level (unavailable)" defaultValue={30} disabled />
    </>
  )
}
