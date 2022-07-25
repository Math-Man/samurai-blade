import { ModCallbackCustom, ModUpgraded, PickingUpItem } from "isaacscript-common";

export function postItemPickupInit(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, main);
}

function main(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  // TODO:
}
