import { getPlayerStateData } from "../../../data/StateData";
import { flog } from "../../../helpers/DebugHelper";
import { playerHasSamuraisBladeItem } from "../../../helpers/Helpers";

export function registerDamageState(player: EntityPlayer, damagedEntity: Entity): void {
  if (playerHasSamuraisBladeItem(player)) {
    const containsEntity = getDamageState(player, damagedEntity);
    const entityHitCount = countOccurrencesOfState(player, damagedEntity);
    flog(`Contains entity: ${containsEntity} + ${damagedEntity.Index}, hit counts: ${entityHitCount}`, "registerDamageState");

    getPlayerStateData(player).hitStateEntities.push(damagedEntity.Index);
    flog(`hit count ${entityHitCount}`, "HIT COUNTS");
  }
}

export function countOccurrencesOfState(player: EntityPlayer, entity: Entity): number {
  const arr = getPlayerStateData(player).hitStateEntities;
  // eslint-disable-next-line isaacscript/no-object-any, @typescript-eslint/restrict-plus-operands, @typescript-eslint/strict-boolean-expressions
  const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return map.get(entity.Index);
}

export function getDamageState(player: EntityPlayer, damagedEntity: Entity): boolean {
  return getPlayerStateData(player).hitStateEntities.includes(damagedEntity.Index);
}

export function clearDamageState(player: EntityPlayer): void {
  getPlayerStateData(player).hitStateEntities.splice(0);
}

export function hasDamageState(player: EntityPlayer): boolean {
  return getPlayerStateData(player).hitStateEntities.length > 0;
}
