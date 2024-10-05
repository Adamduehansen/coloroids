import * as ex from "excalibur";
import { Spaceship } from "./actors/spaceship.ts";

const engine = new ex.Engine({});

const spaceship = new Spaceship({
  pos: ex.vec(100, 100),
  facing: "right",
});

engine.add(spaceship);

await engine.start();
