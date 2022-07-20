import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladeEntityTakeDamage } from "../items/samuraiBlade";

export function entityTakeDamageInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  SamuraiBladeEntityTakeDamage();
}
