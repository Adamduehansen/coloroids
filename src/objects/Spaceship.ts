import {
  Actor,
  ActorArgs,
  Color,
  Engine,
  Graphic,
  Keys,
  SourceView,
  Sprite,
  vec,
  Animation,
} from "excalibur";
import { spritesheetSource } from "../resources";

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

const THRUST_SPEED = 2;
const MAX_SPEED = 100;
const ROTATION_SPEED = 0.025;

export default class Spaceship extends Actor {
  #speed = 0;
  #idleGraphic: Graphic;
  #thrustGraphic: Graphic;

  constructor({ x, y }: Pick<ActorArgs, "x" | "y">) {
    super({
      x: x,
      y: y,
    });
    this.#idleGraphic = new Sprite({
      image: spritesheetSource,
      sourceView: spaceshipIdleSourceView,
    });
    this.#thrustGraphic = new Animation({
      frames: [
        {
          graphic: new Sprite({
            image: spritesheetSource,
            sourceView: spaceshipIdleSourceView,
          }),
          duration: 200,
        },
        {
          graphic: new Sprite({
            image: spritesheetSource,
            sourceView: spaceshipThrustSourceView,
          }),
          duration: 500,
        },
      ],
    });
  }

  onInitialize(): void {
    this.graphics.use(this.#idleGraphic);
  }

  onPreUpdate(engine: Engine<any>): void {
    this.#handleControls(engine);
    const vx = Math.cos(this.rotation) * this.#speed;
    const vy = Math.sin(this.rotation) * this.#speed;
    this.vel = vec(vx, vy);
  }

  #handleControls(engine: Engine) {
    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.rotation += ROTATION_SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.A)) {
      this.rotation -= ROTATION_SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.W)) {
      this.#speed = Math.min(this.#speed + THRUST_SPEED, MAX_SPEED);
      this.graphics.use(this.#thrustGraphic);
    }

    if (engine.input.keyboard.wasReleased(Keys.W)) {
      this.graphics.use(this.#idleGraphic);
    }

    if (engine.input.keyboard.isHeld(Keys.S)) {
      this.#speed = Math.max(this.#speed - THRUST_SPEED, -MAX_SPEED);
    }

    if (engine.input.keyboard.wasPressed(Keys.R)) {
      this.#setGraphicColors(Color.Red);
    }

    if (engine.input.keyboard.wasPressed(Keys.B)) {
      this.#setGraphicColors(Color.Blue);
    }

    if (engine.input.keyboard.wasPressed(Keys.G)) {
      this.#setGraphicColors(Color.Green);
    }
  }

  #setGraphicColors(color: Color) {
    this.#idleGraphic.tint = color;
    this.#thrustGraphic.tint = color;
  }
}
