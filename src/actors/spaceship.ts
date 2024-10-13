import * as ex from "excalibur";
import { adaptToRotation, Facing } from "../utils/Facing.ts";
import { ControlsComponent } from "../components/controls.ts";
import { CanonComponent } from "../components/canon.ts";
import { Bullet } from "./bullet.ts";
import { AsteroidCollisionGroup } from "../utils/collisionGroups.ts";
import { PaletteComponent } from "../components/palette.ts";

const ROTATE_SPEED = .05;
const RELOAD_TIME = 500;
const MAX_SPEED = 200;

type Args = Pick<ex.ActorArgs, "pos"> & {
  facing: Facing;
};

const playersCanCollideWith = ex.CollisionGroup.collidesWith([
  AsteroidCollisionGroup,
]);

export class Spaceship extends ex.Actor {
  readonly controls = new ControlsComponent();
  readonly canon = new CanonComponent(RELOAD_TIME);
  readonly palette = new PaletteComponent(ex.Color.Green);

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
      collisionGroup: playersCanCollideWith,
    });

    this.addComponent(this.controls);
    this.addComponent(this.canon);
    this.addComponent(this.palette);

    this.canon.events.on("fired", () => {
      if (this.palette.color === null) {
        return;
      }

      this.scene?.add(
        new Bullet({
          pos: this.pos,
          rotation: this.rotation,
          color: this.palette.color,
        }),
      );
    });

    this.palette.events.on("change", (color) => {
      this.color = color;
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

    const color = this.controls.getPaletteControl();
    if (color !== null) {
      this.palette.setColor(color);
    }
  }

  accelerate(): void {
    const direction = ex.vec(Math.cos(this.rotation), Math.sin(this.rotation));
    const normalizedDirection = direction.normalize();
    const acceleration = normalizedDirection.scale(this.speed);
    this.vel = this.vel.add(acceleration).clampMagnitude(MAX_SPEED);
  }

  override onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact,
  ): void {
    super.onCollisionStart(self, other, side, contact);
  }
}
