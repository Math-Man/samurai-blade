import { getPlayers } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";

export function renderBlades(): void {
  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    const { bladeSprite, holsterSprite } = getPlayerStateData(player);

    renderUserBlade(bladeSprite, player);

    if (
      !(
        bladeSprite.IsPlaying("Idle") ||
        bladeSprite.IsPlaying("SwitchToIdle") ||
        bladeSprite.IsPlaying("SwitchToIdle") ||
        bladeSprite.IsFinished("ChargedIdle") ||
        bladeSprite.IsPlaying("SwitchToChargedIdle") ||
        bladeSprite.IsFinished("SwitchToChargedIdle")
      )
    ) {
      renderUserEmptyHolster(holsterSprite, player);
    }
  }
}

function renderUserBlade(sprite: Sprite, player: EntityPlayer) {
  sprite.Render(Isaac.WorldToScreen(player.Position));
  if (sprite.GetFrame() === -1) {
    sprite.Play(sprite.GetDefaultAnimation(), false);
    sprite.PlaybackSpeed = 0.5;
  }
  sprite.Update();
}

function renderUserEmptyHolster(sprite: Sprite, player: EntityPlayer) {
  sprite.RenderLayer(7, Isaac.WorldToScreen(player.Position));
  if (sprite.GetFrame() === -1) {
    sprite.Play("EmptyHolsterOverlay", true);
  }
  sprite.Rotation = 25;
  sprite.Scale = Vector(0.6, 0.6);
  sprite.Update();
}
