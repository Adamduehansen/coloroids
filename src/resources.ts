import { ImageSource, Loader, SourceView, Sprite, Animation } from "excalibur";

const spritesheetSource = new ImageSource("/asteroids.png");

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

export const asteroidSmall1 = new Sprite({
  image: spritesheetSource,
  sourceView: sourceViews.asteroidSmall2,
});

export const spaceshipIdleSprite = new Sprite({
  image: spritesheetSource,
  sourceView: sourceViews.spaceshipIdle,
});

export const spaceshipThrustSprite = new Sprite({
  image: spritesheetSource,
  sourceView: sourceViews.spaceshipThrust,
});

const SPACESHIPT_THRUST_ANIMATION_SPEED = 200;
export const spaceshipThrustAnimation = new Animation({
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

export const loader = new Loader([spritesheetSource]);
