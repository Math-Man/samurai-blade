import { EntityType } from "isaac-typescript-definitions";
import { game } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import { DamageFlagsCustom } from "../../../enums/DamageFlagsCustom";
import { getBladeDamage, getBladePhysicalRange } from "../../../helpers/BladeHelpers";
import { getHitTargetsInsideArea, isHitTargetInsideArea } from "../../../helpers/TargetFinding";
import { countOccurrencesOfState, getDamageState, registerDamageState } from "../onDealingDamage/RegisterDamageState";

export function dealSamuraiBladeDamage(player: EntityPlayer, doDamage: boolean): void {
  const targets = getHitTargetsInsideArea(player, player.Position, player.GetAimDirection(), getBladePhysicalRange(player));
  for (const target of targets) {
    if (target.IsVulnerableEnemy() || target.Type === EntityType.FIREPLACE || target.Type === EntityType.BOMB) {
      if (doDamage) {
        const previousHitCountToSameEntity = countOccurrencesOfState(player, target);
        if (getDamageState(player, target) && countOccurrencesOfState(player, target) <= Tuneable.maxNumberOfHitsInOneSwingToSameEntity) {
          doEntityDamage(player, target, previousHitCountToSameEntity);
        }
        // Pushing shouldn't care about the damage state. It looks really awkward to have one enemy
        // getting pushed and others not.
        pushEntityAway(player, target);
      }
      registerDamageState(player, target);
    }
  }
  doTileDamage(player);
}

export function doEntityDamage(player: EntityPlayer, entity: Entity, index: number): void {
  entity.TakeDamage(getBladeDamage(player) * Tuneable.DamageModifierForHittingSameEnemy ** index, DamageFlagsCustom.SB_BLADE_DAMAGE, EntityRef(player), 0);
}

export function pushEntityAway(player: EntityPlayer, entity: Entity): void {
  const diff = entity.Position.sub(player.Position).Normalized();
  if (getPlayerStateData(player).charged) {
    diff.Resize(2);
  }
  entity.Velocity = entity.Velocity.add(diff.Resized(Tuneable.PushMultiplier));
}

export function doTileDamage(player: EntityPlayer): void {
  const room = game.GetRoom();
  for (let i = 1; i < room.GetGridSize(); i++) {
    const gridEntity = room.GetGridEntity(i);
    if (
      gridEntity !== undefined &&
      player.Position.Distance(gridEntity.Position) < getBladePhysicalRange(player) &&
      isHitTargetInsideArea(player, player.Position, getPlayerStateData(player).activeAimDirection, gridEntity.Position)
    ) {
      let gridDamage = 1;
      if (getPlayerStateData(player).charged) {
        gridDamage = 5;
      }
      room.DamageGrid(gridEntity.GetGridIndex(), gridDamage);
    }
  }
}
