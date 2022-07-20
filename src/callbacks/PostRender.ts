import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostRender } from "../items/samuraiBlade";

export function postRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, main);
}

function main() {
  SamuraiBladePostRender();
}
