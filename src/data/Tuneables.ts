
interface ITuneable {
  HitChainRanges : Map<unknown, number[]>,
  FireDelayByProgressionStage: Array<number>,
  Damage: Array<number>,
  BaseRange: number,
  PushMultiplier: number,
  TimeToGoIdleFrames: number,
  TimeToChargeUpFrames: number,
  HasLineOfSightCheck: boolean,
  DamageModifierForEachEnemyHit: float,
  StatRange: float,
  StatRangePhysical: float,
  StatRangeVisual: float,
  StatDamage: float,
  StatFireRate: float,
  StatShotSpeed: float,
}

export const Tuneable : ITuneable = {
    HitChainRanges: new Map<unknown, number[]>([
      [1, [-0.7, 1]],
      [2, [-0.62, 1]],
      [3, [-1, 1]],
      ["charged", [-1, 1]],
    ]),

    FireDelayByProgressionStage: Array<number>(18, 12, 14),
    Damage: Array<number>(1.5, 1.0, 3.0),
    BaseRange: 95,
    PushMultiplier: 15,
    TimeToGoIdleFrames: 20,
    TimeToChargeUpFrames: 80,
    HasLineOfSightCheck: false,
    DamageModifierForEachEnemyHit: 0.9,
    StatRange: 2.1,
    StatRangePhysical: 1.02,
    StatRangeVisual: 0.9,
    StatDamage: 0.6,
    StatFireRate: 1,
    StatShotSpeed: 0.5,
}
/*
export const Tuneable = {

  HitChainRanges: new Map<unknown, number[]>([
    [1, [-0.7, 1]],
    [2, [-0.62, 1]],
    [3, [-1, 1]],
    ["charged", [-1, 1]],
  ]),

  FireDelayByProgressionStage: Array<number>(18, 12, 14),

  Damage: [1.5, 1.0, 3.0],
  BaseRange: 95,
  PushMultiplier: 15,
  TimeToGoIdleFrames: 20,
  TimeToChargeUpFrames: 80,
  HasLineOfSightCheck: false,
  DamageModifierForEachEnemyHit: 0.9,

  StatRange: 2.1,
  StatRangePhysical: 1.02,
  StatRangeVisual: 0.9,
  StatDamage: 0.6,
  StatFireRate: 1,
  StatShotSpeed: 0.5,
} as const;
*/
// 1: [-0.7, 1], 2: [-0.62, 1], 3: [-1, 1], CHARGED: [-1, 1] },
