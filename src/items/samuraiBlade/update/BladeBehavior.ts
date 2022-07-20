import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { game, getPlayers } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { CollectibleTypeCustom } from "../../../enums/CollectibleTypeCustom";
import { canPlayerFireBlade, getAndUpdatePlayerBladeFireTime } from "../../../helpers/BladeHelpers";
import { isPlayerShooting, playerHasSamuraisBladeItem } from "../../../helpers/Helpers";

export function updateBladeBehavior(): void {
  spawnItemFirstFrame();

  const realPlayers = getPlayers();
  for (const player of realPlayers) {
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

  if (player.IsExtraAnimationFinished() && isPlayerShooting(player) && canPlayerFireBlade(player)) {
    getAndUpdatePlayerBladeFireTime(player);
    const canDealDamage = false;
    const { hitChainProgression } = getPlayerStateData(player);
  } else {
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
