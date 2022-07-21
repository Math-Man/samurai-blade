import { CacheFlag } from "isaac-typescript-definitions";
import { sfxManager } from "isaacscript-common";
import { SoundsCustom } from "../../../enums/SoundsCustom";
import { flog } from "../../../helpers/DebugHelper";

export function motivatePlayer(player: EntityPlayer, cacheFlag: CacheFlag): void {
  flog(`Play pickup sound${tostring(player)}${tostring(cacheFlag)}`, "motivatePlayer");
  sfxManager.Play(SoundsCustom.SB_PICKUP_BLADE);
}
