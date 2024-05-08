import { Color, DisplayMode, Engine } from "excalibur";
import { loader } from "./resources";
import Spaceship from "./objects/Spaceship";
import Asteroid from "./objects/Asteroid";

const game = new Engine({
  width: 1440,
  height: 900,
  backgroundColor: Color.Black,
  suppressPlayButton: true,
  displayMode: DisplayMode.FitScreen,
});

const spaceship = new Spaceship({
  x: game.drawWidth / 2,
  y: game.drawHeight / 2,
});
game.add(spaceship);

const asteroid1 = new Asteroid({
  x: game.drawWidth / 2 + 200,
  y: game.drawHeight / 2,
  color: Color.White,
});
game.add(asteroid1);

const asteroid2 = new Asteroid({
  x: game.drawWidth / 2 + 400,
  y: game.drawHeight / 2,
  color: Color.White,
});
game.add(asteroid2);

const asteroid3 = new Asteroid({
  x: game.drawWidth / 2 + 600,
  y: game.drawHeight / 2,
  color: Color.White,
});
game.add(asteroid3);

game.start(loader);
