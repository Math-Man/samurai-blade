import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { printDebugText } from "./samuraiBlade/rendering/DebugText";
import { renderBlades } from "./samuraiBlade/rendering/RenderBlade";
import { updateBladeBehavior } from "./samuraiBlade/update/updateBladeBehavior";

export function SamuraiBladePostUpdate(): void {
  updateBladeBehavior();
}

export function SamuraiBladePostRender(): void {
  printDebugText();
  renderBlades();
}

export function SamuraiBladePostNewRoom(): void {
  Isaac.DebugString(`POST NEW ROOM FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`);
}

export function SamuraiBladePostGameStarted(): void {
  Isaac.DebugString(`POST POST GAME STARTED FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`);
}

export function SamuraiBladeEntityTakeDamage(): void {
  Isaac.DebugString(`POST ENTITY TAKE DAMAGE FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`);
}
