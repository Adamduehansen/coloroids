import * as ex from "excalibur";
import { adaptToRotation, Facing } from "../utils/Facing.ts";
import { ControlsComponent } from "../components/controls.ts";

const ROTATE_SPEED = .05;

type Args = Pick<ex.ActorArgs, "pos"> & {
  facing: Facing;
};

export class Spaceship extends ex.Actor {
  readonly controls = new ControlsComponent();

  constructor(args: Args) {
    super({
      ...args,
      width: 8,
      height: 16,
      color: ex.Color.Red,
      rotation: adaptToRotation(args.facing),
    });

    this.addComponent(this.controls);
  }

  override onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.#handleInput();
  }

  #handleInput(): void {
    if (this.controls.isHeld("rotateRight")) {
      this.rotation += ROTATE_SPEED;
    } else if (this.controls.isHeld("rotateLeft")) {
      this.rotation -= ROTATE_SPEED;
    }
  }
}
