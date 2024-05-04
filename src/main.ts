import { Actor, Color, Engine, Keys, vec } from "excalibur";
import {
  asteroidSmall1,
  loader,
  spaceshipIdleSprite,
  spaceshipThrustAnimation,
} from "./resources";

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

const spaceship = new Actor({
  x: game.drawWidth / 2,
  y: game.drawHeight / 2,
});
spaceship.graphics.use(spaceshipIdleSprite);
game.add(spaceship);

const THRUST_SPEED = 2;
const MAX_SPEED = 100;
const ROTATION_SPEED = 0.025;

let speed = 0;
game.on("preupdate", () => {
  if (game.input.keyboard.isHeld(Keys.D)) {
    spaceship.rotation += ROTATION_SPEED;
  }

  if (game.input.keyboard.isHeld(Keys.A)) {
    spaceship.rotation -= ROTATION_SPEED;
  }

  if (game.input.keyboard.isHeld(Keys.W)) {
    speed = Math.min(speed + THRUST_SPEED, MAX_SPEED);
    spaceship.graphics.use(spaceshipThrustAnimation);
  }

  if (game.input.keyboard.wasReleased(Keys.W)) {
    spaceship.graphics.use(spaceshipIdleSprite);
  }

  if (game.input.keyboard.isHeld(Keys.S)) {
    speed = Math.max(speed - THRUST_SPEED, -MAX_SPEED);
  }

  if (game.input.keyboard.wasPressed(Keys.R)) {
    spaceship.graphics.current!.tint = Color.Red;
  }

  if (game.input.keyboard.wasPressed(Keys.B)) {
    spaceship.graphics.current!.tint = Color.Blue;
  }

  if (game.input.keyboard.wasPressed(Keys.G)) {
    spaceship.graphics.current!.tint = Color.Green;
  }

  const vx = Math.cos(spaceship.rotation) * speed;
  const vy = Math.sin(spaceship.rotation) * speed;
  spaceship.vel = vec(vx, vy);
});

game.start(loader);
