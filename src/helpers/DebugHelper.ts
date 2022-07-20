import { game } from "isaacscript-common";

export function flog(text: string, source?: string): void {
  if (isDebugMode()) {
    Isaac.DebugString(`[Frame:[${game.GetFrameCount()}] [${source !== undefined ? source : ""}]] ${text}`);
  }
}

export function isDebugMode(): boolean {
  return true;
}
