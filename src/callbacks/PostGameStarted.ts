import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostGameStarted } from "../items/SamuraiBlade";

export function postGameStartedInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main() {
  SamuraiBladePostGameStarted();
}
