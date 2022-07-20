import { clamp, game } from "isaacscript-common";
import { getPlayerStateData } from "../data/StateData";
import { Tuneable } from "../data/Tuneable";

export function getBladeSpriteScaleFromStats(player: EntityPlayer): Vector {
  const { charged } = getPlayerStateData(player);
  let scaleMultiplier = (1 + (player.TearRange / 40) * Tuneable.StatRange) * 0.02 * Tuneable.StatRangeVisual;

  if (charged) {
    scaleMultiplier += scaleMultiplier * 0.5;
  }

  return Vector(scaleMultiplier, scaleMultiplier);
}

export function getBladePhysicalRange(player: EntityPlayer): float {
  const { charged } = getPlayerStateData(player);
  let calculatedRange = (Tuneable.BaseRange + (player.TearRange / 40) * Tuneable.StatDamage) * Tuneable.StatRangePhysical;

  if (charged) {
    calculatedRange += calculatedRange * 0.5;
  }
  return calculatedRange;
}

export function getBladeDamage(player: EntityPlayer): float {
  const { charged, hitChainProgression } = getPlayerStateData(player);
  const damage = Tuneable.Damage[hitChainProgression];
  if (damage === undefined) {
    error("Invalid hit chain progression value");
  }
  let damageVal = damage + player.Damage * 0.8;
  if (charged) {
    damageVal *= 1.5;
  }
  return damageVal;
}

export function getBladeFireDelay(player: EntityPlayer): number {
  const fireDelay = Tuneable.FireDelayByProgressionStage[getPlayerStateData(player).hitChainProgression];
  if (fireDelay === undefined) {
    error("Invalid hit chain progression value");
  }
  return clamp(fireDelay - (1 / player.MaxFireDelay - 0.1) * 100, 1, Tuneable.TimeToGoIdleFrames);
}

export function getAndUpdatePlayerBladeFireTime(player: EntityPlayer): number {
  const { lastFireTime } = getPlayerStateData(player);
  getPlayerStateData(player).lastFireTime = game.GetFrameCount();
  return lastFireTime;
}

export function canPlayerFireBlade(player: EntityPlayer): boolean {
  if (getPlayerStateData(player).lastFireTime === -1) {
    getPlayerStateData(player).lastFireTime = 0;
  }

  const firingDelay = Tuneable.FireDelayByProgressionStage[getPlayerStateData(player).hitChainProgression];

  if (firingDelay === undefined) {
    error("Invalid hit chain progression value");
  }

  return math.abs(game.GetFrameCount() - getPlayerStateData(player).lastFireTime) >= firingDelay;
}
