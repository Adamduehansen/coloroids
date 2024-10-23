import * as ex from "excalibur";
import { Resources } from "../utils/resources.ts";
import { LevelScene } from "./level-scene.ts";

export class TestLevel extends LevelScene {
  constructor() {
    super({
      tilemap: Resources.tiled.testMap,
    });
  }

  override onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
  }
}
