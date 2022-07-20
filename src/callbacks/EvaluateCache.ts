import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostNewRoom } from "../items/samuraiBlade";

export function evaluateCacheInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  SamuraiBladePostNewRoom();
}
