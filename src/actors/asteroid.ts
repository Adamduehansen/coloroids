import * as ex from "excalibur";

type Args = Pick<ex.ActorArgs, "pos" | "color">;

export class Asteroid extends ex.Actor {
  constructor(args: Args) {
    super({
      ...args,
      width: 16,
      height: 16,
      collider: ex.Shape.Box(16, 16),
      collisionType: ex.CollisionType.Active,
    });
  }
}
