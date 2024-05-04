import {
  Actor,
  Color,
  Engine,
  ImageSource,
  Loader,
  Sprite,
  SourceView,
  Keys,
  vec,
  Animation,
} from "excalibur";

const game = new Engine({
  width: 800,
  height: 800,
  backgroundColor: Color.Black,
  suppressPlayButton: true,
});

const spritesheetSource = new ImageSource("/asteroids.png");

const loader = new Loader([spritesheetSource]);

const asteroidSmall1SourceView: SourceView = {
  x: 0,
  y: 128,
  width: 32,
  height: 32,
};

const asteroidSmall2SourceView: SourceView = {
  x: 32,
  y: 128,
  width: 32,
  height: 32,
};

const spaceshipIdleSourceView: SourceView = {
  x: 96,
  y: 128,
  width: 48,
  height: 32,
};

const spaceshipThrustSourceView: SourceView = {
  x: 144,
  y: 128,
  width: 48,
  height: 32,
};

const sourceViews = {
  asteroidSmall1: asteroidSmall1SourceView,
  asteroidSmall2: asteroidSmall2SourceView,
  spaceshipIdle: spaceshipIdleSourceView,
  spaceshipThrust: spaceshipThrustSourceView,
} as const;

const asteroidSmall1 = new Sprite({
  image: spritesheetSource,
  sourceView: sourceViews.asteroidSmall2,
});

const spaceshipIdleSprite = new Sprite({
  image: spritesheetSource,
  sourceView: sourceViews.spaceshipIdle,
});

const spaceshipThrustSprite = new Sprite({
  image: spritesheetSource,
  sourceView: sourceViews.spaceshipThrust,
});

const SPACESHIPT_THRUST_ANIMATION_SPEED = 200;
const spaceshipThrustAnimation = new Animation({
  frames: [
    {
      graphic: spaceshipThrustSprite,
      duration: SPACESHIPT_THRUST_ANIMATION_SPEED,
    },
    {
      graphic: spaceshipIdleSprite,
      duration: SPACESHIPT_THRUST_ANIMATION_SPEED,
    },
  ],
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

  const vx = Math.cos(spaceship.rotation) * speed;
  const vy = Math.sin(spaceship.rotation) * speed;
  spaceship.vel = vec(vx, vy);
});

game.start(loader);
