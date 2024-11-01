import { Resources } from "../utils/resources.ts";
import { LevelScene } from "./level-scene.ts";

export class Level5 extends LevelScene {
  constructor() {
    super({
      tilemap: Resources.tiled.level5,
    });
  }
}
