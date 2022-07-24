import { CollectibleType } from "isaac-typescript-definitions";

const synergyCache = new Map<CollectibleType, number>();

export function cacheSynergy(collectibe: CollectibleType): void {
  // synergyCache.set(collectibe, synergyCache.get(collectibe) !== undefined ?
  // synergyCache.get(collectibe) : 1);
}

export function removedCachedSynergy(collectibe: CollectibleType): boolean {
  return true;
}

export function cacheExistingItemSynergies(): void {}

export function clearCachedSynergies(): void {}
