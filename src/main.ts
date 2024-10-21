import * as ex from "excalibur";
import { Spaceship } from "./actors/spaceship.ts";
import { SmallAsteroid } from "./actors/smallAsteroid.ts";
import { LargeAsteroid } from "./actors/largeAsteroid.ts";
import { loader, tiledMap } from "./utils/resources.ts";
import { Wall } from "./actors/Wall.ts";

const engine = new ex.Engine({
  maxFps: 60,
  suppressPlayButton: true,
  physics: {
    solver: ex.SolverStrategy.Realistic,
    gravity: ex.vec(0, 0),
  },
});

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

const wall = new Wall({
  pos: ex.vec(600, 300),
});
engine.add(wall);

await engine.start(loader);
tiledMap.addToScene(engine.currentScene);
// engine.currentScene.camera.strategy.lockToActor(spaceship);
// engine.currentScene.camera.zoom = 1.5;
