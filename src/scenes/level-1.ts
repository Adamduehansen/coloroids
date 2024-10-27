import { LevelScene } from "./level-scene.ts";
import { Resources } from "../utils/resources.ts";

export class Level1 extends LevelScene {
  constructor() {
    super({
      tilemap: Resources.tiled.level1,
    });
  }
}
