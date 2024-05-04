import { Actor, ActorArgs, Color, Engine, Keys, vec } from "excalibur";
import { spaceshipIdleSprite, spaceshipThrustAnimation } from "../resources";

const THRUST_SPEED = 2;
const MAX_SPEED = 100;
const ROTATION_SPEED = 0.025;

export default class Spaceship extends Actor {
  #speed = 0;

  constructor({ x, y }: Pick<ActorArgs, "x" | "y">) {
    super({
      x: x,
      y: y,
    });
  }

  onInitialize(): void {
    this.graphics.use(spaceshipIdleSprite);
  }

  onPreUpdate(engine: Engine<any>): void {
    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.rotation += ROTATION_SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.A)) {
      this.rotation -= ROTATION_SPEED;
    }

    if (engine.input.keyboard.isHeld(Keys.W)) {
      this.#speed = Math.min(this.#speed + THRUST_SPEED, MAX_SPEED);
      this.graphics.use(spaceshipThrustAnimation);
    }

    if (engine.input.keyboard.wasReleased(Keys.W)) {
      this.graphics.use(spaceshipIdleSprite);
    }

    if (engine.input.keyboard.isHeld(Keys.S)) {
      this.#speed = Math.max(this.#speed - THRUST_SPEED, -MAX_SPEED);
    }

    if (engine.input.keyboard.wasPressed(Keys.R)) {
      this.graphics.current!.tint = Color.Red;
    }

    if (engine.input.keyboard.wasPressed(Keys.B)) {
      this.graphics.current!.tint = Color.Blue;
    }

    if (engine.input.keyboard.wasPressed(Keys.G)) {
      this.graphics.current!.tint = Color.Green;
    }

    const vx = Math.cos(this.rotation) * this.#speed;
    const vy = Math.sin(this.rotation) * this.#speed;
    this.vel = vec(vx, vy);
  }
}
