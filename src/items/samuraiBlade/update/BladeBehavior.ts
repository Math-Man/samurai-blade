import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { game, getPlayers } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { CollectibleTypeCustom } from "../../../enums/CollectibleTypeCustom";
import { playerHasSamuraisBladeItem } from "../../../helpers/Helpers";

export function updateBladeBehavior(): void {
  spawnItemFirstFrame();
  Isaac.DebugString(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`);
  
  const realPlayers = getPlayers();
  for (let i = 0; i < realPlayers.length; i++) {
    const player = realPlayers[i] as EntityPlayer;
    if (playerHasSamuraisBladeItem(player)) {
      updatePlayerBladeBehavior(player);
    }
  }
}

function updatePlayerBladeBehavior(player: EntityPlayer) {
  disableShooting(player);
  const { bladeSprite } = getPlayerStateData(player);

  if (bladeSprite.IsFinished("ChargedSwing")) {
    getPlayerStateData(player).charged = true;
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
