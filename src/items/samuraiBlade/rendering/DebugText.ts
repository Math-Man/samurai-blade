import { getPlayerById } from "../../../helpers/Helpers";

export function printDebugText(): void {
  const player = getPlayerById(0);

  Isaac.RenderText(`Player: ${player.Index}`, 68, 30, 0, 255, 255, 255);
}
