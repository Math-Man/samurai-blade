import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostRenderPlayer } from "../items/SamuraisBlade";

export function postRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_RENDER, main);
}

function main() {
  SamuraiBladePostRenderPlayer();
}
