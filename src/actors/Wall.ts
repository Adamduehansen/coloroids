import * as ex from "excalibur";

type Args = Required<Pick<ex.ActorArgs, "pos">>;

export class Wall extends ex.Actor {
  constructor(args: Args) {
    super({
      pos: args.pos,
      width: 16,
      height: 16,
      collisionType: ex.CollisionType.Fixed,
      collider: ex.Shape.Box(16, 16),
      color: ex.Color.Gray,
    });

    this.body.bounciness = 2;
  }
}
