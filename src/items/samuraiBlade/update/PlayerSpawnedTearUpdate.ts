import { TearVariant } from "isaac-typescript-definitions";

export function setTearToBlade(tear: EntityTear) {
  tear.ChangeVariant(TearVariant.SWORD_BEAM);
}
