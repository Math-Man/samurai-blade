import { CacheFlag } from "isaac-typescript-definitions";
import { flushAllStateData } from "../data/StateData";
import { flog } from "../helpers/DebugHelper";
import { motivatePlayer } from "./samuraiBlade/onCache/Motivate";
import { spawnGore } from "./samuraiBlade/onDealingDamage/SpawnGore";
import { printDebugText } from "./samuraiBlade/rendering/DebugText";
import { renderBlades } from "./samuraiBlade/rendering/RenderBlade";
import { updateBladeBehavior } from "./samuraiBlade/update/BladeBehavior";

export function SamuraiBladePostUpdate(): void {
  updateBladeBehavior();
}

export function SamuraiBladePostRender(): void {
  printDebugText();
  renderBlades();
}

export function SamuraiBladePostRenderPlayer(): void {}

export function SamuraiBladePostRenderPickup(): void {}

export function SamuraiBladePostNewRoom(): void {}

export function SamuraiBladePostGameStarted(): void {
  flushAllStateData();
  flog("Resetting all states", "SamuraisBlade");
}

export function SamuraiBladeEntityDamage(tookDamage: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): boolean {
  spawnGore(tookDamage, damageAmount);
  return true;
}

export function SamuraiBladeEvalCache(player: EntityPlayer, cacheFlag: CacheFlag): void {
  motivatePlayer();
}
