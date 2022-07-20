export function aimTargetedDotValue(targetPosition: Vector, playerPosition: Vector, playerAimDirection: Vector): float {
  return targetPosition.sub(playerPosition).Normalized().Dot(playerAimDirection);
}

export function atan2(y: float, x: float): float {
  return math.atan(y / x);
}

export function signedAngleBetween(vec1: Vector, vec2: Vector): float {
  return (atan2(vec2.Y - vec1.Y, vec2.X - vec1.X) * 180) / math.pi;
}
