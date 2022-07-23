import { EffectVariant } from "isaac-typescript-definitions";
import { COLORS, game } from "isaacscript-common";
import { EnemyVisualType } from "../../../enums/EnemyVisualType";
import { flog } from "../../../helpers/DebugHelper";
import { getEnemyVisualType } from "../../../helpers/GetEnemyVisualType";

export function spawnGore(damagedEntity: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): void {
  flog(`Spawn particles: ${tostring(damagedEntity)}${tostring(damageAmount)}${tostring(damageFlags)}${tostring(damageSource)}${tostring(damageCountdownFrames)}`, "SpawnParticles");

  const spawnModifier = math.floor(2 ** damageAmount);

  switch (getEnemyVisualType(damagedEntity.Type, damagedEntity.Variant)) {
    case EnemyVisualType.DEFAULT_BLOOD:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier);
      break;
    case EnemyVisualType.DEFAULT_BLOOD_BLACK:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier, COLORS.Black);
      break;
    case EnemyVisualType.DEFAULT_BLOOD_GREEN:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier, COLORS.Green);
      break;
    case EnemyVisualType.DEFAULT_BLOOD_WHITE:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier, COLORS.White);
      break;
    case EnemyVisualType.BONE:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.NAIL_PARTICLE, spawnModifier, spawnModifier, COLORS.White);
      break;
    case EnemyVisualType.BONE_AND_BLOOD:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.NAIL_PARTICLE, spawnModifier, spawnModifier, COLORS.White);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier);
      break;
    case EnemyVisualType.GHOST:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.CREEP_WHITE, spawnModifier, spawnModifier);
      break;
    case EnemyVisualType.POOP:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.POOP_PARTICLE, spawnModifier, spawnModifier);
      break;
    case EnemyVisualType.STONE:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.ROCK_PARTICLE, spawnModifier, spawnModifier);
      break;
  }

  game.SpawnParticles(damagedEntity.Position, EffectVariant.IMPACT, 10, 10);
  // game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, clamp(math.floor(2 **
  // damageAmount), 5, 50), math.floor(2 ** damageAmount));
  // game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_SPLAT, clamp(math.floor(1.4 **
  // damageAmount), 1, 15), math.floor(2 ** damageAmount));
  // game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, clamp(math.floor(1.2
  // ** damageAmount), 1, 10), math.floor(2 ** damageAmount));
  // game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_DROP, clamp(math.floor(1.2 **
  // damageAmount), 1, 10), math.floor(2 ** damageAmount));
}
