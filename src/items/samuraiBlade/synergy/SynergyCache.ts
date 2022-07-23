import { CollectibleType } from "isaac-typescript-definitions";

const synergyCache = new Map<number, CollectibleType>();

export function cacheSynergy(collectibe: CollectibleType): void {}

export function removedCachedSynergy(collectibe: CollectibleType): boolean {
  return true;
}

export function cacheExistingItemSynergies(): void {}

export function clearCachedSynergies(): void {}
