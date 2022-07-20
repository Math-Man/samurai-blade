import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { game, getPlayers } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import { CollectibleTypeCustom } from "../../../enums/CollectibleTypeCustom";
import { Animations, isFinished, isPlaying, isPlayingOrFinishedChargedIdle, isPlayingOrFinishedSwitchToChargedIdle, isPlayingOrFinishedSwitchToIdle } from "../../../helpers/AnimationHelpers";
import { canPlayerFireBlade, getAndUpdatePlayerBladeFireTime, getChargeTime } from "../../../helpers/BladeHelpers";
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

  if (isFinished(bladeSprite, Animations.CHARGED_SWING)) {
    getPlayerStateData(player).charged = false;
  }

  if (player.IsExtraAnimationFinished() && isPlayerShooting(player) && canPlayerFireBlade(player)) {
    getAndUpdatePlayerBladeFireTime(player);
    let canDealDamage = true;
    let { hitChainProgression } = getPlayerStateData(player);

    if ((hitChainProgression === 1 && (isPlaying(bladeSprite, Animations.IDLE) || isPlayingOrFinishedSwitchToIdle(bladeSprite))) || isFinished(bladeSprite, Animations.THIRD_SWING)) {
      bladeSprite.Play(Animations.FIRST_SWING, true);
      hitChainProgression = 2;
      // fxManager.Play(Sounds.slice);
      game.ShakeScreen(2);
    } else if (isPlaying(bladeSprite, Animations.CHARGED_IDLE) || isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)) {
      bladeSprite.Play(Animations.CHARGED_SWING, true);
      hitChainProgression = 2;
      // fxManager.Play(Sounds.slice);
      game.ShakeScreen(12);
    } else if (hitChainProgression === 2 && (isFinished(bladeSprite, Animations.FIRST_SWING) || isFinished(bladeSprite, Animations.CHARGED_SWING))) {
      bladeSprite.Play(Animations.SECOND_SWING, true);
      hitChainProgression = 3;
      // fxManager.Play(Sounds.slice);
      game.ShakeScreen(3);
    } else if (hitChainProgression === 3 && isFinished(bladeSprite, Animations.SECOND_SWING)) {
      bladeSprite.Play(Animations.THIRD_SWING, true);
      hitChainProgression = 1;
      // fxManager.Play(Sounds.slice);
      game.ShakeScreen(5);
    } else {
      canDealDamage = false;
    }

    if (canDealDamage) {
      const playerAimDir = player.GetAimDirection();
      getPlayerStateData(player).activeAimDirection = Vector(playerAimDir.X, playerAimDir.Y);
      // Do entity damage, push etc etc etc.
    }
    getPlayerStateData(player).hitChainProgression = hitChainProgression;
  } else {
    // Player is idling.
    const { lastFireTime } = getPlayerStateData(player);

    if (lastFireTime >= 0) {
      if (
        game.GetFrameCount() - lastFireTime > Tuneable.TimeToGoIdleFrames &&
        !(
          isPlaying(bladeSprite, Animations.FIRST_SWING) ||
          isPlaying(bladeSprite, Animations.SECOND_SWING) ||
          isPlaying(bladeSprite, Animations.THIRD_SWING) ||
          isPlaying(bladeSprite, Animations.CHARGED_SWING) ||
          isPlaying(bladeSprite, Animations.IDLE) ||
          isPlaying(bladeSprite, Animations.SWITCH_IDLE) ||
          isPlaying(bladeSprite, Animations.CHARGED_IDLE) ||
          isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)
        )
      ) {
        getPlayerStateData(player).hitChainProgression = 1;
        if (!isPlaying(bladeSprite, Animations.SWITCH_IDLE)) {
          bladeSprite.Play(Animations.SWITCH_IDLE, false);
        }

        if (isFinished(bladeSprite, Animations.SWITCH_IDLE)) {
          bladeSprite.Play(Animations.IDLE, true);
        }
      }

      const chargeTime = getChargeTime(player);
      if (
        game.GetFrameCount() - lastFireTime > chargeTime &&
        ((!isPlaying(bladeSprite, Animations.CHARGED_IDLE) && !isPlaying(bladeSprite, Animations.SWITCH_CHARGED_IDLE)) || isFinished(bladeSprite, Animations.SWITCH_CHARGED_IDLE))
      ) {
        getPlayerStateData(player).charged = true;
        if (!isPlayingOrFinishedChargedIdle(bladeSprite)) {
          bladeSprite.Play(Animations.SWITCH_CHARGED_IDLE, false);
          // TODO: Play sound.
        }

        if (isFinished(bladeSprite, Animations.SWITCH_CHARGED_IDLE)) {
          bladeSprite.Play(Animations.CHARGED_IDLE, true);
        }
      }
    }
  }
}

function spawnItemFirstFrame() {
  if (game.GetFrameCount() === 1) {
    Isaac.DebugString(`Spawning item on the floor: ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`);
    Isaac.Spawn(EntityType.PICKUP, PickupVariant.COLLECTIBLE, CollectibleTypeCustom.SB_SAMURAI_BLADE, Vector(320, 300), Vector(0, 0), undefined);
  }
}

function disableShooting(player: EntityPlayer) {
  player.FireDelay = 42069;
  player.UpdateCanShoot();
}
