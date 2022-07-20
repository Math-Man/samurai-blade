import { sfxManager } from "isaacscript-common";
import { SoundsCustom } from "../../../enums/SoundsCustom";

export function motivatePlayer(): void {
  sfxManager.Play(SoundsCustom.SB_PICKUP_BLADE);
}
