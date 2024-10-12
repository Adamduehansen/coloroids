import * as ex from "excalibur";
import {
  AsteroidCollisionGroup,
  BulletCollisionGroup,
} from "../utils/collisionGroups.ts";
import { ColorComponent } from "../components/color.ts";

const BULLET_SPEED = 300;

type Args = Pick<ex.ActorArgs, "rotation" | "pos">;

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
      color: ex.Color.Red,
      collider: ex.Shape.Box(8, 4),
      collisionType: ex.CollisionType.Active,
      collisionGroup: bulletsCanCollideWith,
    });

    this.addComponent(new ColorComponent(ex.Color.Yellow));

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
