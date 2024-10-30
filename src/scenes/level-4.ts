import { Resources } from "../utils/resources.ts";
import { LevelScene } from "./level-scene.ts";

export class Level4 extends LevelScene {
  constructor() {
    super({
      tilemap: Resources.tiled.level4,
    });
  }
}
