import { CacheFlag } from "isaac-typescript-definitions";
import { flushAllStateData } from "../data/StateData";
import { flog } from "../helpers/DebugHelper";
import { motivatePlayer } from "./samuraiBlade/onCache/Motivate";
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

export function SamuraiBladeEntityDamage(): void {}

export function SamuraiBladeEvalCache(player: EntityPlayer, cacheFlag: CacheFlag): void {
  motivatePlayer();
}
