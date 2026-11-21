import { useEffect, useState } from "react"
import { Calendar, type CalendarRange } from "@protocol/components/calendar/calendar"
import { addDays, todayISO } from "@protocol/components/calendar/calendar.controller.js"

const Label = ({ children }: { children: string }) => <span className="wiki-demo-label">{children}</span>
const format = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
const short = (date: string) => format.format(new Date(`${date}T00:00:00Z`))
const nights = (range: CalendarRange) => (range.start && range.end ? Math.round((Date.parse(range.end) - Date.parse(range.start)) / 86_400_000) : 0)

export default function CalendarExample() {
  // The demo starts from today, which only the browser knows: it is drawn once the page is running there.
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => setToday(todayISO()), [])
  const [day, setDay] = useState<string | null>(null)
  const [stay, setStay] = useState<CalendarRange | null>(null)
  if (!today) return null
  const picked = day ?? today
  const range = stay ?? { start: addDays(today, 2), end: addDays(today, 6) }

  return (
    <div className="wiki-demo-calendars">
      <div>
        <Label>One day</Label>
        <Calendar value={picked} onValueChange={setDay} />
        <p>{short(picked)}</p>
      </div>
      <div>
        <Label>A range, from today on</Label>
        <Calendar mode="range" aria-label="Stay" value={range} onValueChange={setStay} min={today} />
        <p>{range.end ? `${short(range.start!)} to ${short(range.end)} · ${nights(range)} ${nights(range) === 1 ? "night" : "nights"}` : `${short(range.start!)} to …`}</p>
      </div>
    </div>
  )
}
