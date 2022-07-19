import { getPlayerById } from "../../../helpers/Helpers";

export function printDebugText(): void {
  const player = getPlayerById(0);

  Isaac.RenderText(`Player: ${player.Index}`, 68, 30, 0, 255, 255, 255);
  Isaac.RenderText(`Player Position : ${tostring(player.Position)}`, 68, 45, 0, 255, 255, 255);
  Isaac.RenderText(`Player Position : ${tostring(player.Velocity)}`, 68, 60, 0, 255, 255, 255);
}
