export function spring(options?: {
  stiffness?: number;
  dampingRatio?: number;
  mass?: number;
  points?: number;
  precision?: number;
}): { easing: string; duration: number };
export const SPRINGS: Record<"liquid" | "soft", { stiffness: number; dampingRatio: number }>;
