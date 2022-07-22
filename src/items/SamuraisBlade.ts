import { CacheFlag } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";
import { flushAllStateData, getPlayerStateData } from "../data/StateData";
import { flog } from "../helpers/DebugHelper";
import { playerHasSamuraisBladeItem } from "../helpers/Helpers";
import { motivatePlayer } from "./samuraiBlade/onCache/Motivate";
import { playerHitSound } from "./samuraiBlade/onDealingDamage/HitSound";
import { spawnGore } from "./samuraiBlade/onDealingDamage/SpawnGore";
import { renderBlades } from "./samuraiBlade/rendering/RenderBlade";
import { updateBladeBehavior } from "./samuraiBlade/update/BladeBehavior";

export function SamuraiBladePostUpdate(): void {
  updateBladeBehavior();
}

export function SamuraiBladePostRender(): void {
  // printDebugText();
  renderBlades();
}

export function SamuraiBladePostRenderPlayer(): void {}

export function SamuraiBladePostRenderPickup(): void {}

export function SamuraiBladePostNewRoom(): void {
  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    if (playerHasSamuraisBladeItem(player)) {
      // getPlayerStateData(player).charged = true;
      getPlayerStateData(player).lastFireTime = 0;
      // sfxManager.Play(SoundsCustom.SB_CHARGED_UP, 0.5, 0);
    }
  }
}

export function SamuraiBladePostGameStarted(): void {
  flushAllStateData();
  flog("Resetting all states", "SamuraisBlade");
}

export function SamuraiBladeEntityDamage(tookDamage: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): boolean {
  spawnGore(tookDamage, damageAmount, damageFlags, damageSource, damageCountdownFrames);
  playerHitSound(tookDamage, damageAmount, damageFlags, damageSource, damageCountdownFrames);
  return true;
}

export function SamuraiBladeEvalCache(player: EntityPlayer, cacheFlag: CacheFlag): void {
  motivatePlayer(player, cacheFlag);
}
