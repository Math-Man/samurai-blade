import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostUpdate } from "../items/SamuraiBlade";

export function postUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, main);
}

function main() {
  SamuraiBladePostUpdate();
}
