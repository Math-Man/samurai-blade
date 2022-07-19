import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { printDebugText } from "./samuraiBlade/rendering/DebugText";

export function SamuraiBladePostUpdate(): void {
  Isaac.DebugString(
    `POST UPDATE FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`,
  );
}

export function SamuraiBladePostRender(): void {
  printDebugText();
  // Isaac.DebugString( `POST RENDER FROM SAMURAI'S BLADE
  // ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`, );
}

export function SamuraiBladePostNewRoom(): void {
  Isaac.DebugString(
    `POST NEW ROOM FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`,
  );
}

export function SamuraiBladePostGameStarted(): void {
  Isaac.DebugString(
    `POST POST GAME STARTED FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`,
  );
}

export function SamuraiBladeEntityTakeDamage(): void {
  Isaac.DebugString(
    `POST ENTITY TAKE DAMAGE FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`,
  );
}
