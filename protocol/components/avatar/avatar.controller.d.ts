export type AvatarPalette = "ada" | "btc" | "night" | "xray" | "cool";
export const PALETTES: Record<AvatarPalette, string[]>;
export function avatarShapes(seed: string, palette?: AvatarPalette): { background: string; shapes: { fill: string; x: number; y: number; rotate: number }[] };
export function avatarSvg(seed: string, palette?: AvatarPalette): string;
export function initAvatars(root?: ParentNode): void;
