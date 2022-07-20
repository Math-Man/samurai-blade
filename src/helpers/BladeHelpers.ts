import { getPlayerStateData } from "../data/StateData";
import { Tuneable } from "../data/Tuneables";

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

  // onst calculatedDamage = damage + player.Damage * 0.8;

  return 1;
}
