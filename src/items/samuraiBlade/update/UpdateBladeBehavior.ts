import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { game } from "isaacscript-common";
import { getUserStateData } from "../../../data/StateData";
import { CollectibleTypeCustom } from "../../../enums/CollectibleTypeCustom";
import { playerHasSamuraisBladeItem } from "../../../helpers/Helpers";

export function updateBladeBehavior(): void {
  spawnItemFirstFrame();
  Isaac.DebugString(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`);
  for (let i = 0; i < game.GetNumPlayers(); i++) {
    const player = Isaac.GetPlayer(i);
    if (playerHasSamuraisBladeItem(player)) {
      updatePlayerBladeBehavior(player);
    }
  }
}

function updatePlayerBladeBehavior(player: EntityPlayer) {
  disableShooting(player);
  const { bladeSprite } = getUserStateData(player);

  if (bladeSprite.IsFinished("ChargedSwing")) {
    getUserStateData(player).charged = true;
  }
}

function spawnItemFirstFrame() {
  if (game.GetFrameCount() === 1) {
    Isaac.Spawn(EntityType.PICKUP, PickupVariant.COLLECTIBLE, CollectibleTypeCustom.SB_SAMURAI_BLADE, Vector(320, 300), Vector(0, 0), undefined);
  }
}

function disableShooting(player: EntityPlayer) {
  player.FireDelay = 42069;
  player.UpdateCanShoot();
}
