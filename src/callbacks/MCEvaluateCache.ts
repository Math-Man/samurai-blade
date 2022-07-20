import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { getPlayerStateDataNoCreate } from "../data/StateData";
import { flog } from "../helpers/DebugHelper";
import { playerHasSamuraisBladeItem } from "../helpers/Helpers";
import { SamuraiBladeEvalCache } from "../items/SamuraisBlade";

export function evaluateCacheInit(mod: Mod): void {
  mod.AddCallback(ModCallback.EVALUATE_CACHE, main);
}

function main(player: EntityPlayer, cacheFlag: CacheFlag) {
  if (cacheFlag === CacheFlag.LUCK && getPlayerStateDataNoCreate(player) === undefined && playerHasSamuraisBladeItem(player)) {
    flog("Player is motivated", "Cache Eval");
    SamuraiBladeEvalCache(player, cacheFlag);
  }
}
