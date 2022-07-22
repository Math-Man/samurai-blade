import { EffectVariant, EntityType, PickupVariant, SoundEffect } from "isaac-typescript-definitions";
import { game, getPlayers, sfxManager } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import { CollectibleTypeCustom } from "../../../enums/CollectibleTypeCustom";
import { SoundsCustom } from "../../../enums/SoundsCustom";
import { Animations, isFinished, isPlaying, isPlayingOrFinishedIdle, isPlayingOrFinishedSwitchToChargedIdle, isPlayingOrFinishedSwitchToIdle } from "../../../helpers/AnimationHelpers";
import { canPlayerFireBlade, getActualTimeToGoIdle, getAndUpdatePlayerBladeFireTime, getChargeTime } from "../../../helpers/BladeHelpers";
import { flog } from "../../../helpers/DebugHelper";
import { isPlayerShooting, playerHasSamuraisBladeItem } from "../../../helpers/Helpers";
import { clearDamageState, hasDamageState } from "../onDealingDamage/RegisterDamageState";
import { dealSamuraiBladeDamage } from "./BladeDamage";

export function updateBladeBehavior(): void {
  spawnItemFirstFrame();

  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    if (playerHasSamuraisBladeItem(player)) {
      updatePlayerBladeBehavior(player);
    }
  }
}

let behaviorTickCounter = 0;

function updatePlayerBladeBehavior(player: EntityPlayer) {
  disableShooting(player);
  const { bladeSprite } = getPlayerStateData(player);
  let { hitChainProgression } = getPlayerStateData(player);

  if (!(isPlaying(bladeSprite, Animations.CHARGED_IDLE) || isPlayingOrFinishedSwitchToChargedIdle(bladeSprite) || isPlaying(bladeSprite, Animations.CHARGED_SWING))) {
    getPlayerStateData(player).charged = false;
  }

  if (hasDamageState(player)) {
    const hitFrames = Tuneable.hitStateFrameDelays.get(getPlayerStateData(player).hitChainProgression);
    if (hitFrames !== undefined) {
      if (hitFrames.filter((frame: number) => frame === behaviorTickCounter).length > 0) {
        flog(`damage state for: ${behaviorTickCounter}`, "handle damage state calc");
        dealSamuraiBladeDamage(player, true);
      }
    }
    behaviorTickCounter++;
  }

  if (player.IsExtraAnimationFinished() && isPlayerShooting(player) && canPlayerFireBlade(player)) {
    getAndUpdatePlayerBladeFireTime(player);
    let canDealDamage = true;

    if ((hitChainProgression === 1 && (isPlaying(bladeSprite, Animations.IDLE) || isPlayingOrFinishedSwitchToIdle(bladeSprite))) || isFinished(bladeSprite, Animations.THIRD_SWING)) {
      bladeSprite.Play(Animations.FIRST_SWING, true);
      hitChainProgression = 2;
      sfxManager.Play(SoundsCustom.SB_SMALL_SLICE, 1, 1, false);
      game.ShakeScreen(2);
    } else if (isPlaying(bladeSprite, Animations.CHARGED_IDLE) || isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)) {
      bladeSprite.Play(Animations.CHARGED_SWING, true);
      hitChainProgression = 2;
      game.ShakeScreen(12);
      sfxManager.Play(SoundsCustom.SB_CHARGED_SLICE, 2, 0, false);
      sfxManager.Play(SoundEffect.EXPLOSION_WEAK, 0.8, 0, false);
      game.SpawnParticles(player.Position, EffectVariant.IMPACT, 25, 10);
    } else if (
      hitChainProgression === 2 &&
      (isFinished(bladeSprite, Animations.FIRST_SWING) || isFinished(bladeSprite, Animations.CHARGED_SWING) || isPlayingOrFinishedSwitchToIdle(bladeSprite) || isPlayingOrFinishedIdle(bladeSprite))
    ) {
      bladeSprite.Play(Animations.SECOND_SWING, true);
      hitChainProgression = 3;
      sfxManager.Play(SoundsCustom.SB_SMALL_SLICE, 1, 0, false);
      game.ShakeScreen(3);
    } else if (hitChainProgression === 3 && (isFinished(bladeSprite, Animations.SECOND_SWING) || isPlayingOrFinishedSwitchToIdle(bladeSprite) || isPlayingOrFinishedIdle(bladeSprite))) {
      bladeSprite.Play(Animations.THIRD_SWING, true);
      hitChainProgression = 1;
      sfxManager.Play(SoundsCustom.SB_BIG_SLICE, 1.5, 1, false);
      game.ShakeScreen(5);
    } else {
      canDealDamage = false;
    }

    if (canDealDamage) {
      clearDamageState(player);
      behaviorTickCounter = 0;
      const playerAimDir = player.GetAimDirection();
      getPlayerStateData(player).activeAimDirection = Vector(playerAimDir.X, playerAimDir.Y);
      // dealSamuraiBladeDamage(player);

      const hitFrames = Tuneable.hitStateFrameDelays.get(hitChainProgression);
      const hasHitOnZero = hitFrames !== undefined && hitFrames.filter((frame: number) => frame === 0).length > 0;
      dealSamuraiBladeDamage(player, hasHitOnZero);

      flog(`I can attack: ${getPlayerStateData(player).lastFireTime}`, "Blade");
      // Do entity damage, push etc etc etc.
    }
    getPlayerStateData(player).hitChainProgression = hitChainProgression;
  } else {
    // Player is idling.
    const { lastFireTime } = getPlayerStateData(player);

    if (lastFireTime >= 0) {
      if (
        game.GetFrameCount() - lastFireTime > getActualTimeToGoIdle(player) &&
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
        clearDamageState(player);
        behaviorTickCounter = 0;
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
        if (!isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)) {
          bladeSprite.Play(Animations.SWITCH_CHARGED_IDLE, false);
          sfxManager.Play(SoundsCustom.SB_CHARGED_UP, 2, 0);
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
