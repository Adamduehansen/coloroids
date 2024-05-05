import { ImageSource, Loader, type SourceView } from "excalibur";

export const spritesheetSource = new ImageSource("/asteroids.png");

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

const bulletSourceView: SourceView = {
  x: 224,
  y: 142,
  width: 16,
  height: 16,
};

export const sourceViews = {
  asteroidSmall1: asteroidSmall1SourceView,
  asteroidSmall2: asteroidSmall2SourceView,
  spaceshipIdle: spaceshipIdleSourceView,
  spaceshipThrust: spaceshipThrustSourceView,
  bullet: bulletSourceView,
} as const;

export const loader = new Loader([spritesheetSource]);
