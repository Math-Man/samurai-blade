import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

export function samuraiBladePostUpdate(): void {
  Isaac.DebugString(
    `POST UPDATE FROM SAMURAI'S BLADE ${CollectibleTypeCustom.SB_SAMURAI_BLADE}`,
  );
}
