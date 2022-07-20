import { game } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { getBladeDamage, getBladeFireDelay, getChargeTime } from "../../../helpers/BladeHelpers";
import { getPlayerById, playerHasSamuraisBladeItem } from "../../../helpers/Helpers";

export function printDebugText(): void {
  const player = getPlayerById(0);

  Isaac.RenderText(`Player: ${player.Index}`, 68, 30, 0, 255, 255, 255);
  Isaac.RenderText(`Player Position : ${tostring(player.Position)}`, 68, 45, 0, 255, 255, 255);
  Isaac.RenderText(`Player Velocity : ${tostring(player.Velocity)}`, 68, 60, 0, 255, 255, 255);

  if (playerHasSamuraisBladeItem(player)) {
    const blade = getPlayerStateData(player).bladeSprite;
    Isaac.RenderText(`Blade    : ${tostring(blade)}`, 280, 45, 255, 255, 255, 69);
    Isaac.RenderText(`Animation: ${tostring(blade.GetAnimation())}`, 280, 60, 255, 255, 255, 69);
    Isaac.RenderText(`Frame    : ${tostring(blade.GetFrame())}`, 280, 75, 255, 255, 255, 69);
    Isaac.RenderText(`Charge T.: ${tostring(getChargeTime(player))}`, 280, 90, 255, 255, 255, 69);
    Isaac.RenderText(`Charged  : ${tostring(getPlayerStateData(player).charged)}`, 280, 105, 255, 255, 255, 69);
    Isaac.RenderText(`Size     : ${tostring(blade.Scale)}`, 280, 120, 255, 255, 255, 69);
    Isaac.RenderText(`Pers A.D.: ${tostring(getPlayerStateData(player).activeAimDirection)}`, 280, 135, 255, 255, 255, 69);
    Isaac.RenderText(`Flipped  : ${tostring(blade.FlipX)}`, 280, 150, 255, 255, 255, 69);
    Isaac.RenderText(`Offset   : ${tostring(blade.Offset)}`, 280, 165, 255, 255, 255, 69);
    Isaac.RenderText(`Damage   : ${tostring(getBladeDamage(player))}`, 280, 180, 255, 255, 255, 69);
    Isaac.RenderText(`Fire Dly : ${tostring(getBladeFireDelay(player))}`, 280, 195, 255, 255, 255, 69);
    Isaac.RenderText(`Fire TTL : ${tostring(game.GetFrameCount() - (getPlayerStateData(player).lastFireTime + getBladeFireDelay(player)))}`, 280, 210, 255, 255, 255, 69);
  }
}
