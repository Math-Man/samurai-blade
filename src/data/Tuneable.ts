interface ITuneable {
  HitChainRanges: Map<unknown, number[]>;
  FireDelayByProgressionStage: Map<unknown, number>;
  Damage: Map<unknown, number>;
  BaseRange: number;
  PushMultiplier: number;
  TimeToGoIdleFrames: number;
  HasLineOfSightCheck: boolean;
  DamageModifierForEachEnemyHit: number;
  StatRange: float;
  StatRangePhysical: float;
  StatRangeVisual: float;
  StatDamage: float;
  StatFireRate: float;
  StatShotSpeed: float;
  IdleSize: Vector;
}

export const Tuneable: ITuneable = {
  HitChainRanges: new Map<unknown, number[]>([
    [1, [-0.7, 1]],
    [2, [-0.62, 1]],
    [3, [-1, 1]],
    ["charged", [-1, 1]],
  ]),

  FireDelayByProgressionStage: new Map<unknown, number>([
    [1, 18],
    [2, 12],
    [3, 14],
  ]),
  Damage: new Map<unknown, number>([
    [1, 1.5],
    [2, 1.0],
    [3, 3.0],
  ]),
  BaseRange: 95,
  PushMultiplier: 15,
  TimeToGoIdleFrames: 30,
  HasLineOfSightCheck: false,
  DamageModifierForEachEnemyHit: 0.9,
  StatRange: 2.1,
  StatRangePhysical: 1.02,
  StatRangeVisual: 0.9,
  StatDamage: 0.6,
  StatFireRate: 1,
  StatShotSpeed: 0.5,
  IdleSize: Vector(0.6, 0.6),
} as const;
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
