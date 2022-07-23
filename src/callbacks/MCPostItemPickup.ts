import { ModCallbackCustom, ModUpgraded, PickingUpItem } from "isaacscript-common";
import { SamuraiBladePostGameStarted } from "../items/SamuraisBlade";

export function postGameStartedInit(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, main);
}

function main(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  SamuraiBladePostGameStarted();
}
