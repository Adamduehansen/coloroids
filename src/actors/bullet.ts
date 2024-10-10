import * as ex from "excalibur";

const BULLET_SPEED = 300;

type Args = Pick<ex.ActorArgs, "rotation" | "pos">;

export class Bullet extends ex.Actor {
  constructor(args: Args) {
    super({
      ...args,
      width: 8,
      height: 4,
      color: ex.Color.Red,
      collider: ex.Shape.Box(8, 4),
      collisionType: ex.CollisionType.Active,
    });

    const vx = Math.cos(this.rotation) * BULLET_SPEED;
    const vy = Math.sin(this.rotation) * BULLET_SPEED;
    this.vel = ex.vec(vx, vy);
  }
}
