import { EffectVariant } from "isaac-typescript-definitions";
import { clamp, game } from "isaacscript-common";
import { flog } from "../../../helpers/DebugHelper";

export function spawnGore(damagedEntity: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): void {
  flog(`Spawn particles: ${tostring(damagedEntity)}${tostring(damageAmount)}${tostring(damageFlags)}${tostring(damageSource)}${tostring(damageCountdownFrames)}`, "SpawnParticles");
  game.SpawnParticles(damagedEntity.Position, EffectVariant.IMPACT, 25, 5);
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, clamp(math.floor(3 ** damageAmount), 5, 100), math.floor(2 ** damageAmount));
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_SPLAT, clamp(math.floor(5 ** damageAmount), 5, 15), math.floor(2 ** damageAmount));
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, clamp(math.floor(4 ** damageAmount), 5, 10), math.floor(2 ** damageAmount));
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_DROP, clamp(math.floor(4 ** damageAmount), 5, 10), math.floor(2 ** damageAmount));
}
