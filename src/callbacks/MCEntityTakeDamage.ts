import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladeEntityDamage } from "../items/SamuraisBlade";

export function entityTakeDamageInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  SamuraiBladeEntityDamage();
}
