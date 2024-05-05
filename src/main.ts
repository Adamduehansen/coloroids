import { Color, Engine } from "excalibur";
import { loader } from "./resources";
import Spaceship from "./objects/Spaceship";
import Asteroid from "./objects/Asteroid";

const game = new Engine({
  width: 800,
  height: 800,
  backgroundColor: Color.Black,
  suppressPlayButton: true,
});

const spaceship = new Spaceship({
  x: game.drawWidth / 2,
  y: game.drawHeight / 2,
});
game.add(spaceship);

const asteroid = new Asteroid({
  x: 200,
  y: 200,
});
game.add(asteroid);

game.start(loader);
