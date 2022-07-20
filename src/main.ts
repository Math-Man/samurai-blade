import { ModCallback } from "isaac-typescript-definitions";
import { entityTakeDamageInit } from "./callbacks/EntityTakeDamage";
import { evaluateCacheInit } from "./callbacks/EvaluateCache";
import { postGameStartedInit } from "./callbacks/PostGameStarted";
import { postNewRoomInit } from "./callbacks/PostNewRoom";
import { postRenderInit } from "./callbacks/PostRender";
import { postUpdateInit } from "./callbacks/postUpdate";

const MOD_NAME = "samurai-blade";

main();

export function main(): void {
  const mod = RegisterMod(MOD_NAME, 1);
  Isaac.DebugString(`${MOD_NAME} initialized.`);
  registerCallbacks(mod);
}

function registerCallbacks(mod: Mod) {
  Isaac.DebugString(
    `Callback triggered: POST_GAME_STARTED ${ModCallback.POST_GAME_STARTED}`,
  );

  postUpdateInit(mod);
  postRenderInit(mod);
  postNewRoomInit(mod);
  postGameStartedInit(mod);
  evaluateCacheInit(mod);
  entityTakeDamageInit(mod);
}
