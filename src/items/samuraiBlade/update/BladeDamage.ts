import { EntityType } from "isaac-typescript-definitions";
import { game } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import { DamageFlagsCustom } from "../../../enums/DamageFlagsCustom";
import { getBladeDamage, getBladePhysicalRange } from "../../../helpers/BladeHelpers";
import { getHitTargetsInsideArea, isHitTargetInsideArea } from "../../../helpers/TargetFinding";

export function dealSamuraiBladeDamage(player: EntityPlayer): void {
  const targets = getHitTargetsInsideArea(player, player.Position, player.GetAimDirection(), getBladePhysicalRange(player));
  let targetsCount = 1;
  for (const target of targets) {
    if (target.IsVulnerableEnemy() || target.Type === EntityType.FIREPLACE || target.Type === EntityType.BOMB) {
      doEntityDamage(player, target, targetsCount);
      pushEntityAway(player, target);
      targetsCount++;
    }
  }
  doTileDamage(player);
}

export function doEntityDamage(player: EntityPlayer, entity: Entity, index: int): void {
  entity.TakeDamage(getBladeDamage(player) * Tuneable.DamageModifierForEachEnemyHit ** index, DamageFlagsCustom.SB_BLADE_DAMAGE, EntityRef(player), 0);
}

export function pushEntityAway(player: EntityPlayer, entity: Entity): void {
  const diff = entity.Position.sub(player.Position);
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
