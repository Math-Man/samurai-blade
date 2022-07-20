import { EffectVariant } from "isaac-typescript-definitions";
import { clamp, game } from "isaacscript-common";

export function spawnGore(damagedEntity: Entity, damageAmount: number): void {
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, clamp(math.floor(3 ** damageAmount), 5, damagedEntity.MaxHitPoints / 10), math.floor(2 ** damageAmount));
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_SPLAT, clamp(math.floor(5 ** damageAmount), 5, damagedEntity.MaxHitPoints / 10), math.floor(2 ** damageAmount));
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, clamp(math.floor(4 ** damageAmount), 5, damagedEntity.MaxHitPoints / 10), math.floor(1.1 ** damageAmount));
  game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_DROP, clamp(math.floor(4 ** damageAmount), 5, damagedEntity.MaxHitPoints / 10), math.floor(1.1 ** damageAmount));
}
