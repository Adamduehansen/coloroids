import * as ex from "excalibur";
import { Spaceship } from "./actors/spaceship.ts";
import { SmallAsteroid } from "./actors/smallAsteroid.ts";
import { LargeAsteroid } from "./actors/largeAsteroid.ts";

const engine = new ex.Engine({
  maxFps: 60,
});

const spaceship = new Spaceship({
  pos: ex.vec(100, 300),
  facing: "right",
  color: ex.Color.Green,
});
engine.add(spaceship);

const smallAsteroid = new SmallAsteroid({
  pos: ex.vec(300, 300),
  color: ex.Color.Green,
});
engine.add(smallAsteroid);

const largeAsteroid = new LargeAsteroid({
  pos: ex.vec(200, 300),
  color: ex.Color.Yellow,
});

engine.add(largeAsteroid);

await engine.start();
