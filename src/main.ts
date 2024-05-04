import { Actor, Color, Engine } from "excalibur";
import { asteroidSmall1, loader } from "./resources";
import Spaceship from "./objects/Spaceship";

const game = new Engine({
  width: 800,
  height: 800,
  backgroundColor: Color.Black,
  suppressPlayButton: true,
});

const asteroid = new Actor({
  x: 64,
  y: 64,
  width: 50,
  height: 50,
});
asteroid.graphics.use(asteroidSmall1);
asteroid.graphics.current!.tint = Color.Blue;
asteroid.on("preupdate", () => {
  asteroid.rotation += 0.005;
});
game.add(asteroid);

const spaceship = new Spaceship({
  x: game.drawWidth / 2,
  y: game.drawHeight / 2,
});
game.add(spaceship);

game.start(loader);
