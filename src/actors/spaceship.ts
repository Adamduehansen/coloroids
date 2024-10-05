import * as ex from "excalibur";
import { adaptToRotation, Facing } from "../utils/Facing.ts";
import { ControlsComponent } from "../components/controls.ts";

const ROTATE_SPEED = .05;
const MAX_SPEED = 1;

type Args = Pick<ex.ActorArgs, "pos"> & {
  facing: Facing;
};

export class Spaceship extends ex.Actor {
  readonly controls = new ControlsComponent();

  speed = 0;

  constructor(args: Args) {
    super({
      ...args,
      width: 16,
      height: 16,
      color: ex.Color.Red,
      rotation: adaptToRotation(args.facing),
    });

    this.addComponent(this.controls);
  }

  override onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handleInput();
    this.accelerate();
  }

  handleInput(): void {
    if (this.controls.isHeld("rotateRight")) {
      this.rotation += ROTATE_SPEED;
    } else if (this.controls.isHeld("rotateLeft")) {
      this.rotation -= ROTATE_SPEED;
    }

    if (this.controls.isHeld("thust")) {
      this.speed = Math.min(++this.speed, MAX_SPEED);
    } else if (this.controls.isHeld("brake")) {
      this.speed = Math.max(--this.speed, -1);
    } else {
      if (this.speed > 0) {
        this.speed -= 1;
      }
    }
  }

  accelerate(): void {
    const direction = ex.vec(Math.cos(this.rotation), Math.sin(this.rotation));
    const normalizedDirection = direction.normalize();
    const acceleration = normalizedDirection.scale(this.speed);
    this.vel = this.vel.add(acceleration);
  }
}
