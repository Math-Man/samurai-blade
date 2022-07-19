// eslint-disable-next-line isaacscript/require-const-assertions
const StateData = {
  HitChainProgression: 1,
  HitChainRanges: { 1: [-0.7, 1], 2: [-0.62, 1], 3: [-1, 1], CHARGED: [-1, 1] },
  BladeSprites: {},
  HolsterSprites: {},
  LastFireTimes: {},
  ActiveAimDirection: Vector(0, 0),
};

export function flushState(): void {
  StateData.HitChainProgression = 1;
}
