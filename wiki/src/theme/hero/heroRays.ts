// Rays cutting through the hero's symbol grid, shaped like the logo's ray: narrow at the top, widening to the bottom.
// A ray draws itself from the top edge down (or, launched by a click, out from that point both ways), drifts sideways
// while it holds, then dissolves into random symbols. One at a time, at a random place across the hero. The pointer
// draws a short ray of the same lean, which simply fades when the pointer stops.

/** Run per unit of drop: the ray's lines satisfy x + SLOPE * y = constant (a wide "/" lean). */
export const SLOPE = .8

export type Ray = {
  start: number
  /** x + SLOPE * y along the ray's center line when it starts. */
  front: number
  /** Sideways drift of the center line, in CSS pixels per millisecond. */
  drift: number
  /** Half-width at the bottom edge (horizontal, in CSS pixels); the top is a point. */
  width: number
  /** Where the ray starts drawing from: the top edge, or the point that launched it. */
  originY: number
  height: number
  shoot: number
  hold: number
  dissolve: number
  duration: number
}

export type PreparedRay = Ray & { distances: Float32Array }
export type RayState = { front: number; topY: number; headY: number; envelope: number; dissolving: boolean }

const TOP = -40

/** A ray at a random place, drawn from the top edge; or, given a point, through it and drawn out from it. */
export function createRay(start: number, width: number, height: number, from?: { x: number; y: number }): Ray {
  // A center line that crosses the middle band of the hero, so most of the ray is in view.
  const front = from ? from.x + SLOPE * from.y : width * (.2 + Math.random() * .7) + SLOPE * height * (.3 + Math.random() * .3)
  const shoot = 1000 + Math.random() * 400
  const hold = 1400 + Math.random() * 800
  const dissolve = 900 + Math.random() * 300
  const drift = (Math.random() < .5 ? -1 : 1) * (.03 + Math.random() * .03)
  const originY = from ? from.y : TOP
  return { start, front, drift, width: 120 + Math.random() * 50, originY, height, shoot, hold, dissolve, duration: shoot + hold + dissolve }
}

/** Each point's position across the ray's lines (x + SLOPE * y), so a row's offset is SLOPE * y. */
export function prepareRay(ray: Ray, points: ReadonlyArray<{ x: number; y: number }>): PreparedRay {
  const distances = new Float32Array(points.length)
  for (let i = 0; i < points.length; i++) distances[i] = points[i].x + SLOPE * points[i].y
  return { ...ray, distances }
}

/** Where the ray is now (its center line, the span drawn so far) and how strong; false once it is over. */
export function rayFrame(ray: Ray, now: number, state: RayState) {
  const t = now - ray.start
  if (t <= 0 || t >= ray.duration) return false
  const bottom = ray.height + 40
  const grown = 1 - (1 - Math.min(1, t / ray.shoot)) ** 3
  state.topY = ray.originY + (TOP - ray.originY) * grown
  state.headY = ray.originY + (bottom - ray.originY) * grown
  state.front = ray.front + ray.drift * t
  state.dissolving = t > ray.shoot + ray.hold
  state.envelope = state.dissolving ? 1 - (t - ray.shoot - ray.hold) / ray.dissolve : Math.min(1, t / 160)
  return true
}

/** Half-width of the lit band at height y: zero outside what has been drawn; otherwise the logo ray's taper, a point
    at the top edge widening to the full width at the bottom. */
export function rayHalfWidth(ray: Ray, state: RayState, y: number) {
  if (y > state.headY || y < state.topY) return 0
  const span = ray.height + 40 - TOP
  return 3 + (ray.width - 3) * Math.min(1, Math.max(0, (y - TOP) / span))
}

/** The pointer's ray: through the pointer, REACH above and below it, shaped like the logo's ray (a point at the top,
    widening to POINTER_WIDTH at the bottom). dy is a row's height relative to the pointer. */
export const POINTER_REACH = 140
export const POINTER_WIDTH = 70
export function pointerHalfWidth(dy: number) {
  if (Math.abs(dy) >= POINTER_REACH) return 0
  return 3 + (POINTER_WIDTH - 3) * ((dy + POINTER_REACH) / (2 * POINTER_REACH))
}
