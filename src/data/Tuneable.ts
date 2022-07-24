interface ITuneable {
  HitChainRanges: Map<unknown, number[]>;
  FireDelayByProgressionStage: Map<unknown, number>;
  Damage: Map<unknown, number>;
  BaseRange: number;
  PushMultiplier: number;
  TimeToGoIdleFrames: number;
  DamageModifierForHittingSameEnemy: number;
  StatRange: float;
  StatRangePhysical: float;
  StatRangeVisual: float;
  StatDamage: float;
  StatFireRate: float;
  StatShotSpeed: float;
  IdleSize: Vector;
  hitStateFrames: Map<int, int[]>; // Hits all entities after given number of frames have passed since player started attacking in the int array, for all elements. Can't hit same entity twice.
  maxNumberOfHitsInOneSwingToSameEntity: number;
}

export const Tuneable: ITuneable = {
  HitChainRanges: new Map<unknown, number[]>([
    [1, [-0.7, 1]],
    [2, [-0.62, 1]],
    [3, [-1, 1]],
    ["charged", [-1, 1]],
  ]),

  FireDelayByProgressionStage: new Map<unknown, number>([
    [1, 20],
    [2, 10],
    [3, 12],
  ]),
  Damage: new Map<unknown, number>([
    [1, 1.0],
    [2, 0.5],
    [3, 1.5],
  ]),
  BaseRange: 95,
  PushMultiplier: 5,
  TimeToGoIdleFrames: 30,
  DamageModifierForHittingSameEnemy: 0.5,
  StatRange: 2.1,
  StatRangePhysical: 1.02,
  StatRangeVisual: 0.9,
  StatDamage: 0.6,
  StatFireRate: 1,
  StatShotSpeed: 0.5,
  IdleSize: Vector(0.6, 0.6),
  hitStateFrames: new Map<int, int[]>([
    [1, [2, 3, 4, 5, 6, 7, 8]],
    [2, [1, 2, 3, 4, 5, 6, 7]],
    [3, [2, 3, 4, 5, 6, 7, 8, 9]],
  ]),
  maxNumberOfHitsInOneSwingToSameEntity: 3,
} as const;
