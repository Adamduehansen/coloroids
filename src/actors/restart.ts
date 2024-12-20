import * as ex from "excalibur";
import { GoalCollisionGroup } from "../utils/collision-groups.ts";
import { LevelEndComponent } from "../components/level-end.ts";

type Args = Required<Pick<ex.ActorArgs, "pos">>;

export class Restart extends ex.Actor {
  constructor(args: Args) {
    super({
      pos: args.pos,
      collisionGroup: GoalCollisionGroup,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(16, 16),
    });

    this.addComponent(new LevelEndComponent("reset-levels"));
  }

  override onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    this.addChild(
      new ex.Actor({
        height: 16,
        width: 16,
        color: ex.Color.White,
        collisionType: ex.CollisionType.PreventCollision,
      }),
    );
    this.addChild(
      new ex.Label({
        text: "Restart",
        color: ex.Color.White,
        pos: ex.vec(-18, 10),
      }),
    );
  }
}
