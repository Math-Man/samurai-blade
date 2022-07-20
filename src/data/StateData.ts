interface PlayerState {
  bladeSprite: Sprite;
  holsterSprite: Sprite;
  lastFireTime: float;
  hitChainProgression: number;
  activeAimDirection: Vector;
  charged: boolean;
}

const StateData = new Map<int, PlayerState>();

export function getStateData(): Map<int, PlayerState> {
  return StateData;
}

export function getPlayerStateData(player: EntityPlayer): PlayerState {
  let playerData = getStateData().get(player.Index);

  // Data doesn't exist, add it.
  if (playerData === undefined) {
    playerData = {
      bladeSprite: Sprite(),
      holsterSprite: Sprite(),
      lastFireTime: 0,
      hitChainProgression: 1,
      activeAimDirection: Vector(0, 0),
      charged: false,
    };

    // Load sprite data.
    playerData.bladeSprite.Load("gfx/animation/BladeAnim.anm2", true);
    playerData.holsterSprite.Load("gfx/animation/BladeAnim.anm2", true);

    getStateData().set(player.Index, playerData);
  }

  return playerData;
}
