import * as ex from "excalibur";
import { Resources } from "../utils/resources.ts";
import { LevelScene } from "./level-scene.ts";
import { Spaceship } from "../actors/spaceship.ts";
import { SmallAsteroid } from "../actors/small-asteroid.ts";
import { LargeAsteroid } from "../actors/large-asteroid.ts";

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

    const smallAsteroid = new SmallAsteroid({
      pos: ex.vec(500, 300),
      color: ex.Color.Green,
      vel: ex.vec(-30, 0),
    });
    engine.add(smallAsteroid);

    const largeAsteroid = new LargeAsteroid({
      pos: ex.vec(400, 300),
      color: ex.Color.Yellow,
      vel: ex.vec(50, 0),
    });
    engine.add(largeAsteroid);

    engine.currentScene.camera.strategy.lockToActor(spaceship);
    engine.currentScene.camera.zoom = 1.5;
  }
}
