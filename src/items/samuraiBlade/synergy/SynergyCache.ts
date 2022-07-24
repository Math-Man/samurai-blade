import { CollectibleType } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";

const synergyCache = new Map<CollectibleType, number>();

export function incrementCacheSynergyItem(collectible: CollectibleType): void {
  const existingCacheValue = synergyCache.get(collectible);
  synergyCache.set(collectible, existingCacheValue === undefined ? 1 : existingCacheValue + 1);
}

export function decrementCachedSynergyItem(collectible: CollectibleType): boolean {
  const existingCacheValue = synergyCache.get(collectible);
  if (existingCacheValue !== undefined) {
    if (existingCacheValue - 1 === 0) {
      synergyCache.delete(collectible);
    } else {
      synergyCache.set(collectible, existingCacheValue - 1);
    }
    return true;
  }
  return false;
}

export function cacheExistingItemSynergies(): void {
  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    getcollectibles;
  }
}

export function clearCachedSynergies(): void {}
