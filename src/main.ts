import { ModCallback } from "isaac-typescript-definitions";
import { entityTakeDamageInit } from "./callbacks/MCEntityTakeDamage";
import { evaluateCacheInit } from "./callbacks/MCEvaluateCache";
import { postGameStartedInit } from "./callbacks/MCPostGameStarted";
import { postNewRoomInit } from "./callbacks/MCPostNewRoom";
import { postRenderInit } from "./callbacks/MCPostRender";
import { postUpdateInit } from "./callbacks/MCPostUpdate";

const MOD_NAME = "samurai-blade";

main();

export function main(): void {
  const mod = RegisterMod(MOD_NAME, 1);
  Isaac.DebugString(`${MOD_NAME} initialized.`);
  registerCallbacks(mod);
}

function registerCallbacks(mod: Mod) {
  Isaac.DebugString(`Callback triggered: POST_GAME_STARTED ${ModCallback.POST_GAME_STARTED}`);

  postUpdateInit(mod);
  postRenderInit(mod);
  postNewRoomInit(mod);
  postGameStartedInit(mod);
  evaluateCacheInit(mod);
  entityTakeDamageInit(mod);
}
