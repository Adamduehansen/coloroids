import * as ex from "excalibur";
import { adaptToRotation, Facing } from "../utils/Facing.ts";
import { ControlsComponent } from "../components/controls.ts";
import { CanonComponent } from "../components/canon.ts";
import { Bullet } from "./bullet.ts";

const ROTATE_SPEED = .05;
const RELOAD_TIME = 500;
const MAX_SPEED = 200;

type Args = Pick<ex.ActorArgs, "pos"> & {
  facing: Facing;
};

export class Spaceship extends ex.Actor {
  readonly controls = new ControlsComponent();
  readonly canon = new CanonComponent(RELOAD_TIME);

  speed = 0;

  constructor(args: Args) {
    super({
      ...args,
      width: 16,
      height: 16,
      color: ex.Color.Red,
      rotation: adaptToRotation(args.facing),
      collider: ex.Shape.Box(16, 16),
      collisionType: ex.CollisionType.Active,
    });

    this.addComponent(this.controls);
    this.addComponent(this.canon);

    this.canon.events.on("fired", () => {
      this.scene?.add(
        new Bullet({
          pos: this.pos,
          rotation: this.rotation,
        }),
      );
    });
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
      this.speed = 5;
    } else if (this.controls.isHeld("brake")) {
      this.speed = -5;
    } else {
      this.speed = 0;
    }

    if (this.controls.isHeld("fire")) {
      this.canon.attemptFire();
    }
  }

  accelerate(): void {
    const direction = ex.vec(Math.cos(this.rotation), Math.sin(this.rotation));
    const normalizedDirection = direction.normalize();
    const acceleration = normalizedDirection.scale(this.speed);
    this.vel = this.vel.add(acceleration).clampMagnitude(MAX_SPEED);
  }
}
