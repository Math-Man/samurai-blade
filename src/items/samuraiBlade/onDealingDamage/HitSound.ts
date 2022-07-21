import { sfxManager } from "isaacscript-common";
import { SoundsCustom } from "../../../enums/SoundsCustom";
import { flog } from "../../../helpers/DebugHelper";

export function playerHitSound(damagedEntity: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): void {
  flog(`Hit Sound: ${SoundsCustom.SB_HIT} ${tostring(damagedEntity)}${tostring(damageAmount)}${tostring(damageFlags)}${tostring(damageSource)}${tostring(damageCountdownFrames)}`, "Hit Sound");

  sfxManager.Play(SoundsCustom.SB_HIT, 1, 1, false, 1.2);
}
