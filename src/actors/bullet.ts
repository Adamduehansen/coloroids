import * as ex from "excalibur";
import {
  AsteroidCollisionGroup,
  BulletCollisionGroup,
} from "../utils/collision-groups.ts";
import { PaletteComponent } from "../components/palette.ts";

const BULLET_SPEED = 300;

type Args = Pick<ex.ActorArgs, "rotation" | "pos"> & {
  color: ex.Color;
};

const bulletsCanCollideWith = ex.CollisionGroup.collidesWith([
  AsteroidCollisionGroup,
  BulletCollisionGroup,
]);

export class Bullet extends ex.Actor {
  constructor(args: Args) {
    super({
      ...args,
      width: 8,
      height: 4,
      color: args.color,
      collider: ex.Shape.Box(8, 4),
      collisionType: ex.CollisionType.Active,
      collisionGroup: bulletsCanCollideWith,
    });

    this.body.mass = 0.1;

    this.addComponent(new PaletteComponent(args.color));

    const vx = Math.cos(this.rotation) * BULLET_SPEED;
    const vy = Math.sin(this.rotation) * BULLET_SPEED;
    this.vel = ex.vec(vx, vy);
  }

  override onCollisionStart(
    self: ex.Collider,
    other: ex.Collider,
    side: ex.Side,
    contact: ex.CollisionContact,
  ): void {
    super.onCollisionStart(self, other, side, contact);
    this.kill();
  }
}
