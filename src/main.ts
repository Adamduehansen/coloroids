import * as ex from "excalibur";
import { Spaceship } from "./actors/spaceship.ts";
import { Asteroid } from "./actors/Asteroid.ts";

const engine = new ex.Engine({
  maxFps: 60,
});

const spaceship = new Spaceship({
  pos: ex.vec(100, 300),
  facing: "right",
});
engine.add(spaceship);

const asteroid = new Asteroid({
  pos: ex.vec(200, 300),
  color: ex.Color.Green,
});
engine.add(asteroid);

await engine.start();
