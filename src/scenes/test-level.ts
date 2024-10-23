import * as ex from "excalibur";
import { Resources } from "../utils/resources.ts";
import { LevelScene } from "./level-scene.ts";
import { Spaceship } from "../actors/spaceship.ts";

export class TestLevel extends LevelScene {
  constructor() {
    super({
      tilemap: Resources.tiled.testMap,
    });
  }

  override onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    const spaceship = new Spaceship({
      pos: ex.vec(100, 300),
      facing: "right",
      color: ex.Color.Green,
    });
    engine.add(spaceship);

    engine.currentScene.camera.strategy.lockToActor(spaceship);
    engine.currentScene.camera.zoom = 1.5;
  }
}
