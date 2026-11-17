import type { IconData } from "./icons.js";

export function registerIcons(icons: IconData[] | Record<string, IconData>): void;
export function getIcon(name: string): IconData | undefined;
export function allIcons(): IconData[];
export function iconSvg(icon: string | IconData, options?: { size?: "sm" | "md" | "lg"; label?: string }): string;
export function initIcons(root?: ParentNode): void;
