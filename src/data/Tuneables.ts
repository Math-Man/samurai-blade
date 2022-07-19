export const Tuneable = {
  Damage: { 1: 1.5, 2: 1.0, 3: 3.0 },
  BaseRange: 95,
  FireDelayByProgressionStage: { 1: 18, 2: 12, 3: 14 },
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
